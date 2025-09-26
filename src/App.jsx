import { useState, useEffect } from "react";
import SearchBar from './components/SearchBar';
import WeeklyForecast from './components/WeeklyForecast';
import HourlyTemperature from './components/HourlyTemperature';
import ErrorMessage from './components/ErrorMessage';
import WeatherCard from './components/WeatherCard';
import { fetchLocationByCity, fetchWeatherByCoordinates, fetchLocationByCoordinates } from './services/weatherService';
import Loader from './components/Loader';
import { getWeatherDesc, getWeatherIcon } from './utils/weatherUtils.js';

const App = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = async () => {
    try {
      setError(null);
      setLocation(null);
      setWeather(null);
      setIsLoading(true);

      const data = await fetchLocationByCity(city);
      if (data.results && data.results.length > 0) {
        const { latitude, longitude, name, country_code } = data.results[0];
        setLocation({ latitude, longitude, name, country_code });
        //Debugging
        console.log(data.results);
      } else {
        setError('City not found.');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Error fetching location.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) return;
      setIsLoading(true);
      
      try {
        const weatherData = await fetchWeatherByCoordinates(
          location.latitude, 
          location.longitude
        );
        setWeather(weatherData);
        // If we don't have a human-friendly name for the location (e.g., from geolocation),
        // try reverse geocoding now and merge the result so the WeatherCard can display it.
        if (location && !location.name) {
          try {
            const locResp = await fetchLocationByCoordinates(location.latitude, location.longitude);
            const res = locResp.results && locResp.results[0];
            if (res) {
              setLocation((prev) => ({ ...(prev || {}), name: res.name, country_code: res.country_code }));
            }
          } catch (e) {
            // ignore reverse geocode errors silently
          }
        }
        setIsLoading(false);
      } catch (err) {
        setError('Error fetching weather.');
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  // On initial mount, try to get user's current location (asks permission).
  useEffect(() => {
    // Don't try if a location is already set (e.g., from a search)
    if (location) return;

    // Helper: IP fallback using ipwho.is (no API key, approximate)
    const fetchIpLocation = async () => {
      try {
        const res = await fetch('https://ipwho.is/');
        const data = await res.json();
        if (data && data.success !== false && data.latitude && data.longitude) {
          return {
            latitude: data.latitude,
            longitude: data.longitude,
            name: data.city || data.region || data.country || null,
            country_code: data.country_code || null,
          };
        }
      } catch (e) {
        // ignore
      }
      return null;
    };

    if (!navigator?.geolocation) {
      // Geolocation API not available — try IP fallback
      fetchIpLocation().then((ipLoc) => {
        if (ipLoc) {
          setLocation(ipLoc);
          setError(null);
        } else {
          setError('Geolocation is not supported by your browser.');
        }
        setIsLoading(false);
      });
      return;
    }

    const success = (pos) => {
      const { latitude, longitude } = pos.coords;
      // Set coordinates immediately so weather fetch can start without waiting for reverse geocode
      setLocation({ latitude, longitude });
      setError(null);

      // Run reverse geocoding in background and merge results when ready
      fetchLocationByCoordinates(latitude, longitude)
        .then((resp) => {
          const res = resp.results && resp.results[0];
          if (res) {
            const name = res.name || res.locality || res.admin1 || res.country || res.region || null;
            const country_code = res.country_code || null;
            setLocation((prev) => ({ ...(prev || {}), name, country_code }));
          }
        })
        .catch(() => {
          // ignore reverse geocode errors
        });
    };

    const failure = async (err) => {
      // If user denies permission or other error, try IP fallback instead of failing completely
      const ipLoc = await fetchIpLocation();
      if (ipLoc) {
        setLocation(ipLoc);
        setError(null);
      } else {
        if (err && err.code === 1) {
          setError('Location permission denied. Search for a city to get weather.');
        } else {
          setError('Unable to retrieve your location.');
        }
      }
      setIsLoading(false);
    };

    // If the Permissions API indicates denied, skip prompting and use IP fallback
    if (navigator.permissions && navigator.permissions.query) {
      try {
        navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
          if (perm.state === 'denied') {
            fetchIpLocation().then((ipLoc) => {
              if (ipLoc) {
                setLocation(ipLoc);
                setError(null);
              } else {
                setError('Location permission denied. Search for a city to get weather.');
              }
              setIsLoading(false);
            });
          } else {
            // prompt or granted
            navigator.geolocation.getCurrentPosition(success, failure, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 });
          }
        }).catch(() => {
          navigator.geolocation.getCurrentPosition(success, failure, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 });
        });
      } catch (e) {
        navigator.geolocation.getCurrentPosition(success, failure, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 });
      }
    } else {
      // No Permissions API — just prompt
      navigator.geolocation.getCurrentPosition(success, failure, { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 });
    }
  }, [location]);

  // If any error is set, ensure the global loader is hidden
  useEffect(() => {
    if (error) setIsLoading(false);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Weather Now</h1>

        <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
        <ErrorMessage error={error} />

        {isLoading ? (
          <div className="flex items-center justify-center mt-12">
            <Loader />
          </div>
        ) : (
          <>
            {location && (
              <div className="flex justify-center mt-6">
                <WeatherCard location={location} weather={weather} getWeatherDesc={getWeatherDesc} getWeatherIcon={getWeatherIcon} />
              </div>
            )}

            {weather && (
              <div className="mt-6 space-y-6">
                <HourlyTemperature weather={weather} />
                <WeeklyForecast weather={weather} getWeatherDesc={getWeatherDesc} getWeatherIcon={getWeatherIcon} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
