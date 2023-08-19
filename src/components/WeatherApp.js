import "./Design.css";
import React, { useState } from 'react';
import SearchImg from "./images/search.png"
import ClearImg from "./images/clear.png"
import CloudsImg from "./images/clouds.png"
import DrizzleImg from "./images/drizzle.png"
import MistImg from "./images/mist.png"
import RainImg from "./images/rain.png"
import SnowImg from "./images/snow.png"
import ThunderstromImg from "./images/thunderstorm.png"
import SmokeImg from "./images/ash.png";
import HazeImg from "./images/fog.png"
import FogImg from "./images/fog.png";
import DustImg from "./images/sand.png";
import SandImg from "./images/sand.png";
import AshImg from "./images/ash.png";
import SquallImg from "./images/squall.png";
import TornadoImg from "./images/tornado.png"
import HumidityImg from "./images/humidity.png"
import WindImg from "./images/wind.png"

const WeatherApp = () => {
    const apiKey = "c45e1ad83d9690f5a8e314eac1ff6b84";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
  
    const [place, setPlace] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
  
    const handleChange = (event) => {
      setPlace(event.target.value);
    };
  
    const checkWeather = async () => {
      try {
        setError(null);
        const response = await fetch(apiUrl + place + `&appid=${apiKey}`);
      if (response.status === 404) {
        setError("Invalid place name!");
        setWeatherData(null);
      } else {
        const data = await response.json();
        setWeatherData(data);
      }
    } catch (error) {
      setError("Error fetching data!");
      setWeatherData(null);
    }
  };

  const weatherIcon = () => {
    if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
      const weatherMain = weatherData.weather[0].main;
      switch (weatherMain) {
        case "Clouds":
           return CloudsImg;
        case "Clear":
            return ClearImg;
        case "Rain":
            return RainImg;
        case "Drizzle":
            return DrizzleImg;
        case "Mist":
            return MistImg;
        case "Snow":
            return  SnowImg;
        case "Thunderstrom":
            return  ThunderstromImg;
        case "Smoke":
            return  SmokeImg;
        case "Haze":
            return  HazeImg;
        case "Dust":
            return  DustImg;
        case "Fog":
            return  FogImg;
        case "Sand":
            return  SandImg;
        case "Ash":
            return  AshImg;
        case "Squall":
            return  SquallImg;
        case "Tornado":
            return  TornadoImg;
        default :
          return null
      }
    }
      return null;
  };

  return (
    <div className="card">
      <div className="search">
        <input
          type="text"
          placeholder="enter place name"
          spellCheck="false"
          value={place}
          onChange={handleChange}
        />
        <button onClick={checkWeather}>
          <img src={SearchImg} alt="Search" />
        </button>
      </div>

      {error && <div className="error"><h6>`</h6><p>Error: {error}</p></div>}

      {weatherData && (
        <div className="weather">
          <img src={weatherIcon()} className="weather-icon"  alt='' />
          <h1 className="temp">{Math.round(weatherData.main.temp)}°c</h1>
          <h2 className="place">{weatherData.name}</h2>
          <div className="details">
            <div className="col">
              <img src={HumidityImg} alt="Humidity Icon" />
              <div>
                <p className="humidity">{weatherData.main.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
            <div className="col">
              <img src={WindImg} alt="Wind Icon" />
              <div>
                <p className="wind">{weatherData.wind.speed} km/h</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp