import { useState } from 'react';
import './App.css';
import type { WeatherData } from './types';
import { BikeDayVerdict } from './components/BikeDayVerdict';
import { WeatherDisplay } from './components/WeatherDisplay';


function App() {
  const [city, setCity] = useState('Trondheim');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!city) {
      setError("Please enter a city name.");
      return;
    }
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      setWeatherData(data);

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Weather</h1>
      </header>
      <main>
        <div className="form-container">
          <div className="input-group">
            <label>City Name</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <div className="results-container">
          {error && <p className="error-message">{error}</p>}
          
          {weatherData && !loading && (
            <div className='weather-data'>
              <BikeDayVerdict weatherData={weatherData} />
              <WeatherDisplay weatherData={weatherData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;