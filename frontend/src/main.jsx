import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'
import App from './App.jsx'
import Layout from './Layout.jsx'
import UserLayout from './Layout/UserLayout.jsx'
import Stories from './pages/Stories.jsx'
import Story from './pages/Story.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import User from './pages/User.jsx'
import AddChapter from './pages/AddChapter.jsx'
import CreateStrory from './pages/CreateStrory.jsx'
import UserStories from './pages/UserStories.jsx'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<App />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='stories' element={<Stories />} />
      <Route path='story/:id' element={<Story />} />
      <Route path='story/:id/addchapter' element={<AddChapter />} />

      <Route path='user/:id/' element={<UserLayout />}>
        <Route index element={<User />} />
        <Route path='create-story' element={<CreateStrory />}/>
        <Route path='your-stories' element={<UserStories />} />
      </Route>
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
