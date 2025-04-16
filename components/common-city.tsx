
// 常用城市列表
const COMMON_CITIES = [
  { id: 1, name: "北京", code: "110100" },
  { id: 2, name: "上海", code: "310100" },
  { id: 3, name: "广州", code: "440100" },
  { id: 4, name: "深圳", code: "440300" },
  { id: 5, name: "杭州", code: "330100" },
  { id: 6, name: "南京", code: "320100" },
  { id: 7, name: "武汉", code: "420100" },
  { id: 8, name: "成都", code: "510100" },
];

interface CommonCityProps {
  onSelectCity: (cityName: string) => void;
  className?: string;
  cities?: Array<{ id: number; name: string; code: string }>;
}

export default function CommonCity({ 
  onSelectCity, 
  className = "", 
  cities = COMMON_CITIES 
}: CommonCityProps) {
  return (
    <div className={`mt-4 ${className}`}>
      <h3 className="text-lg font-medium mb-2">常用城市</h3>
      <div className="grid grid-cols-4 gap-2">
        {cities.map((city) => (
          <div
            key={city.id}
            onClick={() => onSelectCity(city.name)}
            className="border border-gray-200 rounded-md p-2 text-center"
          >
            {city.name}
          </div>
        ))}
      </div>
    </div>
  );
}
