export interface WeatherData {
    date: string;
    week: string;
    weather: string;
    weatherimg: string;
    weathercode: string;
    real: string;
    lowest: string;
    highest: string;
    wind: string;
    windspeed: string;
    windsc: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moondown: string;
    pcpn: string;
    uv_index: string;
    vis: string;
    humidity: string;
    tips: string;
  }
  
  export interface WeatherResponse {
    list: WeatherData[];
    province: string;
    area: string;
    areaid: string;
  }
  