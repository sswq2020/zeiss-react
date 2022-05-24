import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {BrowserRouter,Link,Routes,Route} from 'react-router-dom'
import Dashboard from './components/dashboard'
import Detail from './components/detail'
import Monitor from './components/monitor'

function App() {

  return (
   <BrowserRouter>
      <div className='App'>
        <Link to="/">Machine Dashboard</Link>
      </div>
      <Monitor/>
      <Routes>
         <Route path="/" element={<Dashboard/>}></Route>
         <Route path="/detail/:id" element={<Detail/>}></Route>
      </Routes>
   </BrowserRouter>
  )
}

export default App
