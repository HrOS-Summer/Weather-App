export const weatherCodeMap = {
  0: { desc: "Clear sky", icon: "☀️" },
  1: { desc: "Mainly clear", icon: "🌤️" },
  2: { desc: "Partly cloudy", icon: "⛅" },
  3: { desc: "Overcast", icon: "☁️" },
  45: { desc: "Fog", icon: "🌫️" },
  48: { desc: "Depositing rime fog", icon: "🌫️" },
  51: { desc: "Drizzle: Light intensity", icon: "🌦️" },
  53: { desc: "Drizzle: Moderate intensity", icon: "🌦️" },
  55: { desc: "Drizzle: Dense intensity", icon: "🌧️" },
  56: { desc: "Freezing Drizzle: Light", icon: "❄️" },
  57: { desc: "Freezing Drizzle: Dense", icon: "❄️" },
  61: { desc: "Rain: Slight", icon: "🌦️" },
  63: { desc: "Rain: Moderate", icon: "🌧️" },
  65: { desc: "Rain: Heavy", icon: "🌧️" },
  66: { desc: "Freezing Rain: Light", icon: "❄️" },
  67: { desc: "Freezing Rain: Heavy", icon: "❄️" },
  71: { desc: "Snow fall: Slight", icon: "🌨️" },
  73: { desc: "Snow fall: Moderate", icon: "🌨️" },
  75: { desc: "Snow fall: Heavy", icon: "❄️" },
  77: { desc: "Snow grains", icon: "🌨️" },
  80: { desc: "Rain showers: Slight", icon: "🌦️" },
  81: { desc: "Rain showers: Moderate", icon: "🌧️" },
  82: { desc: "Rain showers: Violent", icon: "🌧️" },
  85: { desc: "Snow showers slight", icon: "🌨️" },
  86: { desc: "Snow showers heavy", icon: "❄️" },
  95: { desc: "Thunderstorm: Slight or moderate", icon: "⛈️" },
  96: { desc: "Thunderstorm with slight hail", icon: "⛈️" },
  99: { desc: "Thunderstorm with heavy hail", icon: "⛈️" }
};

export function getWeatherDesc(code) {
  return weatherCodeMap[code]?.desc || "Unknown";
}

export function getWeatherIcon(code) {
  return weatherCodeMap[code]?.icon || "❓";
}
