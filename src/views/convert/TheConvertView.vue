<script setup lang="ts">
import { CommonApi, type Settings } from "@/api/common"
import {
  ExternalActivityApi,
  ExternalService,
  type StartConvertationResult,
} from "@/api/ExternalActivityApi"
import { TaskApi, TaskStatusId, type ResultData, type Task } from "@/api/TaskApi"
import { HttpError } from "@/exceptions/HttpError"
import { UserError } from "@/exceptions/UserError"
import { ValidateError } from "@/exceptions/ValidateError"
import { delay } from "@/utils/core"
import { getHumanSize } from "@/utils/formatter"
import { computed, onUnmounted, ref, useTemplateRef } from "vue"
import {
  downloadByLink,
  getDownloadUrl,
  type Convertation,
  type ConvertationData,
  type ConvertationLink,
} from "./convert"
import ConvertList from "./ConvertList.vue"
import AlertMessage from "@/components/AlertMessage.vue"

type ValidationErrors = {
  service: string
  file: string
}

const getValidationDefaultErrors = (): ValidationErrors => ({
  service: "",
  file: "",
})

const taskApi = new TaskApi()
const externalActivityApi = new ExternalActivityApi()
const commonApi = new CommonApi()

const isProcessing = ref(false)
const formData = ref<{
  service: ExternalService | null
  file: File | null
}>({
  service: null,
  file: null,
})
const errorMessage = ref("")
const validationErrors = ref<ValidationErrors>(getValidationDefaultErrors())
const wasValidated = ref(false)

const task = ref<Task | null>(null)
const convertations = ref<Convertation[]>([])

const settings = ref<Settings>({
  convert: {
    storeSeconds: 0,
    maxFileSize: null,
  },
})

const formFileRef = useTemplateRef<HTMLInputElement>("formFileRef")

const visibleConvertations = computed(() => {
  return convertations.value.slice().sort((a, b) => b.date.getTime() - a.date.getTime())
})

const typesLabels = computed<{ value: ExternalService; label: string }[]>(() => {
  return [
    {
      value: ExternalService.Strava,
      label: "Strava",
    },
    {
      value: ExternalService.AdidasRuning,
      label: "Adidas runing",
    },
  ]
})

onUnmounted(() => saveState())

if (!import.meta.env.SSR) {
  readState()
  loadSettings()
}

function loadSettings() {
  commonApi
    .getSettings()
    .then((result) => {
      settings.value = result
    })
    .catch((error) => {
      console.error(error)
    })
}

function onSubmit() {
  let validFormData: ValidFormData

  errorMessage.value = ""

  try {
    validFormData = validate()
  } catch {
    return
  }

  startConvertation(validFormData)
    .then((startResult) => {
      setFile(null)

      waitTask(startResult.task)
        .then((result) => {
          addConvertation({
            guid: startResult.guid,
            taskId: startResult.task.id,
            inputFileId: startResult.fileId,
            inputOriginFileName: validFormData.file.name,
            inputFileSize: validFormData.file.size,
            date: new Date(),
            relativeFileUrl: result.relativeFileUrl,
            fileSize: result.fileSize,
            fileName: result.fileName,
          })
        })
        .catch((error: Error) => {
          errorMessage.value = error.message
        })
        .finally(() => {
          isProcessing.value = false
        })
    })
    .catch((error: Error) => {
      errorMessage.value = error.message
      isProcessing.value = false
    })
}

async function startConvertation(validFormData: ValidFormData): Promise<StartConvertationResult> {
  isProcessing.value = true
  task.value = null
  errorMessage.value = ""

  const result = await externalActivityApi.startConvertation(
    {
      service: validFormData.service,
    },
    {
      name: "file",
      file: validFormData.file,
    },
  )

  task.value = result.task

  return result
}

const STORAGE_COMPONENT_ID = "convert.indexView"

function addConvertation(item: Convertation) {
  const index = convertations.value.findIndex((a) => a.relativeFileUrl === item.relativeFileUrl)

  if (index < 0) {
    convertations.value.push(item)
    saveState()
  }
}

