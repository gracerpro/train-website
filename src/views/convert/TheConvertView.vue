<script setup lang="ts">
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

const task = ref<{ id: number } | null>(null)

function onSubmit() {
  console.log(formData.value)

  if (!validate()) {
    return
  }

  isProcessing.value = true

  /*
  // start, upload the archive, return task
  // run task
  // wait
  // success -> file
  // fail -> message
  */

  task.value = { id: 1 }

  waitTask()
}

function waitTask() {
  // ...

  errorMessage.value = "Ошибка"

  // isProcessing.value = false
}

function validate(): boolean {
  let result = true
  validationErrors.value = getValidationDefaultErrors()

  if (!formData.value.type) {
    validationErrors.value.type = "Нужно выбрать сервис"
    result = false
  }
  if (!formData.value.file) {
    validationErrors.value.file = "Нужно выбрать архив"
    result = false
  }

  wasValidated.value = true

  console.log(validationErrors.value)

  return result
}
</script>

<template>
  <div class="content container">
    <p>Конвертация тренировок из <b>Strava</b> или <b>Adidas runing</b></p>

    <form
      class="border rounded p-3 mb-3"
      novalidate
      :class="{ 'was-validated': wasValidated }"
      @submit.prevent="onSubmit"
    >
      <div class="mb-3">
        <label :for="'type_' + ConvertType.Strava">Импорт из сервиса</label>
        <div v-for="(item, index) in typesLabels" :key="item.value" class="form-check">
          <input
            :id="'type_' + item.value"
            v-model="formData.type"
            :value="item.value"
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
        <label for="formFile" class="form-label">Архив</label>
        <input id="formFile" class="form-control" type="file" accept=".zip" required />
        <div v-if="validationErrors.file" class="invalid-feedback">{{ validationErrors.file }}</div>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-primary">Отправить</button>
      </div>
    </form>

    <div v-if="errorMessage" class="alert alert-danger mb-3">
      {{ errorMessage }}
    </div>
  </div>
</template>
