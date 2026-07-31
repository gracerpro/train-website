import { ApiRequest } from "@/core/ApiRequest"
import { ApiList } from "./common"

export type Release = {
  id: number
  version: string
  versionName: string
  fileSize: number
  releasedAt: Date | null
  downloadUrl: string | null
  downloadPageUrl: string | null
  snippetMarkdown: string
  descriptionMarkdown: string
}

export class ReleaseApi {
  private apiRequest: ApiRequest

  constructor() {
    this.apiRequest = new ApiRequest()
  }

  async getList(pageSize: number, pageNumber: number = 1): Promise<ApiList<Release>> {
    const params = new URLSearchParams()
    params.append("pageSize", pageSize.toString())

    if (pageNumber > 1) {
      params.append("pageNumber", pageNumber.toString())
    }

    const response = await this.apiRequest.get("/releases", params)

    let items: Array<Release> = []
    let totalCount = 0

    if (response.items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      items = response.items.map((item: any) => this.modifyRelease(item))
      totalCount = response.totalCount
    }

    return new ApiList<Release>(items, totalCount)
  }

  async getLatest(): Promise<Release | null> {
    const response = await this.apiRequest.get("/releases/latest")

    if (!response || !response.release) {
      return null
    }

    return this.modifyRelease(response.release)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private modifyRelease(data: any): Release {
    const release = { ...data }

    if (release.releasedAt && typeof release.releasedAt === "string") {
      release.releasedAt = new Date(release.releasedAt)
    }
    if (release.downloadUrl === "") {
      release.downloadUrl = null
    }
    if (release.downloadPageUrl === "") {
      release.downloadPageUrl = null
    }
    if (!release.description) {
      release.descriptionMarkdown = ""
    } else {
      release.descriptionMarkdown = data.description
    }
    if (!release.snippet) {
      release.snippetMarkdown = ""
    } else {
      release.snippetMarkdown = data.snippet
    }

    return release
  }
}