function removeFromClient(item: ConvertationLink) {
  const index = convertations.value.findIndex((a) => a.relativeFileUrl === item.relativeFileUrl)

  if (index >= 0) {
    convertations.value.splice(index, 1)
    saveState()
  }
}

async function waitTask(inputTask: Task): Promise<ResultData> {
  await delay(2000)

  while (true) {
    const notFoundMessage = "Задача не найдена."
    let newTask
    try {
      newTask = await taskApi.get(inputTask.id)
    } catch (error: unknown) {
      if (error instanceof HttpError && error.statusCode === 404) {
        task.value = null
        throw new UserError(notFoundMessage)
      } else {
        throw error
      }
    }

    task.value = newTask

    if (newTask === null) {
      throw new UserError(notFoundMessage)
    }

    switch (newTask.status.id) {
      case TaskStatusId.Success:
        return newTask.status
      case TaskStatusId.Fail:
        throw new UserError(newTask.resultText)
      case TaskStatusId.Free:
      case TaskStatusId.Processing:
        // TODO: sleep 1, 2, 4, 8 seconds
        await delay(1000)
        break
      default: {
        // Compile-time safety check
        const _a: never = newTask.status
        return _a
      }
    }
  }
}

type ValidFormData = {
  service: ExternalService
  file: File
}

function validate(): ValidFormData {
  let result = true
  validationErrors.value = getValidationDefaultErrors()

  const service = formData.value.service

  if (!service) {
    validationErrors.value.service = "Нужно выбрать сервис"
    result = false
  }

  const file = validateFile()

  if (file === null) {
    result = false
  }

  wasValidated.value = true

  if (!result) {
    throw new ValidateError()
  }

  if (file === null || service === null) {
    throw new Error()
  }

  return {
    file,
    service,
  }
}

function validateFile(): File | null {
  const file = formData.value.file

  validationErrors.value.file = ""

  if (!file) {
    validationErrors.value.file = "Нужно выбрать архив"
    return null
  }

  return file
}

function setFile(value: File | null) {
  formData.value.file = value

  if (formFileRef.value && value === null) {
    formFileRef.value.value = ""
  }
}

function onFileClear() {
  setFile(null)
  validateFile()
}

function onFileChange(event: Event) {
  const files = (event.target as HTMLInputElement).files

  if (files && files.length > 0) {
    formData.value.file = files[0]
    validateFile()
  }
}

function downloadArchive(fileName: string, relativeFileUrl: string) {
  commonApi
    .checkFile(relativeFileUrl)
    .then(() => {
      downloadByLink(getDownloadUrl(relativeFileUrl), fileName)
    })
    .catch(() => {
      alert("Файл не найден или к нему закрыт доступ.")

      removeFromClient({
        relativeFileUrl,
        fileName,
      })
    })
}

function readState() {
  let stateStr = localStorage.getItem(STORAGE_COMPONENT_ID)

  if (typeof stateStr !== "string") {
    stateStr = ""
  }

  let data
  try {
    data = JSON.parse(stateStr)
  } catch {
    data = {}
  }
  if (data === null || Array.isArray(data) || typeof data !== "object") {
    data = {}
  }

  convertations.value = []

  if (data.convertations && Array.isArray(data.convertations)) {
    try {
      convertations.value = data.convertations.map((a: ConvertationData) => {
        return {
          ...a,
          date: new Date(a.date),
        }
      })
    } catch {
      convertations.value = []
    }
  }
}

function saveState() {
  const state = {
    convertations: convertations.value,
  }

  localStorage.setItem(STORAGE_COMPONENT_ID, JSON.stringify(state))
}
</script>

