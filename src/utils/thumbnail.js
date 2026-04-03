export function getThumbnail(room, width = 600, height = 400) {
  if (room.thumbnail_url) return room.thumbnail_url
  if (room.room_images?.[0]?.image_url) return room.room_images[0].image_url

  const query = encodeURIComponent(room.address || room.name)
  return `https://image.thum.io/get/width/${width}/crop/${height}/https://maps.google.com/?q=${query}`
}
