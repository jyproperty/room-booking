import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'

function Navbar() {
  return (
    <AppBar position="sticky" color="paper" elevation={1} sx={{ bgcolor: 'white', borderBottom: '1px solid #EBEBEB' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MeetingRoomIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              스페이스북
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" color="primary" sx={{ borderRadius: 6 }}>
              로그인
            </Button>
            <Button variant="contained" color="primary" sx={{ borderRadius: 6 }}>
              회원가입
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
