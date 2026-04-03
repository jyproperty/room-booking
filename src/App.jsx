import { HashRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RoomDetailPage from './pages/RoomDetailPage'
import PaymentPage from './pages/PaymentPage'
import CompletePage from './pages/CompletePage'

function App() {
  return (
    <HashRouter>
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rooms/:id" element={<RoomDetailPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/complete" element={<CompletePage />} />
        </Routes>
      </Box>
    </HashRouter>
  )
}

export default App
