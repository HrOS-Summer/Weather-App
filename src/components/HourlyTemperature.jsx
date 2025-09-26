
import { getWeatherIcon, getWeatherDesc } from "../utils/weatherUtils";

const HourlyTemperature = ({ weather }) => {
  if (!weather || !weather.raw?.hourly || !weather.raw.hourly.time || !weather.raw.hourly.temperature_2m) {
    return null;
  }

  const hourly = weather.raw.hourly;
  const toFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-white shadow-xl">
      <h3 className="text-2xl font-bold mb-6">Hourly Temperature</h3>
      
      <div className="overflow-x-auto thin-scrollbar">
        <div className="flex space-x-4 pb-4">
          {hourly.time.slice(0, 30).map((time, index) => {
            if (index % 3 === 0) {
              const tempC = hourly.temperature_2m[index];
              const code = hourly.weathercode?.[index];
              const icon = code !== undefined ? getWeatherIcon(code) : null;
              const desc = code !== undefined ? getWeatherDesc(code) : null;

              return (
                <div key={index} className="flex-shrink-0 text-center bg-white/5 rounded-2xl p-4 min-w-[120px]">
                  <p className="text-sm text-white/70 mb-2">
                    {new Date(time).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>

                  {icon && (
                    <div className="text-2xl mb-2" title={desc} aria-label={desc}>
                      {icon}
                    </div>
                  )}

                  <p className="text-lg font-bold">
                    {Math.round(tempC)}°C / {Math.round(toFahrenheit(tempC))}°F
                  </p>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default HourlyTemperature;
