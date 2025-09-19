import CurrentWeather from "./components/current-weather/current-weather";
import { useEffect, useState } from "react";
import CurrentNightWeather from './components/current-weather/currentnight-weather';


function App() {
  const [cycle, setCycle] = useState("day"); // or "night" as default
  const [weatherData, setWeatherData] = useState(null);
  const isNight = new Date().getHours() >= 20 || new Date().getHours() < 6; /* change .gethours to see night time feature */
  const [mode, setMode] = useState("day"); // "day" or "night"



  useEffect(() => {
  const mockResponse = {
    city: "Birmingham",
    weather: [{ description: "Partly cloudy" }],
    main: { temp: 18 },
    sunrise: 1660000000,
    sunset: 1660040000,
  };

  const mockFetch = () =>
    new Promise(resolve => {
      setTimeout(() => resolve({ json: () => mockResponse }), 500);
    });

  mockFetch()
    .then(res => res.json())
    .then(data => {
      setWeatherData(data);
      const now = Date.now() / 1000;
      setCycle(now > data.sunset || now < data.sunrise ? "night" : "day");
    });
}, []);

  

  return (
    
    <div>
      <select onChange={(e) => setMode(e.target.value)}> {/* //a test implementation to see the day and night cycle. */}
  <option value="day">Day</option>
  <option value="night">Night</option>
</select>

{mode === "night" ? (  /* so we get to choose wether it is day or night */
  <CurrentNightWeather data={weatherData} />
) : (
  <CurrentWeather data={weatherData} />
)}

 {/* change to this if wanted to see the real time of day and cycle */}
  {/*     {isNight ? (
  <CurrentNightWeather data={weatherData} /> 
) : (
  <CurrentWeather data={weatherData} />
)} */}
    </div>
  );
}

export default App;
