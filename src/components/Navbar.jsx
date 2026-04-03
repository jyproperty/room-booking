import { useState } from 'react'
import {
  AppBar, Toolbar, Typography, Button, Container, Box,
  Avatar, Menu, MenuItem, Divider
} from '@mui/material'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Navbar() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)

  async function handleSignOut() {
    setAnchorEl(null)
    await signOut()
    navigate('/')
  }

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #EBEBEB' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <MeetingRoomIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
              스페이스북
            </Typography>
          </Box>

          {user ? (
            <Box>
              <Avatar
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{ bgcolor: 'primary.main', cursor: 'pointer', width: 36, height: 36, fontSize: 14 }}
              >
                {user.email?.[0].toUpperCase()}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                sx={{ mt: 1 }}
              >
                <MenuItem disabled>
                  <Typography variant="body2" color="text.secondary">{user.email}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSignOut} sx={{ color: 'error.main' }}>
                  로그아웃
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/login')}
                sx={{ borderRadius: 6 }}
              >
                로그인
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/signup')}
                sx={{ borderRadius: 6 }}
              >
                회원가입
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
