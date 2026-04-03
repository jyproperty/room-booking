import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Box, Container, Typography, Button, Chip, Divider,
  TextField, MenuItem, Paper, Alert, CircularProgress
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PeopleIcon from '@mui/icons-material/People'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LockIcon from '@mui/icons-material/Lock'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getThumbnail } from '../utils/thumbnail'

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
]

function RoomDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [people, setPeople] = useState(1)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)

  useEffect(() => {
    async function fetchRoom() {
      const { data } = await supabase
        .from('rooms')
        .select('*, room_images(*)')
        .eq('id', id)
        .single()
      setRoom(data)
      setLoading(false)
    }
    fetchRoom()
  }, [id])

  const hours = startTime && endTime
    ? Math.max(0, TIME_SLOTS.indexOf(endTime) - TIME_SLOTS.indexOf(startTime))
    : 0
  const totalPrice = hours * (room?.price_per_hour || 0)

  async function handleBooking() {
    if (!user) {
      navigate('/login')
      return
    }
    if (!date || !startTime || !endTime || hours <= 0) {
      setBookingResult({ type: 'error', message: '날짜와 시간을 올바르게 선택해주세요.' })
      return
    }
    if (people < room.min_people || people > room.max_people) {
      setBookingResult({ type: 'error', message: `인원은 ${room.min_people}~${room.max_people}명이어야 해요.` })
      return
    }

    setBookingLoading(true)
    const { error } = await supabase.from('bookings').insert({
      room_id: id,
      date,
      start_time: startTime,
      end_time: endTime,
      people_count: people,
      total_price: totalPrice,
      status: 'pending',
    })

    if (error) {
      setBookingResult({ type: 'error', message: '예약 중 오류가 발생했어요. 다시 시도해주세요.' })
    } else {
      setBookingResult({ type: 'success', message: '예약이 완료됐어요! 결제 페이지로 이동합니다.' })
      setTimeout(() => navigate(`/payment?room=${room.name}&price=${totalPrice}&date=${date}&start=${startTime}&end=${endTime}`), 1500)
    }
    setBookingLoading(false)
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <CircularProgress color="primary" />
      </Box>
    )
  }

  if (!room) {
    return (
      <Container sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h3" color="text.secondary">회의실을 찾을 수 없어요</Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>홈으로 돌아가기</Button>
      </Container>
    )
  }

  const thumbnail = getThumbnail(room, 1200, 600)

  return (
    <Box>
      {/* 뒤로가기 */}
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ color: 'text.primary', fontWeight: 600 }}
        >
          목록으로
        </Button>
      </Container>

      {/* 대표 이미지 */}
      <Container maxWidth="lg" sx={{ mt: 1 }}>
        <Box
          component="img"
          src={thumbnail}
          alt={room.name}
          sx={{ width: '100%', height: { xs: 250, md: 420 }, objectFit: 'cover', borderRadius: 4 }}
        />
      </Container>

      {/* 상세 정보 + 예약 폼 */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>

          {/* 왼쪽: 회의실 정보 */}
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Typography variant="h1" sx={{ fontWeight: 700 }}>{room.name}</Typography>
              <Chip label={room.type} sx={{ bgcolor: '#FFF0F0', color: 'primary.main', fontWeight: 600 }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PeopleIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography color="text.secondary">{room.min_people}~{room.max_people}명</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LocationOnIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography color="text.secondary">{room.address}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                <Typography color="text.secondary">09:00 ~ 20:00 운영</Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h2" sx={{ mb: 1 }}>공간 소개</Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
              {room.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h2" sx={{ mb: 2 }}>요금 안내</Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: 'primary.main' }}>
                {room.price_per_hour?.toLocaleString()}원
              </Typography>
              <Typography color="text.secondary">/ 시간</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              인원수 {room.min_people}명 ~ {room.max_people}명 기준
            </Typography>
          </Box>

          {/* 오른쪽: 예약 폼 */}
          <Box sx={{ width: { xs: '100%', md: 360 }, flexShrink: 0 }}>
            <Paper elevation={0} sx={{ border: '1px solid #EBEBEB', borderRadius: 4, p: 3, position: 'sticky', top: 80 }}>
              <Typography variant="h2" sx={{ mb: 3 }}>예약하기</Typography>

              {bookingResult && (
                <Alert severity={bookingResult.type} sx={{ mb: 2 }}>
                  {bookingResult.message}
                </Alert>
              )}

              <TextField
                fullWidth
                label="날짜"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                slotProps={{ inputLabel: { shrink: true }, htmlInput: { min: new Date().toISOString().split('T')[0] } }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  select
                  fullWidth
                  label="시작 시간"
                  value={startTime}
                  onChange={(e) => { setStartTime(e.target.value); setEndTime('') }}
                >
                  {TIME_SLOTS.slice(0, -1).map(t => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  label="종료 시간"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                >
                  {TIME_SLOTS.filter((t) => TIME_SLOTS.indexOf(t) > TIME_SLOTS.indexOf(startTime)).map(t => (
                    <MenuItem key={t} value={t}>{t}</MenuItem>
                  ))}
                </TextField>
              </Box>

              <TextField
                fullWidth
                label="인원 수"
                type="number"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                slotProps={{ htmlInput: { min: room.min_people, max: room.max_people } }}
                helperText={`최소 ${room.min_people}명 / 최대 ${room.max_people}명`}
                sx={{ mb: 3 }}
              />

              {hours > 0 && (
                <Box sx={{ bgcolor: '#F7F7F7', borderRadius: 2, p: 2, mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {room.price_per_hour?.toLocaleString()}원 × {hours}시간
                    </Typography>
                    <Typography variant="body2">{(room.price_per_hour * hours).toLocaleString()}원</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontWeight={700}>총 금액</Typography>
                    <Typography fontWeight={700} color="primary.main">{totalPrice.toLocaleString()}원</Typography>
                  </Box>
                </Box>
              )}

              {!user && (
                <Alert severity="info" icon={<LockIcon />} sx={{ mb: 2 }}>
                  예약하려면 <strong>로그인</strong>이 필요해요
                </Alert>
              )}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleBooking}
                disabled={bookingLoading}
                sx={{ borderRadius: 3, py: 1.5, fontSize: '1rem', fontWeight: 700 }}
              >
                {bookingLoading
                  ? <CircularProgress size={24} color="inherit" />
                  : user ? '예약하기' : '로그인하고 예약하기'}
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default RoomDetailPage
