
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Nav from './component/nav'
import Home from './pages/home'
import About from './pages/about'
import Vehicle from './pages/vehicle'
import Customeersupport from './pages/customersupport'

const router=createBrowserRouter([
  {
    path:"/",
    element:(
      <>
      <Nav/>
      <Home/>
      </>
    )
  },
    {
    path:"/about",
    element:(
      <>
      <Nav/>
      <About/>
      </>
    )
  },
    {
    path:"/vehicle",
    element:(
      <>
      <Nav/>
      <Vehicle/>
      </>
    )
  },
    {
    path:"/customersupport",
    element:(
      <>
      <Nav/>
      <Customeersupport/>
      </>
    )
  },
])

function App() {

  return (
   <RouterProvider router={router}/>
  )
}

export default App
