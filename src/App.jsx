import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
