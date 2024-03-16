import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Navbar/Header'
import Footer from './components/Footer/Footer'
import { QueryClientProvider, QueryClient } from 'react-query'
import {Toaster} from 'react-hot-toast'

const reactquery = new QueryClient()


const Layout = () => {

  return (
    <>
      <QueryClientProvider client={reactquery}>
        <Toaster position='top-center' reverseOrder={false} />
        <Header />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </>
  )
}

export default Layout