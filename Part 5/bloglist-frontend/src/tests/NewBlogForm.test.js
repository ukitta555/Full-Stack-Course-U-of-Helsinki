import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import NewBlogForm from '../components/NewBlogForm'


describe('new blog form tests', () =>
{
  test('event handler handleAddBlog is called with the right details', () =>
  {
    const mockHandler = jest.fn()
    const setIsGood = jest.fn()
    const updateNotification = jest.fn()

    const component = render(
      <NewBlogForm
        addBlog = {mockHandler}
        setIsGood = {setIsGood}
        updateNotifictaion = {updateNotification}
      />
    )

    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')
    const titleInput = component.container.querySelector('#title')

    const newBlogForm = component.container.querySelector('.newBlogForm')

    fireEvent.change(authorInput, {
      target: {value: 'Vlad'}
    })
    fireEvent.change(urlInput, {
      target: {value: 'nosite.com'}
    })
    fireEvent.change(titleInput, {
      target: {value: 'Testing form!'}
    })

    fireEvent.submit(newBlogForm)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].author).toBe('Vlad')
    expect(mockHandler.mock.calls[0][0].url).toBe('nosite.com')
    expect(mockHandler.mock.calls[0][0].title).toBe('Testing form!')
  })
})