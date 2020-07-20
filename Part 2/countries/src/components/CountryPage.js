import React from "react"

const CountryPage = ({country}) => 
{
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
      <img src = {country.flag} alt={country.name +' flag'} width="500" height="300"></img>
    </div>
  )
}

export default CountryPage;