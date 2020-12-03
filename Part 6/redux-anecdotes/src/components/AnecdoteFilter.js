import React from 'react'
import {useDispatch} from 'react-redux'
import {changeFilter} from '../reducers/filterReducer'

const AnecdoteFilter = () => {
  const dispatch = useDispatch()

  const style = {
    marginBottom: 10
  }


  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value))
  }

  return (
    <div style = {style}>
      filter
      <input
        name = 'filter'
        onChange = {handleChange}
      >
      </input>
    </div>
  )
}

export default AnecdoteFilter