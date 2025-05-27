const processWeeklyForecast = (dataCuaca) => {
    const allForecasts = dataCuaca.flat();

    const uniqueDates = new Map();
    allForecasts.forEach((forecast) => {
      const forecastDate = new Date(forecast.local_datetime);

      const dateString = forecastDate.toISOString().split("T")[0];

      if (
        forecastDate.getUTCHours() === 0
      ) {
        if (!uniqueDates.has(dateString)) {
          uniqueDates.set(dateString, forecast);
        }
      }
    });

    return Array.from(uniqueDates.values());
  }


module.exports = processWeeklyForecast;