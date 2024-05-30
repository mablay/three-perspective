<template>
  <div
    ref="container"
    class="three-perspective-container">
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, provide, defineProps } from 'vue'
import { type PerspectiveProps, initPerspective } from '../perspective'

const container = ref<HTMLDivElement>()

const props = withDefaults(defineProps<PerspectiveProps>(), {
  precision: 'highp',
  antialias: true,
  powerPreference: 'default',
  alpha: false,
})

provide('scene', props.scene)

const { orbit, render, camera, renderer } = initPerspective(props)
defineExpose({ orbit, render, camera, renderer })

let resizeObserver: ResizeObserver
function resize (entries: ResizeObserverEntry[], _observer: ResizeObserver) {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height - 0)
  render()
}

onMounted(() => {
  if (!container.value) throw new Error('Missing HTMLDivElement!')
  container.value.appendChild(renderer.domElement)
  render()

  // these listeners must be cleaned up on unmount
  orbit.addEventListener('change', render)
  resizeObserver = new ResizeObserver(resize)
  resizeObserver.observe(container.value)
})

onUnmounted(() => {
  orbit.removeEventListener('change', render)
  resizeObserver?.disconnect()
})

</script>

<style scoped>
.three-perspective-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>