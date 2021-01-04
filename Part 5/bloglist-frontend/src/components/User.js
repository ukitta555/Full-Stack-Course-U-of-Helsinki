import React from 'react'

const User = ({user}) => {
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
}

export default User