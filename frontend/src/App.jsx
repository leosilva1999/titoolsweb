import './App.css'
import { ToastContainer } from "react-toastify"

//router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//hooks
import { useAuth } from './hooks/useAuth'

// pages
import Home from './pages/Home/Home'
import EquipmentList from './pages/EquipmentList/EquipmentList'
import LoanList from './pages/LoanList/LoanList'
import Equipment from './pages/Equipment/Equipment'
import Users from './pages/Auth/Users/Users'
import Login from './pages/Auth/Login'

//components
import Layout from './Layout/Layout'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const { auth, loading } = useAuth()

  console.log("loading: " + loading)

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={auth ? <Home /> : <Navigate to="/login" />}></Route>
            <Route path='/login' element={!auth ? <Login /> : <Navigate to="/" />}></Route>
            <Route path='/users' element={auth ? <Users /> : <Navigate to="/login" />}></Route>
            <Route path='/equipmentlist' element={auth ? <EquipmentList /> : <Navigate to="/login" />}></Route>
            <Route path='/loanlist' element={auth ? <LoanList /> : <Navigate to="/login" />}></Route>
            <Route path='/equipment/:id' element={<Equipment />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
