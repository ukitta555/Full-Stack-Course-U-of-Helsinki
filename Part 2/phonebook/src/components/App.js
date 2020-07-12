import React, { useState } from 'react'
import Person from './Person'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      id: 1
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const changeInput = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const addNumber = (event) => {
    event.preventDefault()
    setPersons (persons.concat({name: newName, id: persons.length + 1}))
    setNewName('')
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addNumber}>
        <div>
          name: <input value = {newName} onChange = {changeInput}/>
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