import "./current-weather.css";
import React, { useState, useEffect } from 'react';
import ImageOne from '../../assets/bew 1.png';
import ImageTwo from '../../assets/bew 2.png';



const getPersonaMessage = (description) => {
  const desc = description.toLowerCase();
    

  if (desc.includes("clear") || desc.includes("sun")) {
    return "It's a lovely day today! ☀️";
  } else if (desc.includes("rain")) {
    return "It's a gloomy day ☔️";
  } else if (desc.includes("cloud")) {
    return "It's a bit cloudy out there 🌥️";
  } else if (desc.includes("snow")) {
    return "Bundle up—it's snowy! ❄️";
  } else if (desc.includes("wind")) {
    return "It's windy outside, careful!🍃";
  } else {
    return "Weather's doing its thing 🌈";
  }
};


function CurrentWeather({ data }) {
  const [showFirst, setShowFirst] = useState(true);
  const [testDescription, setWeatherDescription] = useState(data?.description || "");

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst(prev => !prev);
    }, 750); // Switch every 1 seconds
    return () => clearInterval(interval);
  }, []);

  if (!data) return null;

  return (

    <div className="weather">
        <div className="weather-selector"> {/* remove this section to remove test of persona */}
  <label>Test Weather:</label>
  <select onChange={(e) => setWeatherDescription(e.target.value)}>
    <option value="clear">Clear</option>
    <option value="rain">Rain</option>
    <option value="clouds">Clouds</option>
    <option value="snow">Snow</option>
    <option value="wind">Wind</option>
  </select>
    </div> 
    
        <div className="speech-box"> 
            <div className="persona-message"> 
                 <p>{getPersonaMessage(testDescription)}</p> {/* change to "data.description" if wanted to see real weather description */}
                     </div>
                         </div>   
      <div className="top">
        <div className="box">
           <img
          src={showFirst ? ImageOne : ImageTwo} alt="Weather Icon" className="weather-icon"
        />
        </div>
        
        
          <div className="bottom-box">
            <div className="bottom-text1">
                <h3 className="city">{data.city}</h3>
                <div className="bottom-text2"><p className="temperature">{data.temperatureC}°C / {data.temperatureF}°F</p></div>
            </div>
          </div>        
          </div>
        </div>
        
    
  );
};

export default CurrentWeather;

