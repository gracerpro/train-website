import { ApiRequest } from "@/core/ApiRequest"

export enum TaskStatusId {
  Free = 1,
  Processing = 2,
  Fail = 3,
  Success = 4,
}
export type ResultData = { fileId: number }
export type TaskStatus =
  | { id: TaskStatusId.Free }
  | { id: TaskStatusId.Processing }
  | { id: TaskStatusId.Fail; message: string }
  | ({ id: TaskStatusId.Success } & ResultData)
export type Task = {
  id: number
  status: TaskStatus
  completePercent: number
  resultText: string
  resultData: ResultData | null
}

export class TaskApi {
  private apiRequest: ApiRequest

  constructor() {
    this.apiRequest = new ApiRequest()
  }

  async get(id: number): Promise<Task | null> {
    const params = new URLSearchParams()
    params.append("id", id.toString())

    const response = await this.apiRequest.get("/tasks/view", params)

    if (!response.task) {
      return null
    }

    let taskStatus: TaskStatus
    const task = response.task

    switch (task.statusId) {
      case TaskStatusId.Success:
        if (!task?.resultData.fileId || task.resultData.fileId == 0) {
          throw new Error("Не найден ID файла.")
        }
        taskStatus = { id: TaskStatusId.Success, fileId: task.resultData.fileId }
        break
      case TaskStatusId.Fail:
        taskStatus = { id: TaskStatusId.Fail, message: task.resultText }
        break
      default:
        taskStatus = { id: task.status }
    }

    task.status = taskStatus

    return task
  }
}
