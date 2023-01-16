// import { useEffect, useState } from "react";
import Search from "./search";
import CurrentWeather from "./weather-cards";
import { WEATHER_API_KEY } from "./api";
import { WEATHER_API_URL } from "./api";
import { useEffect, useState } from "react";
import Card from "./Card";

function App() {
  const [weatherSearch, setWeather] = useState(null);
  const [forecastSearch, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const weatherSearch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastSearch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([weatherSearch, forecastSearch])
      .then(async (response) => {
        const weatherSearch = await response[0].json();
        const forecastSearch = await response[1].json();

        setWeather({ city: searchData.label, ...weatherSearch });
        setForecast({ city: searchData.label, ...forecastSearch });
      })
      .catch((err) => console.log(err));
  };

  let [mockdata, setMockdata] = useState({});
  useEffect(() => {
    const coords = {
      "Manhattan US": [40.7283, -73.9942],
      "Hyderabad IN": [17.384, 78.4564],
      "Paris FR": [48.8569, 2.3514],
      "Sydney AU": [-33.8671, 151.2071],
    };
    async function getData() {
      for (const [city, [lat, lon]] of Object.entries(coords)) {
        const callback = await fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );
        const citydata = await callback.json();
        setMockdata((prev) => ({ ...prev, [city]: { city, ...citydata } }));
      }
    }
    getData();
  }, []);

  console.log(weatherSearch);
  console.log(forecastSearch);

  return (
    <div className="search-bar">
      <Search onSearchChange={handleOnSearchChange} />
      {weatherSearch && <CurrentWeather data={weatherSearch} />}
      <div className="static-weather">
        {Object.keys(mockdata).length !== 0 &&
          Object.values(mockdata).map((x) => <Card data={x} />)}
      </div>
    </div>
  );
}

export default App;
