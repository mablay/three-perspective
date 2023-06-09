<template>
  <div ref="container" class="three-perspective-container">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Scene } from 'three'
import { initPerspective } from './perspective'
import { onMounted, ref } from 'vue'
import { useEventListener, useResizeObserver } from '@vueuse/core';

const props = defineProps<{ scene: Scene }>()
const container = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
    if (!container.value) throw new Error('Missing HTMLDivElement!')
    if (!canvas.value) throw new Error('Missing HTMLCanvasElement!')

    const { orbit, render, camera, renderer } = initPerspective(canvas.value, props.scene)

    useEventListener(orbit, 'change', render)

    useResizeObserver(container, (entries) => {
      if (!canvas.value) throw new Error('Missing HTMLCanvasElement!')
      const entry = entries[0]
      const { width, height } = entry.contentRect
      // canvas.value.width = width
      // canvas.value.height = height - 6
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
      render()
    })

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