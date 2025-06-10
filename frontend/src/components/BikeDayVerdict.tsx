import type { WeatherData } from '../types';

interface BikeDayVerdictProps {
  weatherData: WeatherData;
}

export const BikeDayVerdict = ({ weatherData }: BikeDayVerdictProps) => {
  
  const isGoodDay = weatherData.weather.current.precipitation === 0 
    && weatherData.weather.current.wind_speed_10m < 25 
    && weatherData.weather.current.temperature_2m > 10;
  
  if (isGoodDay) {
    return (
      <div className="verdict-card good">
        <p>Looks like a great day for a bike ride!</p>
        <p>Invite your friends!</p>
      </div>
    );
  }

  return (
    <div className="verdict-card bad">
      <p>Not the best day for a bike ride.</p>
      <p>You will have to go alone.</p>
    </div>
  );
};