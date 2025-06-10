
export type WeatherInfo = {
    current: {
      temperature_2m: number;
      wind_speed_10m: number;
      precipitation: number;
      weather_code: number;
    };
    current_units: {
      temperature_2m: string;
      wind_speed_10m: string;
      precipitation: string;
    };
  };
  
  export type WeatherData = {
    city: string;
    weather: WeatherInfo;
  };