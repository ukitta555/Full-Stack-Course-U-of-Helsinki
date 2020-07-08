import React from 'react';


const Header = ({ content }) => {
    return (
      <h1>{content}</h1>
    )
  }
  
  
  const Total = ({ parts }) => {
    const sum = parts.reduce ((counter, part) => counter + part.exercises, 0)
    return(
      <b>Total of {sum} exercises</b>
    ) 
  }
  
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map(
          part => 
            <Part key = {part.id} 
                  part = {part}
            />
        )}
      </div>
    )
  }
  
  const Course = ({course}) => {
    return (
      <>
      <Header content = {course.name}/>
      <Content parts = {course.parts}/>
      <Total parts = {course.parts}/>
      </>
      )
  }
  
export default Course