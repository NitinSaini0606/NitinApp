import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskManger from './Components/TaskManger'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/task-manager" element={<TaskManger />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
