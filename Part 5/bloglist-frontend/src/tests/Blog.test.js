import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import Blog from '../components/Blog'

test('render blog title and author, but not likes and url', () =>
{
  const blog =
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
  const user =
  {
    name: 'Vlad'
  }
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