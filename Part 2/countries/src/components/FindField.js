import React from "react"

const FindField = ({filter, changeCountryInput}) =>
{
  return (
    <input value = {filter} onChange = {changeCountryInput}/>
  )
}

export default FindField;