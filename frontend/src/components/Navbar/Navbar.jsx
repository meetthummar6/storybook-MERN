import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='shadow sticky z-50 top-0'>
      <nav className='bg-white border-gray-200 px-4 lg:px-6 py-2.5'>
        <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl'>
          <Link to='/' className='flex items-center'><span className='self-center text-4xl font-bold whitespace-nowrap text-gray-900'>STORY</span><span className='self-center text-4xl font-bold whitespace-nowrap text-blue-800'>BOOK</span></Link>
          
        </div>
      </nav>
    </header>
  )
}

export default Navbar