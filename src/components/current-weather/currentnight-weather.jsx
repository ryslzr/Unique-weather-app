import "./currentnight-weather.css";
import React, { useState, useEffect } from 'react';
import ImageOne from '../../assets/new 1.png';
import ImageTwo from '../../assets/new 2.png';



const getPersonaMessage = (description) => {
  const desc = description.toLowerCase();
    

  if (desc.includes("clear") || desc.includes("sun")) {
    return "It's time to hit the bed! 🌙";
  } else if (desc.includes("rain")) {
    return "Ah rain noise helps me 💤";
  } else if (desc.includes("cloud")) {
    return "Clouds are hiding the moon 🌕";
  } else if (desc.includes("snow")) {
    return "Better get the extra duvet! 🥶";
  } else if (desc.includes("wind")) {
    return "Better shut the windows 🌬️";
  } else {
    return "Weather's doing its thing 🌈";
  }
};


function CurrentNightWeather({ data }) {
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

    <div className="weathernight">
        <div className="weather-selector"> {/* remove this section to remove test of persona */}
  <label style={{ color: "#dbdbdbff" }}>Test Weather:</label>
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

export default CurrentNightWeather;


