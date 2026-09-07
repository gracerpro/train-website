import { ApiRequest } from "@/core/ApiRequest"
import { modifyTask, type Task } from "./TaskApi"

export enum ExternalService {
  AdidasRuning = 'adidas_running',
  Strava = 'strava',
}

export type RequestData = {
  service: ExternalService
}

export class ExternalActivityApi {
  private apiRequest: ApiRequest

  constructor() {
    this.apiRequest = new ApiRequest()
  }

  async start(data: RequestData, file: File): Promise<Task> {
    const response = await this.apiRequest.post("/external-activities/convert", data)

    return modifyTask(response.task)
  }
}
