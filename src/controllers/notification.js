const admin = require("../utils/firebase-admin");
const cron = require("node-cron");
const db = require("../config/db/setup");
const cuacaModel = require("../models/cuacaModel");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { decode } = require("html-entities");

const issuedCachePath = path.join(__dirname, "../cache/bmkg-issued.json");

const fetchBMKGIssued = async () => {
  try {
    const response = await axios.get("https://nowcasting.bmkg.go.id/sb/yogya/Json/data.json");
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

      const decodedWarning = decode(text_warning || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

      const kabupatenMatch = decodedWarning.match(/Kabupaten[^.]+?(Kecamatan:[^.]+?)(?=Kabupaten|Kota|dan sekitarnya|\*|$)/g);
      const kotaMatch = decodedWarning.match(/Kota[^.]+?(Kecamatan:[^.]+?)(?=\*|$)/g);

      const lokasi = [...(kabupatenMatch || []), ...(kotaMatch || [])]
        .map(k => k.replace(/Kecamatan:/, "").split(":")[0].trim())
        .join(", ")
        .split(", ")
        .slice(0, 5)
        .join(", ");

      const waktu = `${valid_start?.slice(11, 16)} - ${valid_end?.slice(11, 16)} WIB`;

      const title = "Peringatan Cuaca Ekstrem di Yogyakarta";
      const body = `BMKG: Hujan lebat dan petir berpotensi terjadi di ${lokasi} pada ${issued.slice(0, 10)}, ${waktu}.`;

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
    const response = admin
      .messaging()
      .send({
        token: fcmToken,
        notification: {
          title,
          body,
        },
      })
      .then((res) => {
        const sql =
          "INSERT INTO notifications (id, fcm_token, message) VALUES (NULL, ?, ?)";

        db.query(sql, [fcmToken, body], (err) => {
          if (err) {
            console.error("Error inserting notification:", err);
          }
        });
      });

    return { message: "Notification sent successfully", response };
  } catch (err) {
    console.error("Error sending notification:", err);
    return { message: "Error sending notification" };
  }
};

const weatherCondition = async () => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching tokens:", err);
      return { message: err };
    }

    if (!rows.length) {
      return { message: "No users found" };
    }

    const users = rows.map((row) => row);

    users.forEach((user) => {
      const { lat, lon } = user;
      cuacaModel.getForecastData(lat, lon, (err, data) => {
        if (err) {
          console.error("Error fetching weather data:", err);
          return { message: err };
        }

        if (data) {
          const firstTimeStampData = data.weatherData[0][0];

          if (
            firstTimeStampData.weather >= 60 &&
            firstTimeStampData.weather <= 97
          ) {
            const title = "Peringatan Cuaca";
            const body = `Cuaca di lokasi anda ${firstTimeStampData.weather_desc} dengan suhu ${firstTimeStampData.t}°C`;
            generateData({ fcmToken: user.fcm_token, title, body });
          }
        }
      });
    });

    return { message: "Notification sent to all users" };
  });
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

const averageWeatherToday = async () => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, rows) => {
    if (err) {
      console.error("Error fetching tokens:", err);
      return { message: err };
    }

    if (!rows.length) {
      return { message: "No users found" };
    }

    const users = rows.map((row) => row);

    users.forEach((user) => {
      const { lat, lon } = user;
      cuacaModel.getForecastData(lat, lon, (err, data) => {
        if (err) {
          console.error("Error fetching weather data:", err);
          return { message: err };
        }

        if (data) {
          const firstTimeStampData = data.weatherData[0];
          const { avgTemperature, avgHumidity, mostFrequentWeatherDesc } =
            analyzeWeather(firstTimeStampData);

            const title = "Informasi Cuaca Hari Ini";
            const body = `Rata-rata suhu hari ini adalah ${avgTemperature}°C dengan kelembapan ${avgHumidity}% dan cuaca ${mostFrequentWeatherDesc}`;
            generateData({ fcmToken: user.fcm_token, title, body });
        }
      });
    });

    return { message: "Notification sent to all users" };
  });
};

cron.schedule("0 0 * * *", () => {
    averageWeatherToday();
    console.log("Notification sent to all users at", new Date().toLocaleString());
});

cron.schedule("0 */1 * * *", () => {
  weatherCondition();
  console.log("Notification sent to all users at", new Date().toLocaleString());
});

cron.schedule("*/10 * * * *", () => {
  fetchBMKGIssued();
});

const registerToken = async (req, res) => {
  const userId = req.user.user_id;
  const { fcmToken } = req.body;

  if (!userId || !fcmToken) {
    return res.status(400).json({ message: "Missing userId or fcmToken" });
  }

  try {
    await db.query("UPDATE users SET fcm_token = ? WHERE user_id = ?", [
      fcmToken,
      userId,
    ]);
    res.json({ message: "FCM token registered" });
  } catch (err) {
    console.error("Error registering token:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { averageWeatherToday, registerToken };
