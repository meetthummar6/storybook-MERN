import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Navbar/Header'
import Footer from './components/Footer/Footer'
import {QueryClientProvider, QueryClient} from 'react-query'

const reactquery= new QueryClient()


const Layout = () => {

  return (
    <>
      <Header/>
      <QueryClientProvider client={reactquery}>
        <Outlet  />
      </QueryClientProvider>
      <Footer />
    </>
  )
}

export default Layout