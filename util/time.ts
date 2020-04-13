export function formatTimestamp(timestamp: Date) {
  const hours = timestamp.getHours() % 12 || 12
  const minutes = timestamp.getMinutes()
  const ampm = timestamp.getHours() >= 12 ? 'PM': 'AM'
  return `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
}
