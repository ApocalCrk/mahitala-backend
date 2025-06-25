const admin = require("../utils/firebase-admin");
const cron = require("node-cron");
const db = require("../config/db/setup");
const cuacaModel = require("../models/cuacaModel");
const fieldModel = require("../models/fieldModel");
const forumModel = require("../models/forumModel");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { decode } = require("html-entities");

const issuedCachePath = path.join(__dirname, "../cache/bmkg-issued.json");

const fetchBMKGIssued = async () => {
  const API_NOTIF = process.env.API_WARNING_BMKG;
  try {
    const response = await axios.get(API_NOTIF);
    const { issued, text_warning, valid_start, valid_end } = response.data;

    const issuedDate = new Date(issued);
    if (isNaN(issuedDate.getTime())) {
      console.warn("Tanggal issued tidak valid:", issued);
      return;
    }

    let cachedIssued = null;
    if (fs.existsSync(issuedCachePath)) {
      const cached = JSON.parse(fs.readFileSync(issuedCachePath, "utf8"));
      cachedIssued = cached.issued;
    }

    if (cachedIssued !== issued) {
      console.log("Data issued baru terdeteksi:", issued);

      const decodedWarning = decode(text_warning || "")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim();

      const kabupatenMatch = decodedWarning.match(
        /Kabupaten[^.]+?(Kecamatan:[^.]+?)(?=Kabupaten|Kota|dan sekitarnya|\*|$)/g
      );
      const kotaMatch = decodedWarning.match(
        /Kota[^.]+?(Kecamatan:[^.]+?)(?=\*|$)/g
      );

      const lokasi = [...(kabupatenMatch || []), ...(kotaMatch || [])]
        .map((k) =>
          k
            .replace(/Kecamatan:/, "")
            .split(":")[0]
            .trim()
        )
        .join(", ")
        .split(", ")
        .slice(0, 5)
        .join(", ");

      const waktu = `${valid_start?.slice(11, 16)} - ${valid_end?.slice(
        11,
        16
      )} WIB`;

      const title = "Peringatan Cuaca Ekstrem di Yogyakarta";
      const body = `BMKG: Hujan lebat dan petir berpotensi terjadi di ${lokasi} pada ${issued.slice(
        0,
        10
      )}, ${waktu}.`;

      const sql = "SELECT * FROM users";
      db.query(sql, (err, rows) => {
        if (err) {
          console.error("Error fetching users:", err);
          return;
        }
        rows.forEach((user) => {
          generateData({ fcmToken: user.fcm_token, title, body });
        });
      });

      fs.writeFileSync(issuedCachePath, JSON.stringify({ issued }, null, 2));
    } else {
      console.log("Data issued masih sama, tidak kirim notifikasi.");
    }
  } catch (err) {
    console.error("Gagal fetch atau proses data BMKG:", err.message);
  }
};

const generateData = async ({ fcmToken, title, body }) => {
  if (!fcmToken) {
    return { message: "FCM token is required" };
  }

  if (!title || !body) {
    return { message: "Title and body are required" };
  }

  try {
    const response = await admin.messaging().send({
      token: fcmToken,
      notification: {
        title,
        body,
      },
    });

    const sql = "INSERT INTO notifications (id, fcm_token, message) VALUES (NULL, ?, ?)";
    db.query(sql, [fcmToken, body], (err) => {
      if (err) {
        console.error("Error inserting notification:", err);
      }
    });

    return { message: "Notification sent successfully", response };
  } catch (err) {
    if (err.code === 'messaging/registration-token-not-registered') {
      console.warn("FCM token is not registered, consider removing it:", fcmToken);
      return { message: "FCM token is not registered or expired" };
    }

    console.error("Error sending notification:", err);
    return { message: "Error sending notification", error: err.message };
  }
};

const processWeatherNotifications = async (weatherProcessingFunction) => {
    const users = await userModel.getAllUsers();
    if (!users.length) {
        console.log("No users with FCM token found, skipping weather notification.");
        return;
    }

    await Promise.all(users.map(async (user) => {
        try {
            const { lat, lon, fcm_token } = user;
            if (!lat || !lon) return;

            const data = await cuacaModel.getForecastData(lat, lon);
            if (!data) return;

            const notificationPayload = weatherProcessingFunction(data);

            if (notificationPayload) {
                await generateData({ fcmToken: fcm_token, ...notificationPayload });
            }
        } catch (error) {
            console.error(`Error processing weather for user ${user.user_id}:`, error.message);
        }
    }));
};

function analyzeWeather(data) {
  if (!Array.isArray(data) || data.length === 0) {
    return {
      avgTemperature: null,
      avgHumidity: null,
      mostFrequentWeatherDesc: null,
    };
  }

  let totalTemp = 0;
  let totalHumidity = 0;
  const weatherDescCount = {};

  data.forEach((item) => {
    totalTemp += item.t;
    totalHumidity += item.hu;

    const desc = item.weather_desc;
    if (weatherDescCount[desc]) {
      weatherDescCount[desc]++;
    } else {
      weatherDescCount[desc] = 1;
    }
  });

  const avgTemperature = totalTemp / data.length;
  const avgHumidity = totalHumidity / data.length;

  const mostFrequentWeatherDesc = Object.entries(weatherDescCount).reduce(
    (maxEntry, currentEntry) =>
      currentEntry[1] > maxEntry[1] ? currentEntry : maxEntry
  )[0];

  return {
    avgTemperature: parseFloat(avgTemperature.toFixed(1)),
    avgHumidity: parseFloat(avgHumidity.toFixed(1)),
    mostFrequentWeatherDesc,
  };
}

