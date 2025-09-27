import { getWeatherDesc, getWeatherIcon } from "../utils/weatherUtils";

const WeeklyForecast = ({ weather }) => {
  if (!weather || !weather.raw?.daily) return null;

  const daily = weather.raw.daily;

  // Render a horizontally scrollable row for small screens and a 7-column grid for large screens
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 text-white shadow-xl">
      <h3 className="text-2xl font-bold mb-6">7-Day Forecast</h3>

      {/* Small screens: horizontal scroll */}
      <div className="lg:hidden -mx-4 px-4">
        <div className="overflow-x-auto thin-scrollbar mt-4">
          <div className="flex gap-4">
            {daily.time.map((date, index) => (
              <div
                key={index}
                className="min-w-[140px] text-center bg-white/5 rounded-2xl p-4 flex-shrink-0"
              >
                <p className="text-sm text-white/70 mb-2">
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>

                <div className="text-3xl mb-2">
                  {getWeatherIcon(daily.weathercode[index])}
                </div>

                <div className="space-y-1">
                  <p className="text-lg font-bold">
                    {Math.round(daily.temperature_2m_max[index])}°C /{' '}
                    {Math.round((daily.temperature_2m_max[index] * 9) / 5 + 32)}°F
                  </p>
                  <p className="text-sm text-white/70">
                    {Math.round(daily.temperature_2m_min[index])}°C /{' '}
                    {Math.round((daily.temperature_2m_min[index] * 9) / 5 + 32)}°F
                  </p>
                </div>

                <p className="text-xs text-white/60 mt-2">
                  {getWeatherDesc(daily.weathercode[index])}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Large screens: 7-column grid */}
      <div className="hidden lg:grid grid-cols-7 gap-4">
        {daily.time.map((date, index) => (
          <div key={index} className="text-center bg-white/5 rounded-2xl p-4">
            <p className="text-sm text-white/70 mb-2">
              {new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}
            </p>

            <div className="text-3xl mb-2">
              {getWeatherIcon(daily.weathercode[index])}
            </div>

            <div className="space-y-1">
              <p className="text-lg font-bold">
                {Math.round(daily.temperature_2m_max[index])}°C /{' '}
                {Math.round((daily.temperature_2m_max[index] * 9) / 5 + 32)}°F
              </p>
              <p className="text-sm text-white/70">
                {Math.round(daily.temperature_2m_min[index])}°C /{' '}
                {Math.round((daily.temperature_2m_min[index] * 9) / 5 + 32)}°F
              </p>
            </div>

            <p className="text-xs text-white/60 mt-2">
              {getWeatherDesc(daily.weathercode[index])}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;
