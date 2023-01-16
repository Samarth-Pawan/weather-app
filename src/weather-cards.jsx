import "./weather-cards.css";
import Card from "./Card";

const CurrentWeather = ({ data }) => {
  return (
    <div className="container">
      <div className="dynamic-weather">
        {/* main card */}
        <Card data={data} />
      </div>
    </div>
  );
};

export default CurrentWeather;
