
import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'
import UpdateAuthorBirth from './UpdateAuthorBirth'


const Authors = ({show, token}) => {
  const result = useQuery(ALL_AUTHORS)
  if (!show) {
    return null
  }

  if (result.loading) {
    return <div> loading ............ </div>
  }
  const authors = result.data.allAuthors

  return (
    <>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th>
                name
              </th>
              <th>
                born
            </th>
              <th>
                books
            </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <UpdateAuthorBirth
        authors = {authors}
        token = {token}
      />
    </>
  )
}

export default Authors
