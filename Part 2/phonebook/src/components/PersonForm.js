import React from "react"

const PersonForm = (props) =>
      <form onSubmit = {props.addNumber}>
        <div>
          name: <input value = {props.newName} onChange = {props.changeNameInput}/>
        </div>
        <div>
          number: <input value = {props.newPhoneNumber} onChange = {props.changePhoneInput}/>
        </div>
        <div>
          <button type="submit"> add </button>
        </div>
      </form>

export default PersonForm