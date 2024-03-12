import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-300 w-screen h-60 flex flex-col'>
        <div className='flex flex-col sm:flex-row justify-start items-center font-bold text-xl gap-12 pt-4'>
            <div className='group mx-40'><span className='text-black group-hover:text-blue-800'>STORY</span><span className='text-blue-800 group-hover:text-black'>BOOK</span></div>
            <div className='flex flex-col justify-center items-center gap-1 ml-20'>
              <div className='text-gray-900'>CONTACTS</div>
              <div className='text-gray-700 mt-4 font-medium text-lg'>storybook@gmail.com</div>
              <div className='text-gray-700 font-medium text-lg'>+123456789</div>
              <div className='text-gray-800 font-medium text-lg'>Contact us</div>
            </div>
        </div>
        <div>
            <div className='text-gray-900/80 text-center font-semibold text-sm mt-6'>Copyright &copy; 2024. All rights reserved.</div>
        </div>
    </div>
  )
}

export default Footer