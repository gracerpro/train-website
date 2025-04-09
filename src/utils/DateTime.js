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

/**
 * @param {Date} date
 */
export function formatDate(date) {
  return date.getDate() + " " + SHORT_MONTH_NAMES[date.getMonth()] + " " + date.getFullYear()
}
