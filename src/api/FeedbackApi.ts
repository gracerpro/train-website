import { ApiRequest } from "@/core/ApiRequest"
import { ApiList } from "./common"

export enum Status {
  Created = "created",
  InProgress = "in_process",
  Moderated = "moderated",
  Abort = "abort",
  Closed = "closed",
  Queue = "queue",
}

export interface Feedback {
  id: number
  createdAt: Date
  moderatedAt: Date | null
  status: Status
  subject: string
  message: string
  answer: string
  username: string
  email: string
}

export class FeedbackApi {
  private apiRequest: ApiRequest

  constructor() {
    this.apiRequest = new ApiRequest()
  }

  async getList(pageSize: number, pageNumber: number = 1): Promise<ApiList<Feedback>> {
    const params = new URLSearchParams()
    params.append("pageSize", pageSize.toString())

    if (pageNumber > 1) {
      params.append("pageNumber", pageNumber.toString())
    }

    const response = await this.apiRequest.get("/feedback-items", params)

    let items: Array<Feedback> = []
    let totalCount = 0

    if (response.items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items = response.items.map((item: any) => this.modifyFeedback(item))
      totalCount = response.totalCount
    }

    return new ApiList<Feedback>(items, totalCount)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private modifyFeedback(data: any): Feedback {
    return {
      id: data.id,
      createdAt: new Date(data.createdAt),
      moderatedAt: data.moderatedAt ? new Date(data.moderatedAt) : null,
      status: data.status,
      subject: data.subject,
      message: data.message,
      answer: data.answer ?? "",
      username: data.username ?? "",
      email: data.email ?? "",
    }
  }
}
