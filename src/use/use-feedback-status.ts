import { Status } from "@/api/FeedbackApi"

const statusMap: { [key in Status]: string } = {
  [Status.Created]: "Создано",
  [Status.Moderated]: "Промодерировано",
  [Status.InProgress]: "В процессе",
  [Status.Abort]: "Отклонено",
  [Status.Closed]: "Закрыто",
  [Status.Queue]: "В очереди",
}

export function useStatus() {
  function getName(status: Status) {
    return statusMap[status]
  }

  return {
    getName,
  }
}
