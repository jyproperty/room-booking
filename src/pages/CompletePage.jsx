import { Box, Container, Typography, Button } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { useNavigate } from 'react-router-dom'

function CompletePage() {
  const navigate = useNavigate()

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', py: 10 }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: 'secondary.main', mb: 3 }} />
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 1 }}>
          예약 완료!
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          결제가 완료됐어요. 예약 확인 이메일을 보내드렸어요.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/')}
          sx={{ borderRadius: 3, px: 5, py: 1.5, fontWeight: 700 }}
        >
          홈으로 돌아가기
        </Button>
      </Box>
    </Container>
  )
}

export default CompletePage
