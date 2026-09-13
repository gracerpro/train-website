export type Convertation = {
  date: Date
  guid: string
  taskId: number
  inputFileId: number
  inputOriginFileName: string
  inputFileSize: number
  relativeFileUrl: string
  fileSize: number
  fileName: string
}
export type ConvertationData = Omit<Convertation, "date"> & {
  date: string
}
export type ConvertationLink = {
  relativeFileUrl: string
  fileName: string
}

export function getDownloadUrl(relativeFileUrl: string) {
  return import.meta.env.VITE_BACKEND_API_URL + relativeFileUrl
}

export function downloadByLink(downloadUrl: string, fileName: string) {
  const link = document.createElement("a")
  link.href = downloadUrl
  link.download = fileName

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
}
