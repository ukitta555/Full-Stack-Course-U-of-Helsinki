import React from "react" 
import DeletePersonButton from "./DeletePersonButton"

const Person = ({person, handleDeleteButtonClick}) => {
  return (
    <>
    <li> 
      {person.name} {person.phone}
      <DeletePersonButton person = {person} 
                          handleClick = {handleDeleteButtonClick}
      /> 
    </li>
    </>
  )
}

export default Person