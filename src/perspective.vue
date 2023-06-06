<template>
<canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { Scene } from 'three'
import { usePerspective } from './perspective'
import { ref } from 'vue'

const props = defineProps<{ scene: Scene }>()
const canvas = ref<HTMLCanvasElement>()
usePerspective(canvas, props.scene)

</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>