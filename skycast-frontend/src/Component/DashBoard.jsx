import React, { useState } from 'react';
import axios from 'axios';

function DashBoard() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true); // Set loading to true when fetching data

    try {
      const response = await axios.get(`http://localhost:3000/weather/${city}`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError('Unable to fetch weather data. Please try again.');
      setWeatherData(null);
    }

    setLoading(false); // Stop loading after fetch
  };

  // Function to determine background and text colors based on weather conditions
  const getWeatherStyle = (condition) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'bg-gradient-to-br from-yellow-300 to-orange-400 text-gray-800';
      case 'cloudy':
      case 'overcast':
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-gray-900';
      case 'rain':
      case 'showers':
        return 'bg-gradient-to-br from-blue-500 to-gray-700 text-white';
      case 'snow':
        return 'bg-gradient-to-br from-blue-100 to-white text-gray-800';
      default:
        return 'bg-gradient-to-br from-blue-400 to-green-400 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="bg-gray-50 w-full max-w-lg rounded-lg shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">SkyCast</h1>
        
        {!weatherData && (
          <div className="mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
              className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
            <button
              onClick={fetchWeather}
              className="w-full bg-orange-500 text-white p-4 rounded-lg mt-4 hover:bg-orange-600 transition disabled:bg-gray-400"
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Loading...' : 'Get Weather'}
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        {/* Weather Information */}
        {weatherData && (
          <div className={`${getWeatherStyle(weatherData.current.condition.text)} p-8 rounded-lg shadow-lg text-center space-y-4`}>
            <h2 className="text-3xl font-bold">{weatherData.location.name}</h2>
            <p className="text-lg">{weatherData.current.condition.text}</p>
            <p className="text-5xl font-extrabold">{weatherData.current.temp_c}°C</p>
            <p className="text-lg">Humidity: {weatherData.current.humidity}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashBoard;
