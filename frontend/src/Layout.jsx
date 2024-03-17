import React, { useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Navbar/Header'
import Footer from './components/Footer/Footer'
import { QueryClientProvider, QueryClient } from 'react-query'
import { Toaster } from 'react-hot-toast'
import AuthContext from './context/AuthContext'

const reactquery = new QueryClient()


const Layout = () => {
  const [user, setUser] = useState(null);
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  }
  return (
    <>
      <QueryClientProvider client={reactquery}>
        <AuthContext.Provider value={{ user, login, logout }}>
          <Toaster position='top-center' reverseOrder={false} />
          <Header />
          <Outlet />
          <Footer />
        </AuthContext.Provider>
      </QueryClientProvider>
    </>
  )
}

export default Layout