<template>
  <div
    ref="container"
    class="three-perspective-container">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import { initPerspective } from './perspective'

interface PerspectiveProps {
  scene: THREE.Scene
  antialias?: boolean
  precision?: 'highp' | 'mediump' | 'lowp'
  powerPreference?: 'high-performance' | 'low-power' | 'default'
}

const props = withDefaults(defineProps<PerspectiveProps>(), {
  precision: 'highp',
  antialias: true,
  powerPreference: 'default'
})
const container = ref<HTMLDivElement>()
// const canvas = ref<HTMLCanvasElement>()

const { orbit, render, camera, renderer } = initPerspective(props)

defineExpose({ orbit, render, camera, renderer })

useEventListener(orbit, 'change', render)

useResizeObserver(container, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height - 0)
  render()
})


onMounted(() => {
  if (!container.value) throw new Error('Missing HTMLDivElement!')
  container.value.appendChild(renderer.domElement)
  render()
})

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>