import { ApiRequest } from "@/core/ApiRequest"

export enum TaskStatusId {
  Free = 1,
  Processing = 2,
  Fail = 3,
  Success = 4,
}
export type ResultData = {
  relativeFilePath: string
  relativeFileUrl: string
  activitiesCount: number
  fileSize: number
  fileName: string
}
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

    return modifyTask(response.task)
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function modifyTask(data: any): Task {
  let taskStatus: TaskStatus
  const task = data

  switch (task.statusId) {
    case TaskStatusId.Success:
      if (!task?.resultData.relativeFileUrl || task.resultData.relativeFileUrl === "") {
        throw new Error("В задаче не найден файл.")
      }
      taskStatus = {
        id: TaskStatusId.Success,
        relativeFileUrl: task.resultData.relativeFileUrl,
        relativeFilePath: task.resultData.relativeFilePath ?? "",
        activitiesCount: task.resultData.activitiesCount ?? 0,
        fileName: task.resultData.fileName ?? "",
        fileSize: task.resultData.fileSize ?? 0,
      }
      break
    case TaskStatusId.Fail:
      taskStatus = { id: TaskStatusId.Fail, message: task.resultText }
      break
    default:
      taskStatus = { id: task.statusId }
  }

  task.status = taskStatus

  return task
}
