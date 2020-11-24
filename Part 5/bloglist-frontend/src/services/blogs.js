import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) =>
{
  if (newToken === null)
  {
    token = null
  }
  else
  {
    token = `bearer ${newToken}`
  }
}

const getAll = async () =>
{
  const response = await axios.get(baseUrl)
  return response.data
}

const updateBlog = async (blogToUpdate) =>
{
  try
  {
    const newBlog =
    {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user.id
    }
    const response = await axios.put(
      `${baseUrl}/${blogToUpdate.id}`
      , newBlog
      , {
        headers:
        {
          'content-type': 'application/json'
        }
      }
    )
    return response.data
  }
  catch (exception)
  {
    console.log(exception.response.data.error)

  }
}

const createBlog = async (newBlog) =>
{
  const config = {
    headers: { Authorization: token }
  }
  const response =  await axios.post(baseUrl, newBlog, config)
  return response.data
}

const deleteBlog = async (blogToRemove) =>
{
  try
  {
    const config = { headers: { Authorization: token } }
    await axios.delete (
      `${baseUrl}/${blogToRemove.id}`,
      config
    )
  }
  catch (exception)
  {
    console.log(exception.response.data.error)
    throw exception.response.data.error
  }

}
export default { getAll, createBlog, updateBlog, setToken, deleteBlog }