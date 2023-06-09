<template>
  <Perspective ref="perspective" :scene="scene" />
</template>

<script setup lang="ts">
import Perspective from '../src/perspective.vue'
import { entities } from '../index'
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import '../src/fullscreen.css'

const perspective = ref<InstanceType<typeof Perspective>>()
const scene = new THREE.Scene()

const light = new THREE.HemisphereLight('skyblue', 'brown')
const box = entities.createBox([0, 0, 0], [1, 1, 0.2], [1, 0, 0])
scene.add(box, light)

onMounted(async () => {
  if (!perspective.value) throw new Error('Missing perspective!')
  const { renderer, orbit, camera, render } = perspective.value
  // here, you have access to the renderer if needed.
})

</script>

<style scoped>
</style>