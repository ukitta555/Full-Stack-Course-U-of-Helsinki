import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import { addComment } from '../reducers/BlogsReducer'

const CommentForm = ({blog}) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(blog.id)
    await dispatch(addComment({comment}, blog.id))
    setComment('')
    console.log('submitted hehehehe')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <input
          value = {comment}
          onChange = {handleCommentChange}
        >
        </input>
        <button type = 'submit'>
          add comment
        </button>
      </form>
    </div>
  )
}

export default CommentForm