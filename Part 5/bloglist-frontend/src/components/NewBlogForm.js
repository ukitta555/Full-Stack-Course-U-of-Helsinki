import React, {useState} from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({user}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')

  const addBlog = async () => {
    const newBlog = {
      title: title,
      author: author,
      url: URL,
      likes: 0
    }
    await blogService.createBlog(newBlog)
  }
  return (
    <form onSubmit = {addBlog}>
      <div>
        title
        <input
          type = 'text'
          value = {title}
          onChange = {({target}) => setTitle(target.value)}
        >
        </input>
      </div>
      <div>
        author
        <input
          type = 'text'
          value = {author}
          onChange = {({target}) => setAuthor(target.value)}
        >
        </input>
      </div>
      <div>
        url
        <input
          type = 'text'
          value = {URL}
          onChange = {({target}) => setURL(target.value)}
        >
        </input>
      </div>
      <button type = "submit"> Create new blog! </button>
    </form>
  )
}

export default NewBlogForm