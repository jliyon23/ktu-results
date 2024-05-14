import { Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import axios from 'axios'

function App() {
  axios.defaults.baseURL = "http://localhost:3000"
  return (
    <ChakraProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/individualResults/:examDefId/:schemeId' element={<Result />} />
      </Routes>
    </ChakraProvider>
  )
}

export default App