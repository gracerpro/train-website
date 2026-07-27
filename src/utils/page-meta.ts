/* global document */

import type { SSRContext } from "vue/server-renderer"

export const DEFAULT_KEYWORDS = "gps-трекинг, маршрут, тренировки, спорт, велосипед, бег, ходьба"

interface PageInfo {
  title?: string
  description?: string
  keywords?: string
}

export function setMetaInfo(info: PageInfo, ssrContext?: SSRContext | null) {
  if (ssrContext) {
    ssrContext.page = {
      title: info.title !== undefined ? info.title : null,
      description: info.description !== undefined ? info.description : null,
      keywords: info.keywords !== undefined ? info.keywords : null,
    }
  } else {
    if (info.title !== undefined) {
      document.title = info.title
    }

    if (info.description !== undefined) {
      const descriptionEl = document.querySelector("head meta[name='description']")
      if (!descriptionEl) {
        createMeta("description", info.description)
      } else {
        descriptionEl.setAttribute("content", info.description)
      }
    }

    if (info.keywords !== undefined) {
      const keywordsEl = document.querySelector("head meta[name='keywords']")
      if (!keywordsEl) {
        createMeta("keywords", info.keywords)
      } else {
        keywordsEl.setAttribute("content", info.keywords)
      }
    }
  }
}

function createMeta(name: string, content: string) {
  const meta = document.createElement("meta")
  meta.name = name
  meta.content = content
  document.getElementsByTagName("head")[0].appendChild(meta)
}
