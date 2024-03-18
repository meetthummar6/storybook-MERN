import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
const Navbar = ({
  toggle, isOpen
}) => {
  const navigate=useNavigate()
  const { user, login } = useContext(AuthContext)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/v1/users/current-user',
          {},
          { withcredentials: true })
          login(res.data.data)
      } catch (error) {
        try {
          const res = await axios.post('/api/v1/users/refresh-token',
            {},
            { withcredentials: true })
          login(res.data.data)
        } catch (error) {
          console.log(error.statusText)
        }
      }
    }
    fetchUser()
  }, [])
  return (
    <header className='shadow sticky z-50 top-0 w-screen'>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link to='/' className='flex items-center group'><span className='self-center text-4xl font-bold whitespace-nowrap text-gray-900 group-hover:text-blue-800'>STORY</span><span className='self-center text-4xl font-bold whitespace-nowrap text-blue-800 group-hover:text-gray-900'>BOOK</span></Link>
          <div className='hidden lg:flex justify-between items-center gap-10'>
            <ul className='flex justify-between items-center p-4 font-semibold text-lg gap-4'>
              <li><NavLink to='/' className={({ isActive }) => (isActive ? 'text-blue-800 hover:text-gray-900' : 'text-gray-900 hover:text-blue-800')}>Home</NavLink></li>
              <li><NavLink to='/about' className={({ isActive }) => (isActive ? 'text-blue-800 hover:text-gray-900' : 'text-gray-900 hover:text-blue-800')}>About</NavLink></li>
              <li><NavLink to='/stories' className={({ isActive }) => (isActive ? 'text-blue-800 hover:text-gray-900' : 'text-gray-900 hover:text-blue-800')}>Stories</NavLink></li>
            </ul>
            <div className='relative top-0 left-0 py-4 pl-6 w-60 h-8 my-2 font-semibold flex items-center text-sm rounded-lg '>
              <input type="text" placeholder='Search' className='p-5 w-full h-full  absolute bg-gray-50 border text-gray-900  rounded-lg border-gray-300  focus:ring-blue-500 focus:border-blue-500' />
              <img src="/search.svg" alt="search" className='absolute right-0 h-6 w-8 outline-none border-none' />
            </div>
            <>
              {
                user ? (<>
                  <Link to={`/user/${user._id}`} className='cursor-pointer'>
                  <img src={user.avatar} alt="avatar" className='w-12 h-12 rounded-full ring-2 ring-blue-800' />
                </Link>
            </>) :
            (
            <div className='py-2 px-6 bg-blue-600 w-24 my-2 text-white font-semibold rounded-md shadow-sm'>
              <Link to='/login'>Login</Link>
            </div>
            )
              }
          </>
        </div>
        <div className='flex lg:hidden px-8'>
          <button onClick={() => toggle()}>
            {isOpen ? (<img src="/close.svg" alt="close" className='h-6 w-6' />) : (<img src="/menu.svg" alt="menu" className='h-6 w-6' />)}
          </button>
        </div>
      </div>
    </nav>
    </header >
  )
}

export default Navbar