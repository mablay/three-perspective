<!-- TEST FILE, NOT CONTAINED IN THE LIBRARY -->
<template>
  <Perspective ref="perspective" :scene="scene" />
</template>

<script setup lang="ts">
import { entities, type ThreePerspective } from '../dist'
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import '../dist/fullscreen.css'

const perspective = ref<ThreePerspective>()
const scene = new THREE.Scene()

const light = new THREE.HemisphereLight('skyblue', 'brown')
const box = entities.createBox([0, 0, 0], [1, 1, 0.2], [1, 0, 0])
scene.add(box, light)

onMounted(async () => {
  if (!perspective.value) throw new Error('Missing perspective!')
  const { render } = perspective.value
  render()
  /* here, you have access to the renderer if needed. */
})

</script>

<style scoped>
</style>