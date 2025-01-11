import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import File from './pages/File.jsx'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
import Menu from './common/Menu/Menu'
import Add from './pages/Add'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import Feedback from './pages/Feedback'
import View from './pages/View'
import Announcement from './pages/Announcement'



function App() {

  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} >
            <Route path="/file" element={<File/>}/>
            <Route path="/file/add" element={<Add/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/logout" element={<Logout/>}/>
            {/* <Route path="/feedback" element={<Feedback/>}/> */}
            <Route path="/view/:id" element={<View/>}/>
            <Route path="/announcement" element={<Announcement/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
      {/* <Loader/> */}
    </>
  )
}

export default App
