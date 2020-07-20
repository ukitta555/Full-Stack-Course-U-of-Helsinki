import React, {useState, useEffect} from 'react'
import axios from 'axios'
import FindField from "./FindField"
import SearchOptions from "./SearchOptions"

const App = () => 
{
  const [filter, setFilter] = useState ('')
  const [data, setData] = useState ([])
  useEffect (() => {
                    axios.get("https://restcountries.eu/rest/v2/all")
                          .then(response => {
                            console.log (response)
                            setData(response.data)
                          })
                    }, [])
  const changeCountryInput = (event) => {
    setFilter (event.target.value)
  }  

  
  
  return (
    <div>
       Find countries: 
      <FindField filter = {filter} changeCountryInput = {changeCountryInput}/>
      <SearchOptions data = {data} filter = {filter}/>
    </div>
 )
}

export default App;
