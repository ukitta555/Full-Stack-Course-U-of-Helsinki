import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState ('')
  const [ filter, setFilter ] = useState ('')

  useEffect( () => 
                  { 
                    axios.get('http://localhost:3001/persons')
                        .then(response => setPersons(response.data))
                  } 
           , [])

  const changeFilter = (event) => {
    console.log (event.target.value)
    setFilter(event.target.value)
  }
  const changeNameInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const changePhoneInput = (event) => {
    console.log(event.target.value)
    setNewPhoneNumber(event.target.value)
  }
  const addNumber = (event) => {
    event.preventDefault()
    if (newName === '' || newPhoneNumber === '')
    {
        alert (`You haven't filled all the fields yet.`)
    } else if (persons.map
                (person => person.name.toLocaleLowerCase())
                .indexOf(newName) !== -1)
    {
        alert (`${newName} is already present in phonebook`)
    } else 
    {
        setPersons (persons.concat({name: newName,
                                    id: persons.length + 1,
                                    phone: newPhoneNumber 
                                  }))
        setNewName('')
        setNewPhoneNumber('')
    }            
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} changeFilter = {changeFilter} />
      <h3>add a new person: </h3>
      <PersonForm addNumber = {addNumber}
                  newName = {newName}
                  changeNameInput = {changeNameInput}
                  newPhoneNumber = {newPhoneNumber}
                  changePhoneInput = {changePhoneInput}
      />
      <h3> Numbers </h3>
        <Persons persons = {persons} filter = {filter} />
    </div>
  )
}

export default App