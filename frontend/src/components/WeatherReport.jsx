import React from "react";

function WeatherReport(props) {
  const city = props.city;
  const temperature = props.temperature;
  const description = props.description;
  const imageURL = props.imageURL;
  return (
    <div className="container">
      <h2 className=" "> {city} : {temperature}°C</h2>
      <h3 className=""> {description} <img src={imageURL} alt=""></img></h3>
      
    </div>
  );
}

export default WeatherReport;
