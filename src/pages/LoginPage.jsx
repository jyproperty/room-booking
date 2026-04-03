import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Container, Typography, TextField, Button,
  Paper, Alert, CircularProgress, Divider
} from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않아요.')
    }
    setLoading(false)
  }

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <MeetingRoomIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h1" sx={{ fontWeight: 700 }}>로그인</Typography>
        <Typography color="text.secondary">스페이스북에 오신 걸 환영해요</Typography>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid #EBEBEB', borderRadius: 4, p: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="이메일"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, mt: 1 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" color="text.secondary">
          아직 계정이 없으신가요?{' '}
          <Typography
            component={Link}
            to="/signup"
            sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none' }}
          >
            회원가입
          </Typography>
        </Typography>
      </Paper>
    </Container>
  )
}

export default LoginPage
