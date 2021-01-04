import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import User from './User'

import {getAllUsers} from '../reducers/AllUsersReducer'


const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users)

  useEffect(() => {
    async function fetchUsers() {
      await dispatch(getAllUsers())
    }
    fetchUsers()
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
              <User
                key = {user.id}
                user = {user}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Users