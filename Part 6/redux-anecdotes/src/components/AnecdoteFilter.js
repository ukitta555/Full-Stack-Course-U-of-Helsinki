import React from 'react'
import {connect} from 'react-redux'
import {changeFilter} from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  const style = {
    marginBottom: 10
  }


  const handleChange = (event) => {
    props.changeFilter(event.target.value)
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

const mapDispatchToProps = {
  changeFilter
}

const ConnectedFilter = connect (null, mapDispatchToProps)(AnecdoteFilter)

export default ConnectedFilter