import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const User = () => {
    const {user}=useContext(AuthContext)
  return (
    <div>
        {user.username}
    </div>
  )
}

export default User