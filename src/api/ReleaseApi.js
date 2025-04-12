const releaseList = [
  {
    versionLabel: "1.0.17-alpha",
    date: "2024-05-31",
    versionCode: 17,
    fileName: "train-client_1.0.17-alpha.apk",
    fileSize: 2700046,
    downloadUrl:
      "https://github.com/gracerpro/train-website/releases/download/v1.0.17-alpha/train-client_v1.0.17-alpha.apk",
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
    fileName: "train-client_1.2.9-alpha.apk",
    fileSize: 3440603,
    downloadUrl:
      "https://github.com/gracerpro/train-website/releases/download/v1.2.9-alpha/train-client_v1.2.9-alpha.apk",
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
    versionLabel: "1.4.1",
    date: "2025-04-09",
    versionCode: 27,
    fileName: "train-client_1.4.1.apk",
    fileSize: 0,
    downloadUrl: "",
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
      <li>Добавлено масштабирование маршрута в карточке тренировки.</li>
      <li>Добавлена отмена подготовки перед записью тренировки.</li>
      <li>Добавлена фильтрация по названию, по типу, по источнику в списке тренировок.</li>
      <li>Добавлен режим точек и линий в компоненте маршрута.</li>
      <li>Добавлено переключение по свайпу статистики по месяцу.</li>
      <li>Добавлены иконки к типам тренировок.</li>
      <li>Изменена навигация на ModalDrawerSheet.</li>
      <li>Оптимизирован сервис чтения GPS координат.</li>
      <li>Обновлен экран о программе.</li>
      <li>Заблокирована смена ориентации.</li>
      <li>Добавлено пользовательское соглашение.</li>
      <li>Обновлен и оптимизирован интерфейс на всех экранах.</li>
    </ul>`,
  },
]

export class ReleaseApi {
  /**
   * @returns Promise<Object>
   */
  async getList() {
    const list = new Array(releaseList.length)

    for (let i = 0; i < releaseList.length; ++i) {
      list[i] = this.modifyRelease(releaseList[i])
    }

    return {
      items: list,
      totalCount: list.length,
    }
  }

  /**
   * @returns Promise<Object>
   */
  async getLatest() {
    let release = releaseList[releaseList.length - 1]

    return this.modifyRelease(release)
  }

  /**
   * @private
   * @param {Object} release
   * @returns {Object}
   */
  modifyRelease(release) {
    let copyRelease = { ...release }

    if (copyRelease.date && typeof copyRelease.date === "string") {
      copyRelease.date = new Date(copyRelease.date)
    }

    return copyRelease
  }
}
