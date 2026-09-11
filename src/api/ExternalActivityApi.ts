import { ApiRequest, type Fileable } from "@/core/ApiRequest"
import { modifyTask, type Task } from "./TaskApi"

export enum ExternalService {
  AdidasRuning = "adidas_running",
  Strava = "strava",
}

export type RequestData = {
  service: ExternalService
}

export type StartConvertationResult = {
  guid: string
  fileId: number
  task: Task
}

export class ExternalActivityApi {
  private apiRequest: ApiRequest

  constructor() {
    this.apiRequest = new ApiRequest()
  }

  async startConvertation(data: RequestData, file: Fileable): Promise<StartConvertationResult> {
    const response = await this.apiRequest.post("/external-activities/start-convert", data, file)

    return {
      guid: response.guid,
      fileId: response.fileId,
      task: modifyTask(response.task),
    }
  }

  async removeConvertation(taskId: number, guid: string) {
    const params = new URLSearchParams()
    params.append("taskId", taskId.toString())
    params.append("guid", guid)

    return this.apiRequest.post("/external-activities/delete?" + params.toString())
  }
}
