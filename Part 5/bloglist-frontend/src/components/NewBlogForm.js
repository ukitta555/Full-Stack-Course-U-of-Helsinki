import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {setNotification} from '../reducers/NotificationReducer'
const NewBlogForm = ({ addBlog}) =>
{
  const dispatch = useDispatch()
  const emptyBlog = {
    author: '',
    title: '',
    likes: 0,
    url: ''
  }
  const [newBlog, setNewBlog] = useState(emptyBlog)

  const createBlog = async (event) =>
  {
    event.preventDefault()
    try
    {
      addBlog(newBlog)
      setNewBlog(emptyBlog)
    }
    catch (exception)
    {
      dispatch(setNotification({
        content: exception,
        isGood: false
      }))
    }
  }
  return (
    <form onSubmit = {createBlog} className = 'newBlogForm'>
      <div>
        title
        <input
          id = 'title'
          type = 'text'
          value = {newBlog.title}
          onChange = {({ target }) => setNewBlog(
            {
              ...newBlog,
              title: target.value
            }
          )}
        >
        </input>
      </div>
      <div>
        author
        <input
          id = 'author'
          type = 'text'
          value = {newBlog.author}
          onChange = {({ target }) => setNewBlog(
            {
              ...newBlog,
              author: target.value
            }
          )}
        >
        </input>
      </div>
      <div>
        url
        <input
          id = 'url'
          type = 'text'
          value = {newBlog.url}
          onChange = {({ target }) => setNewBlog(
            {
              ...newBlog,
              url: target.value
            }
          )}
        >
        </input>
      </div>
      <button
        id = 'createNewBlogButton'
        type = 'submit'
      >
         Create new blog!
      </button>
    </form>
  )
}

export default NewBlogForm