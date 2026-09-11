import { ApiRequest, type AppResponse } from "@/core/ApiRequest"

export class ApiList<T> {
  readonly items: Array<T> = []
  readonly totalCount: number = 0

  constructor(items: Array<T>, totalCount: number) {
    this.items = items
    this.totalCount = totalCount
  }
}

export class CommonApi {
  private apiRequest: ApiRequest

  constructor() {
    this.apiRequest = new ApiRequest()
  }

  async checkFile(url: string) {
    let response: AppResponse
    const message = "File is not available or access is denied"

    try {
      response = await this.apiRequest.head(url)
    } catch {
      throw new Error(message)
    }

    if (!response.ok) {
      throw new Error(message)
    }
  }
}
