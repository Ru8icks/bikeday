import type { WeatherData } from '../types'; 
import { getWeatherIcon } from '../utils/getWeatherIcon';
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { WiRaindrop  } from "react-icons/wi";


interface WeatherDisplayProps {
  weatherData: WeatherData;
}

export const WeatherDisplay = ({ weatherData }: WeatherDisplayProps) => {
  return (
    <div className="weather-display">
      <div className="weather-icon-main">
        {getWeatherIcon(weatherData.weather.current.weather_code)}
      </div>
      <div className="weather-details">
        <h2>{weatherData.city}</h2>
        <CiTempHigh className='weather-details-icon' />
        <p>{weatherData.weather.current.temperature_2m}{weatherData.weather.current_units.temperature_2m}</p>
        <FaWind className='weather-details-icon'/>
        <p>{weatherData.weather.current.wind_speed_10m} {weatherData.weather.current_units.wind_speed_10m}</p>
        <WiRaindrop className='weather-details-icon' />
        <p>{weatherData.weather.current.precipitation} {weatherData.weather.current_units.precipitation}</p>
      </div>
    </div>
  );
};


