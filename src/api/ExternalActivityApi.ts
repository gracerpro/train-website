import { ApiRequest, type Fileable } from "@/core/ApiRequest"
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

  async start(data: RequestData, file: Fileable): Promise<Task> {
    const response = await this.apiRequest.post(
      "/external-activities/convert",
      data,
      file
    )

    return modifyTask(response.task)
  }
}
