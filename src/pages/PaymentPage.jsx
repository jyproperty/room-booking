import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, Paper, Divider, Chip
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'

const PAYMENT_METHODS = [
  { label: '신용카드', icon: <CreditCardIcon /> },
  { label: '계좌이체', icon: <AccountBalanceIcon /> },
  { label: '카카오페이', icon: <PhoneAndroidIcon /> },
]

function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)

  const roomName = params.get('room') || ''
  const price = Number(params.get('price')) || 0
  const date = params.get('date') || ''
  const start = params.get('start') || ''
  const end = params.get('end') || ''

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h1" sx={{ fontWeight: 700, mb: 4 }}>결제하기</Typography>

      {/* 예약 요약 */}
      <Paper elevation={0} sx={{ border: '1px solid #EBEBEB', borderRadius: 4, p: 3, mb: 3 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>예약 정보</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">회의실</Typography>
            <Typography fontWeight={600}>{roomName}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">날짜</Typography>
            <Typography fontWeight={600}>{date}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">시간</Typography>
            <Typography fontWeight={600}>{start} ~ {end}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography fontWeight={700}>결제 금액</Typography>
            <Typography fontWeight={700} color="primary.main" fontSize="1.2rem">
              {price.toLocaleString()}원
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* 결제 수단 */}
      <Paper elevation={0} sx={{ border: '1px solid #EBEBEB', borderRadius: 4, p: 3, mb: 3 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>결제 수단</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {PAYMENT_METHODS.map(({ label, icon }) => (
            <Box
              key={label}
              sx={{
                flex: 1,
                border: '2px solid',
                borderColor: label === '신용카드' ? 'primary.main' : '#EBEBEB',
                borderRadius: 3,
                p: 2,
                textAlign: 'center',
                cursor: 'pointer',
                bgcolor: label === '신용카드' ? '#FFF0F0' : 'white',
              }}
            >
              <Box sx={{ color: label === '신용카드' ? 'primary.main' : 'text.secondary', mb: 0.5 }}>
                {icon}
              </Box>
              <Typography variant="body2" fontWeight={label === '신용카드' ? 700 : 400}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* 결제 완료 버튼 */}
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={() => navigate('/complete')}
        sx={{ borderRadius: 3, py: 1.5, fontSize: '1rem', fontWeight: 700, mb: 2 }}
      >
        {price.toLocaleString()}원 결제하기
      </Button>
      <Button fullWidth onClick={() => navigate(-1)} sx={{ color: 'text.secondary' }}>
        돌아가기
      </Button>
    </Container>
  )
}

export default PaymentPage
