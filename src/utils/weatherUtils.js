// utils/weatherUtils.js
import { weatherCodeMap } from '../constants/weatherCode';

/**
 * Gets weather description based on weather code
 * @param {number} code - Weather code from API
 * @returns {string} - Weather description text
 */
export const getWeatherDesc = (code) => {
  return weatherCodeMap[code]?.desc || "Unknown";
};

/**
 * Gets weather icon emoji based on weather code
 * @param {number} code - Weather code from API
 * @returns {string} - Weather icon emoji
 */
export const getWeatherIcon = (code) => {
  return weatherCodeMap[code]?.icon || "❓";
};