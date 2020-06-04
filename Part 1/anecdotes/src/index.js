import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => 
{
return (<button onClick = {handleClick}> {text} </button>)
}

const App = (props) => {
  let dummyArray = new Array(anecdotes.length).fill(0, 0, anecdotes.length)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(dummyArray)
  const randomNumber = () => 
  {
    let number = Math.floor (Math.random() * anecdotes.length) 
    return (number)
  }

  const handleClickNextAnecdote = () => 
  {
    setSelected(randomNumber())
  }

  const handleClickVote = () =>
  {
     const copiedArray = Array.from(votes)
     copiedArray[selected] += 1
     setVotes(copiedArray)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <p> has {votes[selected]} votes</p>
      <p>
      <Button handleClick = {handleClickNextAnecdote} text = "Next anecdote"/>
      <Button handleClick = {handleClickVote} text = "vote"/>
      </p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)