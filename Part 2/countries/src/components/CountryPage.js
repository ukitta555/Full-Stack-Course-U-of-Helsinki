import React, { useState, useEffect } from "react"
import axios from "axios"
import WeatherInfo from "./WeatherInfo"

const CountryPage = ({country}) => 
{
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState (null)

  const params = 
  {
    access_key: api_key,
    query: country.capital
  }
  
  const getCapitalWeather = () =>
  {
      axios.get(`http://api.weatherstack.com/current`, {params})
            .then (response => {
                                  setWeatherData(response.data.current)
                                  console.log(response.data.current)
                               })
            .catch((e) => console.log(e))
  }

  useEffect(getCapitalWeather , []) 
  return (
    <div>
      <h2> {country.name}</h2>
      <p> capital {country.capital} </p>
      <p> population {country.population} </p>
      <h3> languages </h3>
      <ul>
        {
          country.languages.map(
                              language => 
                                <li key = {language.name}>
                                  {language.name}
                                </li>
                              )
        }
      </ul>
      <img src = {country.flag} 
          alt={country.name +' flag'} 
          width="500" 
          height="300">
      </img>
      <WeatherInfo weatherData = {weatherData} capital = {country.capital}/>
    </div>
  )
}

export default CountryPage;