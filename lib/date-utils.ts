export function getCurrentTime(): string {
  const now = new Date()
  const hours = now.getHours().toString().padStart(2, "0")
  const minutes = now.getMinutes().toString().padStart(2, "0")
  return `${hours}:${minutes}`
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  // Get month and day
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")

  // Get day of week in Chinese
  const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
  const dayOfWeek = daysOfWeek[date.getDay()]

  return {
    date: `${month}/${day}`,
    dayOfWeek,
  }
}
