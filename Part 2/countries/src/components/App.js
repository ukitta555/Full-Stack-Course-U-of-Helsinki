import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FindField from "./FindField"
import CountryPage from "./CountryPage"
import ButtonToCountryPage from "./ButtonToCountryPage"
import SearchOptions from "./SearchOptions"

const App = () => 
{
  let filteredData = []
  const [searchResult, setSearchResult] = useState (<></>);
  const [filter, setFilter] = useState ('')
  const [data, setData] = useState ([])
  useEffect (() => {
                    axios.get("https://restcountries.eu/rest/v2/all")
                          .then(response => {
                            console.log (response)
                            setData(response.data)
                          })
                    }, [])

  
  const generateHandler = index =>
  {
    return (() => 
            {
              setSearchResult (<CountryPage country = {filteredData[index]}/>)
              console.log (searchResult)
            })
  }

  const changeCountryInput = (event) => {
    
    setFilter (event.target.value)
    if (event.target.value !== '')
    { 
      filteredData = data.filter(country => 
                                  country.name.toLocaleLowerCase()
                                              .includes(event.target.value.toLocaleLowerCase())
                                ) 
    }
    if (filteredData.length > 10)
    {
      setSearchResult (<p> Too many matches. Specify another filter! </p>)
    }
    else if (filteredData.length < 10 && filteredData.length > 1) 
    {
      setSearchResult ( <ul> 
                        {
                          filteredData.map ((country, index) => 
                                            {
                                              return (
                                                <div key = {country.name}>
                                                  <li> 
                                                      {
                                                      country.name
                                                      } 
                                                  </li>
                                                  <ButtonToCountryPage
                                                      handleClick = {generateHandler(index)}
                                                  />
                                                </div>
                                              )
                                            }  
                                            ) 
                        }
                    </ul>)
    }
    else if (filteredData.length === 1)
    {
      setSearchResult  (<CountryPage country = {filteredData[0]}/>)
    }
    else 
    {
      setSearchResult(<p></p>)
    }
  }  

  


  return (
    <div>
       Find countries: 
      <FindField filter = {filter} changeCountryInput = {changeCountryInput}/>
      <SearchOptions searchResult = {searchResult} />
    </div>
 )
}

export default App;
