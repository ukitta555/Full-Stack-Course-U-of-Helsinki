import React, { useState } from 'react'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      id: 1,
      phone: '123-123-123'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhoneNumber, setNewPhoneNumber] = useState ('')
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
                .indexOf(newName) != -1)
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
      <form onSubmit = {addNumber}>
        <div>
          name: <input value = {newName} onChange = {changeNameInput}/>
        </div>
        <div>
          number: <input value = {newPhoneNumber} onChange = {changePhoneInput}/>
        </div>
        <div>
          <button type="submit"> add </button>
        </div>
      </form>
      <h2>Numbers</h2>
        <ul>
            {persons.map(
                        (person) => 
                        <Person key = {person.id} 
                                person = {person} 
                        />
            )}
        </ul>
    </div>
  )
}

export default App