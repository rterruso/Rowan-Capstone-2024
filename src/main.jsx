/* LEAVE THIS ALONE */

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Library from './pages/Library.jsx'

// CREATE THE DIRECTORY OF PAGES
const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>
  },
  {
  path:"home",
  element: <Home/>
  },
  {
    path: "about",
    element: <About/>
  },
  {
    path: "contact",
    element: <Contact/>
  },
  {
    path: "library",
    element: <Library/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
