import { type JSX } from 'react';
import {
  WiDaySunny, WiDayCloudy, WiCloud, WiFog, WiRaindrops, WiShowers,
  WiRain, WiSnow, WiSleet, WiThunderstorm, WiDayHaze
} from 'react-icons/wi';

export const getWeatherIcon = (code: number): JSX.Element => {
  switch (code) {
    case 0:
      return <WiDaySunny />;
    case 1:
    case 2:
      return <WiDayCloudy />;
    case 3:
      return <WiCloud />;
    case 45:
    case 48:
      return <WiFog />;
    case 51: 
    case 53: 
    case 55: 
      return <WiRaindrops />;
    case 56: 
    case 57: 
      return <WiSleet />;
    case 61: 
    case 63: 
    case 65: 
      return <WiRain />;
    case 66: 
    case 67: 
      return <WiSleet />;
    case 71: 
    case 73: 
    case 75: 
      return <WiSnow />;
    case 77: 
      return <WiSnow />;
    case 80: 
    case 81: 
    case 82: 
      return <WiShowers />;
    case 85: 
    case 86: 
      return <WiSleet />;
    case 95: 
    case 96: 
    case 99: 
      return <WiThunderstorm />;
    default:
      return <WiDayHaze />;
  }
};