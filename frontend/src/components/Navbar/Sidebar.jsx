import React from 'react'
import { NavLink } from 'react-router-dom'
const Sidebar = (
    { isOpen }
) => {
    return (
        <>
            {isOpen ? (
                <div className="fixed top-16 right-2 w-screen h-fit bg-white flex  flex-col justify-between items-end gap-10 px-5 py-1 z-50">
                    <div className="font-bold flex flex-col w-full border-b text-lg py-3 cursor-pointer hover:text-blue-800">
                        <NavLink to="/" className={({ isActive }) => (isActive ? 'text-blue-800 hover:text-gray-900 self-end h-8' : 'text-gray-900 hover:text-blue-800 self-end h-8')}> Home</NavLink>
                    </div>
                    <div className="font-bold flex flex-col w-full border-b text-lg cursor-pointer hover:text-blue-800">
                        <NavLink to="/about" className={({ isActive }) => (isActive ? 'text-blue-800 hover:text-gray-900 self-end h-8' : 'text-gray-900 hover:text-blue-800 self-end h-8')}> About</NavLink>
                    </div>
                    <div className="font-bold flex flex-col w-full border-b text-lg cursor-pointer hover:text-blue-800">
                        <NavLink to="/stories" className={({ isActive }) => (isActive ? 'text-blue-800 hover:text-gray-900 self-end h-8' : 'text-gray-900 hover:text-blue-800 self-end h-8')}> Stories</NavLink>
                    </div>
                </div>
            ) : (
                <div className="hidden">

                </div>
            )}
        </>
    )
}

export default Sidebar