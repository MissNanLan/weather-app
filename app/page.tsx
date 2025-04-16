import WeatherApp from "@/components/weather-app";

export default function Home() {
  return (
    <main className=" min-h-screen bg-gradient-to-r from-blue-600 to-blue-500">
      <WeatherApp defaultCity="上海" />
    </main>
  );
}
