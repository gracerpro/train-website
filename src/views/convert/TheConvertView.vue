<script setup lang="ts">
import { TaskApi, TaskStatusId, type Task } from "@/api/TaskApi"
import { HttpError } from "@/exceptions/HttpError"
import { UserError } from "@/exceptions/UserError"
import { delay } from "@/utils/core"
import { computed, ref } from "vue"

enum ConvertType {
  Strava = "strava",
  AdidasRuning = "adidas_runing",
}

const typesLabels = computed<{ value: ConvertType; label: string }[]>(() => {
  return [
    {
      value: ConvertType.Strava,
      label: "Strava",
    },
    {
      value: ConvertType.AdidasRuning,
      label: "Adidas runing",
    },
  ]
})

type ValidationErrors = {
  type: string
  file: string
}

const getValidationDefaultErrors = (): ValidationErrors => ({
  type: "",
  file: "",
})

const taskApi = new TaskApi()

const isProcessing = ref(false)
const formData = ref<{
  type: ConvertType | null
  file: File | null
}>({
  type: null,
  file: null,
})
const errorMessage = ref("")
const validationErrors = ref<ValidationErrors>(getValidationDefaultErrors())
const wasValidated = ref(false)

const task = ref<Task | null>(null)

function onSubmit() {
  console.log(formData.value)

  if (!validate()) {
    return
  }

  /*
  // start, upload the archive, return task
  // run task
  // wait
  // success -> file
  // fail -> message
  */

  convertStart()
    .then((task) => {
      waitTask(task)
        .catch((error: Error) => {
          console.log(error)
          errorMessage.value = error.message
        })
        .finally(() => {
          isProcessing.value = false
        })
    })
    .catch((error: Error) => {
      console.log(error)
      errorMessage.value = error.message
      isProcessing.value = false
    })
}

async function convertStart(): Promise<Task> {
  isProcessing.value = true
  task.value = null
  errorMessage.value = ""

  task.value = {
    id: 1,
    status: { id: TaskStatusId.Free },
    completePercent: 0,
    resultText: "",
    resultData: null,
  }

  return task.value
}

async function waitTask(inputTask: Task): Promise<Task> {
  await delay(1000)

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
        return newTask
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

function validate(): boolean {
  let result = true
  validationErrors.value = getValidationDefaultErrors()

  if (!formData.value.type) {
    validationErrors.value.type = "Нужно выбрать сервис"
    result = false
  }
  if (!validateFile()) {
    result = false
  }

  wasValidated.value = true

  console.log(validationErrors.value)

  return result
}

function validateFile(): boolean {
  validationErrors.value.file = ""

  if (!formData.value.file) {
    validationErrors.value.file = "Нужно выбрать архив"
  }

  return validationErrors.value.file === ""
}

function onFileChange(event: Event) {
  console.log(event)

  const files = (event.target as HTMLInputElement).files

  if (files && files.length > 0) {
    formData.value.file = files[0]
    validateFile()
  }
}
</script>

<template>
  <div class="content container">
    <p>Конвертация тренировок из <b>Strava</b> или <b>Adidas runing</b></p>

    <form
      class="border rounded p-3 pb-0 mb-3"
      novalidate
      :class="{ 'was-validated': wasValidated }"
      @submit.prevent="onSubmit"
    >
      <div class="mb-3">
        <label :for="'type_' + ConvertType.Strava" class="form-label fw-bold">Импорт из сервиса</label>
        <div v-for="(item, index) in typesLabels" :key="item.value" class="form-check">
          <input
            :id="'type_' + item.value"
            v-model="formData.type"
            :value="item.value"
            :disabled="isProcessing"
            class="form-check-input"
            type="radio"
            name="type"
            required
          />
          <label class="form-check-label" :for="'type_' + item.value">
            {{ item.label }}
          </label>
          <div
            v-if="index === typesLabels.length - 1 && validationErrors.type"
            class="invalid-feedback"
          >
            {{ validationErrors.type }}
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="formFile" class="form-label fw-bold">Архив</label>
        <input
          id="formFile"
          class="form-control"
          type="file"
          accept=".zip"
          required
          :disabled="isProcessing"
          :class="wasValidated ? (validationErrors.file ? 'is-invalid' : 'is-valid') : undefined"
          @change="onFileChange"
        />
        <div v-if="validationErrors.file" class="invalid-feedback">{{ validationErrors.file }}</div>
      </div>
      <div class="row">
        <div class="col-lg-10 mb-3">
          <div v-if="task?.status.id === TaskStatusId.Free" class="text-center">
            Задача отправлена в очередь.
          </div>
          <div
            v-if="task?.status.id === TaskStatusId.Processing"
            class="progress"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div class="progress-bar" style="width: 0%"></div>
          </div>
        </div>
        <div class="col-lg-2 mb-3 d-flex justify-content-end align-items-center">
          <div v-if="isProcessing" class="spinner-border me-3" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <button type="submit" class="btn btn-primary" :disabled="isProcessing">Отправить</button>
        </div>
      </div>
    </form>

    <div v-if="errorMessage" class="alert alert-danger mb-3">
      {{ errorMessage }}
    </div>
    <div v-if="task && task.status.id === TaskStatusId.Success" class="alert alert-success mb-3">
      Готовый архив, который можно загрузить в мобильном приложении
      <b>Скачать ID = {{ task.status.fileId }}</b>
    </div>
  </div>
</template>
