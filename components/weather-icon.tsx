import { Cloud, CloudRain, CloudSnow, CloudFog, Sun, CloudLightning, CloudDrizzle, Wind } from "lucide-react"

interface WeatherIconProps {
  weather: string
  className?: string
}

export default function WeatherIcon({ weather, className = "" }: WeatherIconProps) {
  const getIcon = () => {
    if (weather.includes("晴")) {
      return <Sun className={className} />
    } else if (weather.includes("多云") || weather.includes("阴") || weather.includes("转")) {
      return <Cloud className={className} />
    } else if (weather.includes("雨") && weather.includes("雪")) {
      return <CloudSnow className={className} />
    } else if (weather.includes("雨")) {
      if (weather.includes("小雨")) {
        return <CloudDrizzle className={className} />
      }
      return <CloudRain className={className} />
    } else if (weather.includes("雪")) {
      return <CloudSnow className={className} />
    } else if (weather.includes("雾") || weather.includes("霾")) {
      return <CloudFog className={className} />
    } else if (weather.includes("雷")) {
      return <CloudLightning className={className} />
    } else if (weather.includes("风")) {
      return <Wind className={className} />
    }

    // Default icon
    return <Cloud className={className} />
  }

  return getIcon()
}
