import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// pages
import Home from './pages/Home/Home'
import EquipmentList from './pages/EquipmentList/EquipmentList'

//components
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {

  return (   
      <div>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/equipmentlist' element={<EquipmentList />}></Route>
            </Routes>
          </BrowserRouter>
          <Footer />
      </div>
  )
}

export default App
