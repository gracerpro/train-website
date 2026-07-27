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
