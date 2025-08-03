import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import TokenContextProvider from './Context/tokenContextProvider'
import 'flowbite';
import ProtectedRoute from './ProtectedRout/ProtectedRoute'

function App() {

  const routes=createBrowserRouter([
    {path:'/',element:<LayOut/>,children:[
      {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
      {path:'login',element:<Login/>},
      {path:'register',element:<Register/>},
      {path:'*',element:<NotFound/>}
    ]}
  ])

  return (
    <>
      <TokenContextProvider>
        <Toaster/>
        <RouterProvider router={routes}>
        </RouterProvider>
      </TokenContextProvider>
    </>
  )
}

export default App
