import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'


const User = () => {
  const { user } = useContext(AuthContext)
  return (
    <div className='w-screen h-[80vh] flex flex-col justify-center items-center bg-sky-100 gap-10'>
        <div> 
            <img src={user?.avatar} alt="profile" className='w-32 h-32 ml-4 rounded-full object-cover'/>
            <h1 className='text-5xl font-bold  text-gray-700'>{user?.username}</h1>
        </div>
        <div>
            <h1 className='text-2xl font-semibold text-gray-900'><span className='text-2xl font-semibold text-blue-700'>Email</span>: {user?.email}</h1>
            <h1 className='text-2xl font-semibold text-gray-900'><span className='text-2xl font-semibold text-blue-700'>Fullname</span>: {user?.fullname}</h1>
        </div>
        <div className='flex w-full justify-center gap-4'>
            <div className='text-white bg-blue-800 hover:bg-blue-900 py-1 px-3 rounded-md shadow text-lg font-medium '><Link to={`/user/${user?._id}/edit`}>Edit Profile Details</Link></div>
            <div className='text-white bg-blue-800 hover:bg-blue-900 py-1 px-3 rounded-md shadow text-lg font-medium'><Link to={`/user/${user?._id}/password`}>Change Password</Link></div>
        </div>
    </div>
  )
}

export default User