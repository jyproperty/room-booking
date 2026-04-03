import { Card, CardMedia, CardContent, Typography, Box, Chip } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import { useNavigate } from 'react-router-dom'
import { getThumbnail } from '../utils/thumbnail'

function RoomCard({ room }) {
  const navigate = useNavigate()
  const thumbnail = getThumbnail(room, 600, 400)

  return (
    <Card
      onClick={() => navigate(`/rooms/${room.id}`)}
      sx={{
        borderRadius: 3,
        boxShadow: 'none',
        border: '1px solid #EBEBEB',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={thumbnail}
        alt={room.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 600, color: 'text.primary' }}>
            {room.name}
          </Typography>
          <Chip label={room.type} size="small" sx={{ bgcolor: '#FFF0F0', color: 'primary.main', fontWeight: 500 }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
          <PeopleIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {room.min_people}~{room.max_people}명
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {room.location}
        </Typography>
        <Box sx={{ mt: 1.5 }}>
          <Typography variant="body1" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {room.price_per_hour?.toLocaleString()}원
            <Typography component="span" variant="body2" color="text.secondary" sx={{ fontWeight: 400 }}>
              {' '}/시간
            </Typography>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RoomCard
