import { useState } from 'react'
import {
  Box, Container, Typography, TextField, InputAdornment,
  ToggleButton, ToggleButtonGroup, Skeleton, Alert
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import SearchIcon from '@mui/icons-material/Search'
import useRooms from '../hooks/useRooms'
import RoomCard from '../components/RoomCard'

const ROOM_TYPES = ['전체', '소회의실', '중회의실', '대회의실', '세미나실']

function HomePage() {
  const [selectedType, setSelectedType] = useState('전체')
  const [searchText, setSearchText] = useState('')

  const filters = selectedType !== '전체' ? { type: selectedType } : {}
  const { rooms, loading, error } = useRooms(filters)

  const filteredRooms = rooms.filter(room =>
    room.name.includes(searchText) || room.location?.includes(searchText)
  )

  return (
    <Box>
      {/* 히어로 섹션 */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #FF5A5F 0%, #FF8A8E 100%)',
          py: 8,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography variant="h1" sx={{ fontWeight: 700, mb: 1 }}>
          완벽한 회의실을 찾아보세요
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
          인원수에 맞는 회의실을 시간 단위로 간편하게 예약하세요
        </Typography>

        <Container maxWidth="sm">
          <TextField
            fullWidth
            placeholder="회의실 이름, 위치로 검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#717171' }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              bgcolor: 'white',
              borderRadius: 8,
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
                '& fieldset': { border: 'none' },
              },
            }}
          />
        </Container>
      </Box>

      {/* 필터 + 목록 섹션 */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={(_, val) => val && setSelectedType(val)}
          sx={{ mb: 4, flexWrap: 'wrap', gap: 1 }}
        >
          {ROOM_TYPES.map((type) => (
            <ToggleButton
              key={type}
              value={type}
              sx={{
                borderRadius: '20px !important',
                border: '1px solid #EBEBEB !important',
                px: 2.5,
                py: 0.75,
                fontWeight: 500,
                '&.Mui-selected': {
                  bgcolor: '#222222',
                  color: 'white',
                  '&:hover': { bgcolor: '#444444' },
                },
              }}
            >
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            회의실 정보를 불러오지 못했어요.
          </Alert>
        )}

        {loading ? (
          <Grid container spacing={3}>
            {[...Array(6)].map((_, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
                <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
                <Skeleton width="60%" sx={{ mt: 1 }} />
                <Skeleton width="40%" />
              </Grid>
            ))}
          </Grid>
        ) : filteredRooms.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h3" color="text.secondary">
              조건에 맞는 회의실이 없어요
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              다른 조건으로 검색해 보세요
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {filteredRooms.map((room) => (
              <Grid key={room.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <RoomCard room={room} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  )
}

export default HomePage
