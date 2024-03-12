import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import { useState } from 'react'

const Header = () => {
    const [isopen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isopen)
    return (
        <>
            <Navbar toggle={toggle} isOpen={isopen} />
            <Sidebar isOpen={isopen} />
        </>
    )
}

export default Header