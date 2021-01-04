import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h2> Users </h2>
      <table>
        <tbody>
          <tr>
            <td>
              <h3> Username </h3>
            </td>
            <td>
              <h3> Blogs created </h3>
            </td>
          </tr>
          {users.map(user => {
            return (
              <tr key = {user.id}>
                <td>
                  <Link to = {`/users/${user.id}`}> {user.name} </Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users