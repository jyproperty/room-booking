import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  Box, Container, Typography, TextField, Button,
  Paper, Alert, CircularProgress, Divider
} from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { useAuth } from '../contexts/AuthContext'

function SignupPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignup(e) {
    e.preventDefault()
    setError('')
    if (password.length < 6) {
      setError('비밀번호는 6자리 이상이어야 해요.')
      return
    }
    setLoading(true)
    try {
      await signUp(email, password, name)
      setSuccess(true)
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했어요.')
    }
    setLoading(false)
  }

  if (success) {
    return (
      <Container maxWidth="xs" sx={{ py: 8, textAlign: 'center' }}>
        <MeetingRoomIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 1 }}>가입 완료!</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          이메일 확인 링크를 보내드렸어요.<br />확인 후 로그인해주세요.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/login')}
          sx={{ borderRadius: 3, px: 4, py: 1.5, fontWeight: 700 }}
        >
          로그인하러 가기
        </Button>
      </Container>
    )
  }

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <MeetingRoomIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="h1" sx={{ fontWeight: 700 }}>회원가입</Typography>
        <Typography color="text.secondary">무료로 시작하세요</Typography>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid #EBEBEB', borderRadius: 4, p: 4 }}>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSignup} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
            helperText="6자리 이상 입력해주세요"
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
            {loading ? <CircularProgress size={24} color="inherit" /> : '회원가입'}
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography textAlign="center" color="text.secondary">
          이미 계정이 있으신가요?{' '}
          <Typography
            component={Link}
            to="/login"
            sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none' }}
          >
            로그인
          </Typography>
        </Typography>
      </Paper>
    </Container>
  )
}

export default SignupPage
