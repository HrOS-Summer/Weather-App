import React from "react";
import { getWeatherDesc, getWeatherIcon } from "../constants/weatherCode";

// Helper to render value or NA for missing data
const renderValue = (val, suffix) =>
  val !== undefined && val !== null && !isNaN(val) ? `${val}${suffix}` : "NA";

const WeatherCard = ({ weather, location }) => {
  const current = weather?.current || null;

  return (
    <div className="bg-blue-400 rounded-3xl p-6 md:p-8 lg:p-10 text-white shadow-2xl w-full max-w-sm md:max-w-2xl lg:max-w-3xl mx-auto">
      <div className="text-center mb-4 md:mb-6">
        {/* If we have current weather, show its icon; otherwise show a placeholder icon */}
        <div className="text-6xl md:text-8xl mb-2">{current ? getWeatherIcon(current.weathercode) : '📍'}</div>

        {/* Always show location name immediately if available */}
        {location?.name ? (
          <p className="text-sm text-white/90 mb-1">{location.name}{location.country_code ? `, ${location.country_code.toUpperCase()}` : ''}</p>
        ) : (
          <p className="text-sm text-white/80 mb-1">Your location</p>
        )}

        {current ? (
          <>
            <h2 className="text-[2.5rem] md:text-[3rem] font-bold mb-2">
              {renderValue(current.temperature_2m, "°C")} {" / "}
              {renderValue(Math.round(current.temperature_fahrenheit), "°F")}
            </h2>
            <p className="text-xl md:text-2xl text-white/90">{getWeatherDesc(current.weathercode)}</p>
          </>
        ) : (
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Loading weather…</h2>
        )}
      </div>

      {current && (
        <div className="grid grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <div className="text-xl mb-1">🌬️</div>
            <p className="text-sm text-white/90">Wind Speed</p>
            <p className="text-lg font-semibold">{renderValue(current.windspeed_10m, " km/h")}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <div className="text-xl mb-1">💧</div>
            <p className="text-sm text-white/90">Humidity</p>
            <p className="text-lg font-semibold">{renderValue(current.relative_humidity_2m, " %")}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <div className="text-xl mb-1">🔴</div>
            <p className="text-sm text-white/90">Pressure</p>
            <p className="text-lg font-semibold">{renderValue(current.pressure_msl, " hPa")}</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-4 text-center">
            <div className="text-xl mb-1">🌧️</div>
            <p className="text-sm text-white/90">Precipitation</p>
            <p className="text-lg font-semibold">{renderValue(current.precipitation, " mm")}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
