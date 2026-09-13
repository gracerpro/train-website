<script setup lang="ts">
import { asDateShortTime } from "@/utils/date-time"
import { getHumanSize } from "@/utils/formatter"
import { getDownloadUrl, type Convertation } from "./convert"
import { ref } from "vue"
import { ExternalActivityApi } from "@/api/ExternalActivityApi"
import type { Task } from "@/api/TaskApi"

interface Props {
  convertations: Convertation[]
}

defineProps<Props>()

const task = defineModel<Task | null>("task", { required: true })

const emit = defineEmits<{
  resetTask: []
  removeFromClient: [item: Convertation]
  downloadArchive: [fileName: string, relativeUrl: string]
}>()

const externalActivityApi = new ExternalActivityApi()

const removeMap = ref<{ [key: string]: true }>({})

function removeConvertation(item: Convertation) {
  if (removeMap.value[item.guid]) {
    return
  }

  removeMap.value[item.guid] = true

  if (task.value && task.value.id === item.taskId) {
    task.value = null
  }

  externalActivityApi
    .removeConvertation(item.taskId, item.guid)
    .then(() => {
      emit("removeFromClient", item)
    })
    .catch((error: Error) => {
      alert(error.message)
      emit("removeFromClient", item)
    })
    .finally(() => delete removeMap.value[item.guid])
}
</script>

<template>
  <div>
    <h4>Список конвертаций</h4>

    <div
      v-for="item in convertations"
      :key="item.relativeFileUrl"
      class="d-flex align-items-center border gap-3 rounded p-3 mb-3"
    >
      <div class="flex-fill">
        <div class="mb-2">
          <span class="fst-italic">{{ asDateShortTime(item.date) }}</span
          >{{ " " }} <span class="mx-2">{{ item.inputOriginFileName }}</span
          >{{ " " }}
          {{ getHumanSize(item.inputFileSize) }}
        </div>
        <div>
          <b
            ><a
              :href="getDownloadUrl(item.relativeFileUrl)"
              :download="item.fileName"
              @click.prevent="emit('downloadArchive', item.fileName, item.relativeFileUrl)"
              >Скачать</a
            ></b
          >{{ " " }} <span class="mx-2">{{ item.fileName }}</span
          >{{ " " }}
          <b>{{ getHumanSize(item.fileSize) }}</b>
        </div>
      </div>
      <button
        type="button"
        :disabled="removeMap[item.guid]"
        class="btn btn-outline-danger"
        @click="removeConvertation(item)"
      >
        X
      </button>
    </div>
  </div>
</template>
