import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login'
import './index.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
