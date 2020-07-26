import React, { useState, useEffect } from 'react'
import personService from '../services/personsBackend'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'

const App = () => 
{
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState ('')
  const [ filter, setFilter ] = useState ('')

  useEffect( () => 
                  { 
                    personService
                    .getAll()
                    .then(persons => setPersons(persons))
                  } 
           , [])

  const changeFilter = event => setFilter(event.target.value)
  const changeNameInput = event => setNewName(event.target.value)
  const changePhoneInput = event => setNewPhoneNumber(event.target.value)

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
      const newEntry = {
                        name: newName,
                        phone: newPhoneNumber,
                       }
      personService.addPerson(newEntry)
                    .then(entry => 
                                      {
                                        setPersons (persons.concat(entry))
                                        setNewName('')
                                        setNewPhoneNumber('')
                                      }
                          )
    }            
  }

  const handleDeleteButtonClick = person => 
  {
    const toDelete = window.confirm (`Delete ${person.name}?`)
    if (toDelete)
    {
      const request = personService.deletePerson(person.id)
      request.then(() => 
                    { 
                      setPersons(persons.filter(entry => person.id !== entry.id))
                    })
            .catch (error =>  
                          {
                              alert (`Connection error or no such person found! Error: ${error}`) 
                          })

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
        <Persons persons = {persons}
                 filter = {filter} 
                 handleDeleteButtonClick = {handleDeleteButtonClick}
        />
    </div>
  )
}

export default App