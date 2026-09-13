<script setup lang="ts">
import { computed } from "vue"

interface Props {
  type?: "danger" | "warning" | "success" | "light"
  isShowClose?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: "light",
  isShowClose: false,
})

const emit = defineEmits<{
  hide: []
}>()

const alertClass = computed(() => "alert-" + props.type)
</script>

<template>
  <div :class="['alert', alertClass]">
    <button
      v-if="isShowClose"
      type="button"
      class="btn-close float-end"
      aria-label="Close"
      @click="emit('hide')"
    ></button>
    <slot />
  </div>
</template>
