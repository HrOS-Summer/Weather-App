import React from "react";
import { getWeatherDesc, getWeatherIcon } from "../constants/weatherCode";

const CurrentWeather = ({ weather }) => {
  if (!weather || !weather.current) return null;

  const current = weather.current;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-white shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center">Current Weather Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-white/5 rounded-2xl">
          <h4 className="text-lg font-semibold mb-2">Temperature</h4>
          <p className="text-3xl font-bold">
            {current.temperature_2m} °C / {Math.round(current.temperature_fahrenheit)} °F
          </p>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-2xl">
          <h4 className="text-lg font-semibold mb-2">Humidity</h4>
          <p className="text-3xl font-bold">{current.relative_humidity_2m} %</p>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-2xl">
          <h4 className="text-lg font-semibold mb-2">Wind Speed</h4>
          <p className="text-3xl font-bold">{current.windspeed_10m} km/h</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="text-center p-4 bg-white/5 rounded-2xl">
          <h4 className="text-lg font-semibold mb-2">Pressure</h4>
          <p className="text-3xl font-bold">{current.pressure_msl} hPa</p>
        </div>
        <div className="text-center p-4 bg-white/5 rounded-2xl">
          <h4 className="text-lg font-semibold mb-2">Precipitation</h4>
          <p className="text-3xl font-bold">{current.precipitation} mm</p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center space-x-3">
          <span className="text-4xl">{getWeatherIcon(current.weathercode)}</span>
          <span className="text-xl">{getWeatherDesc(current.weathercode)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
