import React, { useState } from 'react'
import ReactDOM from 'react-dom'



const Button = ({text, handleClick}) =>
{
    return (<button onClick={handleClick}>{text}</button>)
} 

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleButtonClick = (value, setValue) => () => setValue(value + 1)

    return (
      <div>
        <h1> Give feedback </h1>
        <Button text = "good" handleClick = {handleButtonClick (good, setGood)} />
        <Button text = "neutral" handleClick = {handleButtonClick (neutral, setNeutral)}/>
        <Button text = "bad" handleClick = {handleButtonClick (bad, setBad)}/>
        <h1> Stats </h1>
        <p> good {good} </p>
        <p> neutral {neutral}</p>
        <p> bad {bad} </p>
      </div>
    )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)