<template>
  <div class="content container container-text">
    <p>Конвертация тренировок из <b>Strava</b> или <b>Adidas runing</b></p>

    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <form
          class="border rounded p-3 pb-0 mb-3"
          novalidate
          :class="{ 'was-validated': wasValidated }"
          @submit.prevent="onSubmit"
        >
          <div class="mb-3">
            <label :for="'service_' + ExternalService.Strava" class="form-label fw-bold"
              >Импорт из сервиса</label
            >
            <div v-for="(item, index) in typesLabels" :key="item.value" class="form-check">
              <input
                :id="'service_' + item.value"
                v-model="formData.service"
                :value="item.value"
                :disabled="isProcessing"
                class="form-check-input"
                type="radio"
                name="type"
                required
              />
              <label class="form-check-label" :for="'service_' + item.value">
                {{ item.label }}
              </label>
              <div
                v-if="index === typesLabels.length - 1 && validationErrors.service"
                class="invalid-feedback"
              >
                {{ validationErrors.service }}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label fw-bold">Архив</label>
            <input
              id="formFile"
              ref="formFileRef"
              class="form-control"
              type="file"
              accept=".zip"
              required
              :disabled="isProcessing"
              :class="
                wasValidated ? (validationErrors.file ? 'is-invalid' : 'is-valid') : undefined
              "
              @change="onFileChange"
            />
            <div
              v-if="settings.convert.maxFileSize !== null && settings.convert.maxFileSize > 0"
              class="form-text"
            >
              Максимальный размер около {{ getHumanSize(settings.convert.maxFileSize) }}
            </div>
            <div v-if="validationErrors.file" class="invalid-feedback">
              {{ validationErrors.file }}
            </div>
            <div v-if="formData.file" class="mt-2">
              {{ formData.file.name }} {{ getHumanSize(formData.file.size) }}
              <button
                type="button"
                class="btn-close ms-2"
                aria-label="Close"
                @click="onFileClear"
              ></button>

              <alert-message
                v-if="
                  settings.convert.maxFileSize !== null &&
                  settings.convert.maxFileSize > 0 &&
                  formData.file.size > settings.convert.maxFileSize
                "
                :type="'danger'"
                class="mt-2"
              >
                Слишком большой размер файла, должен быть не более
                {{ getHumanSize(settings.convert.maxFileSize) }}
              </alert-message>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-8 mb-3">
              <div v-if="task?.status.id === TaskStatusId.Free" class="text-center">
                Задача на конвертацию архива отправлена в очередь.
              </div>
              <div
                v-if="task?.status.id === TaskStatusId.Processing"
                class="h-100 d-flex align-items-center"
              >
                <div
                  class="progress w-100"
                  role="progressbar"
                  aria-label="Processing"
                  :aria-valuenow="task.completePercent"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div class="progress-bar" :style="'width: ' + task.completePercent + '%'"></div>
                </div>
              </div>
            </div>
            <div class="col-lg-4 mb-3 d-flex justify-content-end align-items-center">
              <div
                :class="isProcessing ? '' : 'invisible'"
                class="spinner-border me-3"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="isProcessing">
                Отправить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

    <alert-message
      v-if="errorMessage"
      :type="'danger'"
      is-show-close
      class="mb-3"
      @hide="errorMessage = ''"
    >
      {{ errorMessage }}
    </alert-message>

    <alert-message v-if="task?.status.id === TaskStatusId.Success" :type="'success'" class="mb-3">
      <p>{{ task.resultText }}</p>
      <div>Готовый архив, который можно загрузить в мобильном приложении</div>
      <div class="text-center mt-4">
        <b
          ><a
            :href="getDownloadUrl(task.status.relativeFileUrl)"
            :download="task.status.fileName"
            @click.prevent="downloadArchive(task.status.fileName, task.status.relativeFileUrl)"
            >Скачать</a
          >
          {{ getHumanSize(task.status.fileSize, 2) }}</b
        >
      </div>
    </alert-message>

    <alert-message :type="'warning'">
      <div v-if="settings.convert.storeSeconds > 0">
        Сконвертированные файлы хранятся не более
        {{ Math.floor(settings.convert.storeSeconds / 3600) }} ч.
      </div>
      <div v-else>
        Сконвертированные файлы хранятся ограниченное время, например, не более 12 ч.
      </div>
    </alert-message>

    <convert-list
      v-if="visibleConvertations.length > 0"
      v-model:task="task"
      :convertations="visibleConvertations"
      @remove-from-client="removeFromClient"
      @download-archive="downloadArchive"
    />
  </div>
</template>
