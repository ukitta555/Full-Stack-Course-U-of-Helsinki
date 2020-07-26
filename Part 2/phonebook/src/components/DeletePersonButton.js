import React from 'react'

const DeletePersonButton = ({person, handleClick}) =>
{
  
  return <button onClick = {() => handleClick(person)}> delete </button>
}

export default DeletePersonButton