import { HashRouter, Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'
import { AuthProvider } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RoomDetailPage from './pages/RoomDetailPage'
import PaymentPage from './pages/PaymentPage'
import CompletePage from './pages/CompletePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/complete" element={<CompletePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </Box>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