const checkForBadWeather = (data) => {
    const firstTimeStampData = data.weatherData[0][0];
    if (firstTimeStampData.weather >= 60 && firstTimeStampData.weather <= 97) {
        return {
            title: "Peringatan Cuaca",
            body: `Cuaca di lokasi anda ${firstTimeStampData.weather_desc} dengan suhu ${firstTimeStampData.t}°C`,
        };
    }
    return null;
};

const getAverageWeather = (data) => {
    const firstTimeStampData = data.weatherData[0];
    const { avgTemperature, avgHumidity, mostFrequentWeatherDesc } = analyzeWeather(firstTimeStampData);
    return {
        title: "Informasi Cuaca Hari Ini",
        body: `Rata-rata suhu hari ini adalah ${avgTemperature}°C dengan kelembapan ${avgHumidity}% dan cuaca ${mostFrequentWeatherDesc}`,
    };
};

const automationEstimatedCrop = async () => {
  try {
    const rows = await new Promise((resolve, reject) => {
      db.query("SELECT * FROM users", (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    if (!rows.length) {
      console.log("No users found");
      return;
    }

    for (const user of rows) {
      try {
        const fieldData = await new Promise((resolve, reject) => {
          fieldModel.getFieldByUserID(user.user_id, (err, fieldData) => {
            if (err) return reject(err);
            resolve(fieldData);
          });
        });

        if (!fieldData.length) continue;

        for (const field of fieldData) {
          const { estimasi_panen, nama_lahan } = field;
          const currentDate = new Date();
          const estimatedDate = new Date(estimasi_panen);
          const diffTime = Math.abs(currentDate - estimatedDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          const finalDate = new Date(estimasi_panen).toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          );

          if (diffDays <= 7) {
            const title = `Estimasi Panen ${nama_lahan}`;
            const body = `Pemberitahuan Estimasi panen tanaman pada ${finalDate}`;
            generateData({ fcmToken: user.fcm_token, title, body });
          }
        }
      } catch (error) {
        console.error(`Error processing user ${user.user_id}:`, error);
      }
    }
  } catch (error) {
    console.error("Error in automationEstimatedCrop:", error);
    throw error;
  }
};

const notifyOnPriceDrop = async () => {
  console.log("Running daily commodity price drop check at", new Date().toLocaleString());
  try {
    // 1. Dapatkan data komoditas dari model
    const commodities = await forumModel.checkKomoditasHargaPasar();
    if (!commodities || commodities.length === 0) {
      console.log("Commodity data is not available.");
      return;
    }

    // 2. Filter komoditas yang harganya turun
    const droppedCommodities = commodities.filter(
      (item) => item.gap_change === "down" && item.gap < 0
    );

    if (droppedCommodities.length === 0) {
      console.log("No commodity prices dropped today. No notification sent.");
      return;
    }

    const biggestDropCommodity = droppedCommodities.reduce((prev, current) => {
      return prev.gap < current.gap ? prev : current;
    });

    const { nama, hari_ini, kemarin, satuan } = biggestDropCommodity;
    const formatCurrency = (num) => new Intl.NumberFormat('id-ID').format(num);

    const title = `Info Harga: ${nama} Turun!`;
    const body = `Harga ${nama} turun dari Rp${formatCurrency(kemarin)} menjadi Rp${formatCurrency(hari_ini)} per ${satuan.replace('Rp./','').replace('Rp/','').trim()}. Pantau sekarang!`;

    const sql = "SELECT fcm_token FROM users WHERE fcm_token IS NOT NULL";
    db.query(sql, (err, users) => {
      if (err) {
        console.error("Error fetching users for commodity notification:", err);
        return;
      }
      
      if (users.length === 0) {
        console.log("No users with FCM token found for commodity notification.");
        return;
      }

      console.log(`Sending commodity price drop notification to ${users.length} users.`);
      
      const notificationPromises = users.map(user => 
        generateData({ fcmToken: user.fcm_token, title, body })
      );

      Promise.all(notificationPromises)
        .then(() => console.log("Successfully sent all commodity notifications."))
        .catch(error => console.error("An error occurred while sending commodity notifications:", error));
    });

  } catch (error) {
    console.error("Error in notifyOnPriceDrop job:", error.message);
  }
};

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily automation jobs at", new Date().toLocaleString());
  try {
    await automationEstimatedCrop();
    console.log("Daily jobs completed.");
  } catch (error) {
    console.error("Error in daily scheduled jobs:", error);
  }
});

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily weather notifications at", new Date().toLocaleString());
  try {
    await processWeatherNotifications(getAverageWeather);
  } catch (error) {
    console.error("Error in daily weather notifications:", error);
  }
});

cron.schedule("0 */1 * * *", async () => {
    console.log("Checking for bad weather conditions at", new Date().toLocaleString());
    try {
        await processWeatherNotifications(checkForBadWeather);
    } catch (error) {
        console.error("Error in hourly weather check:", error);
    }
});

cron.schedule("*/10 * * * *", async () => {
    try {
        await fetchBMKGIssued();
    } catch (error) {
        console.error("Error fetching BMKG data:", error);
    }
});

cron.schedule("0 9 * * *", async () => {
  try {
    await notifyOnPriceDrop();
  } catch (error) {
    console.error("Error running scheduled commodity price drop check:", error);
  }
});

const registerToken = async (req, res) => {
  const userId = req.user.user_id;
  const { fcmToken } = req.body;

  if (!userId || !fcmToken) {
    return res.status(400).json({ message: "Missing userId or fcmToken" });
  }

  try {
    db.query("UPDATE users SET fcm_token = ? WHERE user_id = ?", [
      fcmToken,
      userId,
    ]);
    res.json({ message: "FCM token registered" });
  } catch (err) {
    console.error("Error registering token:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { generateData, registerToken };
