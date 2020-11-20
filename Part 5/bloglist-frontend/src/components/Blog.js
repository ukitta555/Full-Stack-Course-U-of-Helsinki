import React, {useState} from 'react'
const Blog = ({ blog }) => {
  const [isInformationHidden, setIsInformationHidden] = useState (true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const toggleInforamtion = () => {
    setIsInformationHidden(!isInformationHidden)
    console.log(isInformationHidden)
  }

  const handleLikeClick= () => {
    console.log("someone likes the blog!")
  }

  const Info = (
    <div>
      <p>
        URL: {blog.url}
      </p>
      <p>
        Likes: {blog.likes}
        <button onClick = {handleLikeClick}> like </button>
      </p>
      <p>
        Created by: {blog.user.name}
      </p>
    </div>
  )
  return (
  <div style = {blogStyle}>
    {blog.title} {blog.author}
    <button onClick = {toggleInforamtion}> view </button>
    <div>
    {
      isInformationHidden ? '' : Info
    }
    </div>
  </div>
  )
}

export default Blog
