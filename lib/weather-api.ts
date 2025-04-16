import { Area, CityLookupResponse } from "@/types/city";
import { WeatherResponse } from "../types/weather";
// 天行API key
const API_KEY = process.env.NEXT_PUBLIC_API_KEY 


// 城市查询函数
export async function searchCities(keyword: string): Promise<Area[]> {
  if (!keyword.trim()) {
    return [];
  }
  
  try {
    // 使用API参数进行城市搜索
    const response = await fetch(`https://apis.tianapi.com/citylookup/index?key=${API_KEY}&area=${encodeURIComponent(keyword)}`);
    const data: CityLookupResponse = await response.json();
    console.log('City lookup response:', data);
    
    if (data.code === 200 && data.result && data.result.list && data.result.list.length > 0) {
      return data.result.list;
    }
    
    // 如果API调用失败或无结果，返回空数组
    return [];
  } catch (error) {
    console.error("城市查询出错:", error);
    // 在网络错误或其他问题的情况下，返回空数组
    return [];
  }
}




export async function fetchWeatherData(city: string): Promise<WeatherResponse> {
  try {
    const response = await fetch(`https://apis.tianapi.com/tianqi/index?city=${encodeURIComponent(city)}&key=${API_KEY}&type=7`)
    const data = await response.json()
    console.log('Weather API response:', data)
    
    if (data.code !== 200) {
      throw new Error(data.msg || 'Failed to fetch weather data')
    }
    
    return data.result;
  } catch (error) {
    console.error('Error fetching weather data:', error)
    // 在捕获到错误时，重新抛出错误让调用者处理
    throw error;
  }
}


