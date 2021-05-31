import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTH } from '../queries/queries'
import Select from 'react-select'


const UpdateAuthorBirth = ({ authors }) => {
  const [name, setName] = useState(null)
  const [year, setYear] = useState(0)
  const [updateBirth] = useMutation(
    UPDATE_AUTHOR_BIRTH,
    {
      refetchQueries: [
        { query: ALL_AUTHORS },
      ]
    })


  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(name)
    updateBirth({ variables: { name: name.value, year: Number(year) } })
  }

  return (
    <div>
      <h2>
        Set birthyear
        </h2>
      <form onSubmit={onSubmit}>
        <Select
          defaultValue={name}
          onChange={setName}
          options={options}
        />
        year
        <input type='number' value={year} onChange={(e) => setYear(e.target.value)} />
        <button type='submit'> Update birth year</button>
      </form>
    </div>
  )
}

export default UpdateAuthorBirth