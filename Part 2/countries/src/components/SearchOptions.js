import React from "react"
import CountryPage from "./CountryPage"
const SearchOptions = ({data, filter}) => 
{
  let filteredData = []
  
  if (filter !== '')
  { 
    filteredData = data.filter(country => 
                                country.name.toLocaleLowerCase()
                                            .includes(filter.toLocaleLowerCase())
                              ) 
  }

  let searchResult;
  if (filteredData.length > 10)
  {
    searchResult = <p> Too many matches. Specify another filter! </p>
  }
  else if (filteredData.length < 10 && filteredData.length > 1) 
  {
    searchResult = <ul> 
                      {
                        filteredData.map (country => 
                                           {
                                             return (
                                               <li key = {country.name}> 
                                                  {
                                                  country.name
                                                  } 
                                               </li>
                                             )
                                           }  
                                          ) 
                      }
                  </ul>
  }
  else if (filteredData.length === 1)
  {
    searchResult = <CountryPage country = {filteredData[0]}/>
  }
  return (
    <div> {searchResult} </div>
  )
}

export default SearchOptions;