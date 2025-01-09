import './App.css'
import { ToastContainer } from "react-toastify"

//router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//hooks
import { useAuth } from './hooks/useAuth'

// pages
import Home from './pages/Home/Home'
import EquipmentList from './pages/EquipmentList/EquipmentList'
import Login from './pages/Auth/Login'

//components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const {auth, loading} = useAuth()

  console.log("loading: "+loading)

  if(loading){
    return <p>Carregando...</p>;
  }

  return (   
      <div>
        <ToastContainer />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={auth?<Home />:<Navigate to="/login"/>}></Route>
              <Route path='/login' element={!auth ? <Login /> : <Navigate to="/"/>}></Route>
              <Route path='/equipmentlist' element={auth ? <EquipmentList /> : <Navigate to="/login"/>}></Route>
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
  )
}

export default App
