import { useEffect, useState } from "react";
import "./WeatherApp.css";

const WEATHER_API_KEY = "513f57b778654e148ff55144251902";
const BASE_URL = "https://api.weatherapi.com/v1";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Fetch weather data when `searchQuery` changes
  useEffect(() => {
    if (searchQuery) {
      async function getWeather() {
        setIsLoading(true);
        setIsError(false);

        try {
          const response = await fetch(
            `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${searchQuery}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const weatherJson = await response.json();

          setWeatherData(weatherJson);
          //console.log(weatherJson);
        } catch (error) {
          console.log("Error fetching data: ", error);
          alert("Failed to fetch weather data");
          setIsError(true);
          setWeatherData(null);
        } finally {
          setIsLoading(false);
          setIsError(false);
        }
      }

      getWeather();
    }
  }, [searchQuery]);

  // Function to handle change in input
  const handleSearchChange = (event) => {
    setCity(event.target.value);
  };

  // Function to handle button click (search submission)
  const handleSearchSubmit = () => {
    setSearchQuery(city); // Set `searchQuery` to trigger API call
  };

  return (
    <div className="parent">
      <h1>Weather App</h1>
      <div className="search-div">
        <input
          type="text"
          onChange={handleSearchChange}
          value={city}
          placeholder="Enter city name"
          className="search-input"
        />
        <button onClick={handleSearchSubmit} className="search-btn">
          Search
        </button>
      </div>

      {/* loading indicator */}
      {isLoading && <p>Loading data...</p>}

      {!isLoading && isError && window.alert("Failed to fetch weather data")}

      {/* Display weather data */}
      {!isLoading && weatherData && weatherData.current && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
