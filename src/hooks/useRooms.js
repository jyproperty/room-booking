import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

function useRooms(filters = {}) {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRooms() {
      setLoading(true)
      let query = supabase.from('rooms').select('*, room_images(*)')

      if (filters.type) {
        query = query.eq('type', filters.type)
      }
      if (filters.people) {
        query = query.lte('min_people', filters.people).gte('max_people', filters.people)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) {
        setError(error)
      } else {
        setRooms(data)
      }
      setLoading(false)
    }

    fetchRooms()
  }, [filters.type, filters.people])

  return { rooms, loading, error }
}

export default useRooms
