import CurrentWeather from "./components/current-weather/current-weather";
import { useEffect, useState } from "react";
import CurrentNightWeather from './components/current-weather/currentnight-weather';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const isNight = new Date().getHours() >= 20 || new Date().getHours() < 6; /* change .gethours to see night time feature */
  const [mode, setMode] = useState("day"); // "day" or "night"



  useEffect(() => {
    console.log('Sending request to backend...');
    fetch('http://localhost:5000/', { // here we are fetching the data from the localhost:5000 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Weather data from backend:', data);
        setWeatherData(data); // store backend data
      })
      .catch(err => {
        console.error('Error fetching weather data:', err);
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
