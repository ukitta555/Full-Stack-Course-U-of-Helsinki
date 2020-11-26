import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blog from '../components/Blog'

describe('blog component tests', () =>
{
  let blog
  let user
  beforeEach(() =>
  {
    blog =
    {
      title: 'Test',
      author: 'Vlad',
      likes: 0,
      url: 'nowhere.com',
      user:
      {
        name: 'Vlad'
      }
    }
    user =
    {
      name: 'Vlad'
    }
  })


  test('render blog title and author, but not likes and url', () =>
  {
    const component = render (
      <Blog
        blog = {blog}
        user = {user}
      />
    )

    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    )
    expect(component.container).not.toHaveTextContent(
      `Likes: ${blog.likes}`
    )
    expect(component.container).not.toHaveTextContent(
      `${blog.url}`
    )
  })

  test('likes and url are rendered when pressing the view button', () =>
  {
    const component = render (
      <Blog
        blog = {blog}
        user = {user}
      />
    )

    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)
    expect(component.container).toHaveTextContent(`Likes: ${blog.likes}`)
    expect(component.container).toHaveTextContent(`${blog.url}`)
  })

  test('press like button twice = event handler is called twice', async () =>
  {
    const mockHandler = jest.fn()
    const component = render (
      <Blog
        blog = {blog}
        user = {user}
        handleLikeClick = {mockHandler}
      />
    )

    const viewButton = component.container.querySelector('.viewButton')
    fireEvent.click(viewButton)

    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
}
)
