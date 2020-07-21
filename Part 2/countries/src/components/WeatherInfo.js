import React from "react"

const WeatherInfo = ({weatherData, capital}) =>
{
  if (weatherData === null)
  {
    return (<></>)
  }
  else 
  {
    return (
      <div>
        <h3> Weather in {capital} </h3>
        <p> <b>temperature:</b> {weatherData.temperature} Celsius</p>
        <img src={weatherData.weather_icons[0]} alt={weatherData.weather_descriptions}></img>
        <p> <b>wind: </b> {weatherData.wind_speed} mph </p>
        <p>direction {weatherData.wind_dir} </p>
      </div>
    )
  }
}

export default WeatherInfo