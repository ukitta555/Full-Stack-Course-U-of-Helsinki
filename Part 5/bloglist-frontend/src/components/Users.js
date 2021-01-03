import React, {useEffect, useState} from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchUsers() {
      const response = await userService.getUsers()
      return response
    }
    fetchUsers()
      .then (response => setUsers(response))
  },[])

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
                  {user.name}
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