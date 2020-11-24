import React from 'react'

const NewBlogForm = ({ newBlog, setNewBlog, addBlog }) =>
{


  return (
    <form onSubmit = {addBlog}>
      <div>
        title
        <input
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
      <button type = "submit"> Create new blog! </button>
    </form>
  )
}

export default NewBlogForm