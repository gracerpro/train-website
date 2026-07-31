import { ApiRequest } from "@/core/ApiRequest"
import { ApiList } from "./common"

export const LATEST_VERSION = "1.4.2"

const releaseList = [
  {
    versionLabel: "1.0.17-alpha",
    date: "2024-05-31",
    versionCode: 17,
    fileName: "",
    fileSize: 0,
    downloadUrl: "",
    downloadPageUrl: "",
    description: `
    <ul>
      <li>Добавлен главный экран, на котором можно начать тренировку.</li>
      <li>Добавлен экран с историей тренировок, список.</li>
      <li>Добавлен экран с просмотром тренировки, карточка.</li>
      <li>Добавлен экран с описанием программы, планы.</li>
      <li>Добавлен экран с настройками пользователя.</li>
      <li>Запись тренировки можно приостановить и продолжить неограниченное количество раз.</li>
      <li>При записи тренировки показывается уведомление, отображается схематичный маршрут.</li>
      <li>Добавлена навигация, меню.</li>
      <li>Добавлено удаление тренировки из карточки и списка.</li>
      <li>Добавлено редактирование основных параметров тренировки из карточки и списка.</li>
      <li>Добавлены GPS проверки перед записью тренировки.</li>
      <li>Добавлены проверки на права перед использованием приложения.</li>
    </ul>`,
  },
  {
    versionLabel: "1.2.9-alpha",
    date: "2024-11-30",
    versionCode: 25,
    fileName: "",
    fileSize: 0,
    downloadUrl: "",
    downloadPageUrl: "",
    description: `
    <ul>
      <li>Добавлен экран со статистикой.</li>
      <li>Добавлен экран со статистикой в выбранном месяце.</li>
      <li>Добавлен фильтр статистики.</li>
      <li>Добавлен экcпорт тренировок в текстовый файл.</li>
      <li>Обновлен интерфейс в карточке тренировки.</li>
    </ul>`,
  },
  {
    versionLabel: LATEST_VERSION,
    date: "2025-04-20",
    versionCode: 28,
    fileName: "train-client_1.4.2.apk",
    fileSize: 0,
    downloadUrl: "/releases/train-client_1.4.2.apk",
    downloadPageUrl: "",
    description: `
    <ul>
      <li>Добавлен экран с деталями тренировки.</li>
      <li>Добавлен экран с графиком зависимости скорости от времени для одной тренировки.</li>
      <li>Добавлен экран с простым редактированием маршрута.</li>
      <li>Добавлен экспорт тренировок в архив за год, месяц, диапазон дат. Можно отфильтровать по источнику тренировки.</li>
      <li>Добавлен экспорт одной тренировки в GPX формат из карточки.</li>
      <li>Добавлен экспорт одной тренировки в архив из карточки.</li>
      <li>Добавлен импорт тренировок из архива. При повторном импорте дублей не будет.</li>
      <li>Добавлен импорт тренировок из сервиса <b>Strava</b> и <b>Adidas running</b>. При повторном импорте дублей не будет.</li>
      <li>
        При остановке записи маршрута тренировка временно сохраняется. Затем ее можно восстановить, если
        произошёл сбой.
      </li>
      <li>Добавлен маршрут к элементам в списке тренировок.</li>
      <li>Добавлена статистика за последний год на главный экран.</li>
      <li>Добавлены песледние N тренировок на главный экран.</li>
      <li>Добавлена настройка отображения еденицы измерения скорости: м/с или км/ч или мил/ч.</li>
      <li>Добавлена настройка отображения координат на экране записи тренировки.</li>
      <li>Добавлено масштабирование маршрута в карточке тренировки.</li>
      <li>Добавлена отмена подготовки перед записью тренировки.</li>
      <li>Добавлены значения спуска и подъёма в карточку тренировки.</li>
      <li>Добавлена фильтрация по названию, по типу, по источнику в списке тренировок.</li>
      <li>Добавлен режим точек и линий в компоненте маршрута.</li>
      <li>Добавлено переключение по свайпу статистики по месяцу.</li>
      <li>Добавлены иконки к типам тренировок.</li>
      <li>Добавлена система уведомлений об ошибках. При критическом завершении программы можно отправить сообщение разработчику.</li>
      <li>Изменена навигация на ModalDrawerSheet.</li>
      <li>Оптимизирован сервис чтения GPS координат.</li>
      <li>Обновлен экран о программе.</li>
      <li>Иденица измерения скорости по-умолчанию <i>км/ч</i>. Изменяется в настройках.</li>
      <li>Заблокирована смена ориентации.</li>
      <li>Добавлено пользовательское соглашение.</li>
      <li>Обновлен и оптимизирован интерфейс на всех экранах.</li>
    </ul>`,
  },
]

export type Release = {
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

  async getLatest() {
    const release = releaseList[releaseList.length - 1]

    return this.modifyRelease(release)
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
