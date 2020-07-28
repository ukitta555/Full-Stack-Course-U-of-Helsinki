import React, { useState, useEffect } from 'react'
import personService from '../services/personsBackend'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'
import "../index.css"

const App = () => 
{
  const [persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber ] = useState ('')
  const [ filter, setFilter ] = useState ('')
  const [ notificationMessage, setNotificationMessage ] = useState (null)
  const [ errorMessage, setErrorMessage ] = useState (null)
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
  const showMessage = (message) => 
                                {
                                  setNotificationMessage (message)
                                  setTimeout(() => setNotificationMessage(null), 5000)
                                }
  const showError = (error) =>
                              {
                                setErrorMessage (error)
                                setTimeout(() => setErrorMessage (null), 5000)
                              }

  const addNumber = (event) => {
    event.preventDefault()
    if (newName === '' || newPhoneNumber === '')
    {
      alert (`You haven't filled all the fields yet.`)
    } else if (persons.map  // bug, need to fecth data before searching. We will probably fix it in next parts of the course!
                (person => person.name.toLocaleLowerCase())
                .indexOf(newName.toLocaleLowerCase()) !== -1)
    {
      const index = persons.map(person => 
                                        person.name.toLocaleLowerCase())
                          .indexOf(newName.toLocaleLowerCase())
      console.log (index)
      const newEntry = {
        ...persons[index],
        phone: newPhoneNumber
      }
      const toChange = window.confirm (`${newName} is already present in phonebook, replace the old number with the new one?`)
      if (toChange)
      {
        personService.changePerson(persons[index].id, newEntry)
                    .then(entry => 
                                  {
                                    setPersons(persons.map(person =>
                                                              {
                                                                return (person.id !== entry.id 
                                                                        ? person 
                                                                        : entry)
                                                              }
                                                          )
                                              )
                                    showMessage(`Changed ${persons[index].name}'s phone to ${newEntry.phone}`)
                                  }
                          )
                    .catch (error => 
                                    {
                                       //console.log(error)
                                       showError (`Information of ${persons[index].id} has already been removed from server`)
                                       setPersons (persons.filter(person => 
                                                                          {
                                                                            return person.id !== persons[index].id
                                                                          }
                                                                 )
                                                  )
                                    }
                           )             
      }
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
                                        showMessage (`Added ${newEntry.name} to the phonebook`)
                                      }
                          )
    }            
  }

  const handleDeleteButtonClick = personToDelete => 
  {
    const toDelete = window.confirm (`Delete ${personToDelete.name}?`)
    if (toDelete)
    {
      const request = personService.deletePerson(personToDelete.id)
      request.then(() => 
                    { 
                      setPersons(persons.filter(entry => personToDelete.id !== entry.id))
                      showMessage(`${personToDelete.name} has been removed from the phonebook`)
                    })
            .catch (error =>  
                          {
                              showError (`This person has already been deleted from phonebook`)
                              setPersons (persons.filter(person => 
                                                                {
                                                                  return person.id !== personToDelete.id
                                                                }
                                                        )
                                         )
                          })
    }
  }
  
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notificationMessage} styleType = "success" />
      <Notification message = {errorMessage} styleType = "error" />
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