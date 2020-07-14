import React from "react"
import Person from "./Person"

const Persons = ({persons, filter}) => 
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
                /> 
              )
    }
  </ul>
  )
}
  
    

export default Persons