import { useState, useEffect } from "react";
import { ChevronLeft, Search, X, AlertCircle, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchCities } from "@/api/weather-api";
import { Area } from "@/types/city";
import CommonCity from "./common-city";


interface CitySelectorProps {
  onSelectCity: (cityName: string) => void;
  onSelectAreaCity: (city: Area) => void;
  onClose: () => void;
}

export default function CitySelector({ 
  onSelectCity, 
  onSelectAreaCity, 
  onClose 
}: CitySelectorProps) {
  const [inputCity, setInputCity] = useState("");
  const [searchResults, setSearchResults] = useState<Area[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState("");

  // 搜索城市
  useEffect(() => {
    setSearchError("");
    
    if (!inputCity.trim()) {
      setSearchResults([]);
      return;
    }
    
    const searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const cities = await searchCities(inputCity);
        setSearchResults(cities);
        if (cities.length === 0) {
          setSearchError("没有找到匹配的城市");
        }
      } catch (error) {
        console.error("Failed to search cities:", error);
        setSearchError("城市搜索失败，请稍后再试");
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [inputCity]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      onSelectCity(inputCity);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in fade-in duration-300">
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-4 shadow-md">
        <div className="flex items-center">
          <button 
            onClick={onClose} 
            className="mr-3 hover:bg-blue-800 p-1.5 rounded-full transition-colors flex items-center justify-center"
            aria-label="返回"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-semibold">选择城市</h2>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="mt-5 relative">
          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <Input
                placeholder="输入城市名称搜索"
                value={inputCity}
                onChange={(e) => setInputCity(e.target.value)}
                className="text-black"
              />
              {inputCity && (
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
                  onClick={() => setInputCity("")}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              size="icon"
              className="bg-blue-500 hover:bg-blue-700 text-white h-11 w-11 rounded-xl shadow-md transition-all"
              disabled={isSearching}
            >
              {isSearching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          </div>
        </form>
      </div>
      
      <div className="p-4 pb-24 overflow-auto max-h-[calc(100vh-136px)]">
        <div className="mt-2 mb-6">
          <CommonCity onSelectCity={onSelectCity} />
        </div>
        
        {searchResults.length > 0 && (
          <div>
            <h3 className="text-lg font-medium mb-2 text-gray-700">搜索结果</h3>
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white">
              <ul className="divide-y divide-gray-100">
                {searchResults.map((item) => (
                  <li 
                    key={item.areaid} 
                    className="py-4 px-4 hover:bg-blue-50 cursor-pointer flex items-center transition-colors"
                    onClick={() => onSelectAreaCity(item)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="text-gray-400 text-sm mr-2">{item.provincecn}</span>
                        <span className="text-lg font-medium text-gray-800">{item.citycn}</span>
                        {item.areacn && item.areacn !== item.citycn && (
                          <span className="text-gray-400 text-sm ml-2">{item.areacn}</span>
                        )}
                      </div>
                    </div>
                    <div className="text-blue-500">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        {inputCity && searchError && (
          <div className="mt-6 animate-in fade-in duration-300">
            <div className="bg-blue-50 rounded-xl p-6 text-center mb-6 border border-blue-100">
              <div className="flex justify-center mb-2">
                <AlertCircle className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-gray-600 mb-4">{searchError}</div>
              <div className="text-sm text-gray-500">你可以尝试其他城市名称</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 