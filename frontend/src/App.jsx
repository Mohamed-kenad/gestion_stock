import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Auth from './pages/Auth'
import NotFound from './pages/NotFound'
import './index.css'
import { AuthProvider, PrivateRoute } from './context/AuthContext'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import Employes from './pages/Employes'

function App() {

  return (
    <>
    <AuthProvider>
      <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='*' element={<NotFound />} />
          <Route element={<PrivateRoute><Layout/></PrivateRoute>}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employes" element={<Employes />} />
          </Route>
      </Routes>
      <ToastContainer />
    </AuthProvider>
    </>
  )
}

export default App
