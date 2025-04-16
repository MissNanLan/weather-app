"use client";

import { useState, useEffect } from "react";
import { MapPin, Clock, Shirt } from "lucide-react";
import WeatherIcon from "./weather-icon";
import CitySelector from "./city-selector";
import { formatDate, getCurrentTime } from "@/lib/date-utils";
import { fetchWeatherData } from "@/lib/weather-api";
import { WeatherResponse } from "@/types/weather";
import { Area } from "@/types/city";

interface WeatherAppProps {
  defaultCity: string;
}

export default function WeatherApp({ defaultCity }: WeatherAppProps) {
  const [city, setCity] = useState(defaultCity);
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showCitySelector, setShowCitySelector] = useState(false);

  // 每分钟更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // 获取天气数据
  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setError(false);
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, [city]);

  const handleCityChange = (cityName: string) => {
    if (cityName.trim()) {
      setCity(cityName.trim());
      setShowCitySelector(false);
    }
  };

  const handleAreaCitySelect = (city: Area) => {
    setCity(city.adcode);
    setShowCitySelector(false);
  };

  // 显示加载状态
  if (loading && !weatherData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">加载中...</div>
      </div>
    );
  }

  const currentWeather = weatherData?.list[0];

  return (
    <>
      {showCitySelector && (
        <CitySelector
          onSelectCity={handleCityChange}
          onSelectAreaCity={handleAreaCitySelect}
          onClose={() => setShowCitySelector(false)}
        />
      )}
      <div className="h-full text-white">
        {/* 可点击的城市区域 */}
        <div className="flex justify-between items-center p-4 border-b border-blue-400">
          <div
            className="flex gap-2 cursor-pointer"
            onClick={() => setShowCitySelector(true)}
          >
            <MapPin className="h-5 w-5" />
            <span className="text-xl font-semibold">
              {weatherData?.area || city}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span className="text-xl">{currentTime}</span>
          </div>
        </div>

        {/* 当前天气 */}
        <div className="p-8 flex flex-col items-center flex-1">
          <div className="text-8xl font-light">
            {currentWeather?.real?.replace("℃", "") || "--"}
            <span className="text-4xl align-top">°C</span>
          </div>
          <div className="text-2xl mt-2">
            {currentWeather?.weather || "未知天气"}
          </div>
          <div className="text-sm mt-2 text-left">
            <div className="flex items-center gap-2">
              <Shirt className="h-4 w-4" />
              <span>{currentWeather?.tips}</span>
            </div>
          </div>
        </div>

        {/* 详情 */}
        <div className="grid grid-cols-4 text-center p-4 border-t border-blue-400">
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-100">降水</span>
            <span className="font-semibold">
              {currentWeather?.pcpn || "0.0"}mm
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-100">风向</span>
            <span className="font-semibold">
              {currentWeather?.wind || "未知"}
            </span>
            <span className="text-sm">{currentWeather?.windsc || "未知"}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-100">相对湿度</span>
            <span className="font-semibold">
              {currentWeather?.humidity || "0"}%
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-blue-100">能见度</span>
            <span className="font-semibold">
              {currentWeather?.vis || "0"}km
            </span>
          </div>
        </div>

        {/* 7-day 天气预报 */}
        <div className="overflow-x-auto border border-blue-400">
          <div className="flex">
            {weatherData?.list.map((day, index) => (
              <div
                key={index}
                className="flex-1 w-[100px] text-center p-2 border-r border-blue-400 last:border-r-0 hover:bg-blue-600 transition-colors"
              >
                <div className="font-semibold">
                  {index === 0
                    ? "今天"
                    : index === 1
                    ? "明天"
                    : index === 2
                    ? "后天"
                    : day.week}
                </div>
                <div className="text-sm text-blue-100">
                  {formatDate(day.date).date}
                </div>
                <div className="py-2">
                  <WeatherIcon
                    weather={day.weather}
                    className="h-10 w-10 mx-auto"
                  />
                </div>
                <div className="font-semibold">
                  {day.highest}/{day.lowest}
                </div>
                <div className="text-sm">{day.weather}</div>
                <div className="text-sm text-blue-100">{day.wind}</div>
                <div className="text-sm text-blue-100">{day.windsc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
