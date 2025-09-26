// services/weatherService.js
import axios from "axios";

/**
 * Weather Service
 * Contains all API calls related to weather and geocoding
 */

/**
 * Fetches geographical coordinates for a given city name
 * @param {string} cityName - Name of the city to search
 * @returns {Promise} - Returns location data with latitude and longitude
 */
export const fetchLocationByCity = async (cityName) => {
  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}`
  );
  return response.data;
};

/**
 * Reverse geocodes coordinates to a place name using Open-Meteo geocoding reverse endpoint
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise} - Returns place data (results array) or empty object
 */
export const fetchLocationByCoordinates = async (latitude, longitude) => {
  const response = await axios.get(
    `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}`
  );
  return response.data;
};

/**
 * Fetches weather data for given coordinates
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise} - Returns comprehensive weather data including current, hourly, and daily forecasts
 */
export const fetchWeatherByCoordinates = async (latitude, longitude) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,pressure_msl,windspeed_10m,precipitation,weathercode&hourly=temperature_2m,relative_humidity_2m,pressure_msl,windspeed_10m,precipitation,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_sum,windspeed_10m_max&forecast_days=7`;


  const response = await axios.get(url);
  const data = response.data;

  // Convert current temperature to Fahrenheit for convenience
  const celsiusTemp = data.current?.temperature_2m ?? null;
  const fahrenheitTemp = celsiusTemp !== null ? (celsiusTemp * 9/5) + 32 : null;

  return {
    raw: data, // full response from API
    current: {
      ...data.current,
      temperature_fahrenheit: fahrenheitTemp,
    },
  };
};
