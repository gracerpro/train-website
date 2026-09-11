const SHORT_MONTH_NAMES = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
]

export function formatDate(date: Date) {
  return date.getDate() + " " + SHORT_MONTH_NAMES[date.getMonth()] + " " + date.getFullYear()
}

export function asDateShortTime(date: Date): string {
  return formatDate(date) + " " + getShortTime(date)
}

export function getShortTime(date: Date): string {
  const hours = date.getHours()
  const minutes = date.getMinutes()

  return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes)
}
