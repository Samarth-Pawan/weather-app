const Card = ({ data }) => {
  return (
    <div className="weather-card">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="description">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className="weather-icon"
          src={`src/icons/${data.weather[0].icon}.png`}
        />
      </div>

      <div className="bottom">
        <div className="temperature">{Math.round(data.main.temp)}°C</div>
        <div className="details">
          Details
          <div className="row">
            <span className="label">Feels-like</span>
            <span className="value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="row">
            <span className="label">Wind</span>
            <span className="value">{data.wind.speed}m/s</span>
          </div>
          <div className="row">
            <span className="label">Pressure</span>
            <span className="value">{data.main.pressure} hPa</span>
          </div>
          <div className="row">
            <span className="label">Humidity</span>
            <span className="value">{data.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
