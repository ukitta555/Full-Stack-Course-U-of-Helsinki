import React from "react"
import Person from "./Person"


const Persons = ({persons, filter, handleDeleteButtonClick}) => 
{
  return (
    <ul>
    {persons.filter(
            (person) => person.name
                        .toLocaleLowerCase()
                        .includes(filter.toLocaleLowerCase())
            )
            .map(
                (person) => 
                <Person key = {person.id} 
                        person = {person}
                        handleDeleteButtonClick = {handleDeleteButtonClick} 
                /> 
              )
    }
  </ul>
  )
}
  
    

export default Persons