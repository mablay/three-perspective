<template>
  <Perspective ref="perspective" :scene="scene" />
</template>

<script setup lang="ts">
import Perspective from '../src/perspective.vue'
import { entities } from '../index'
import * as THREE from 'three'
import { onMounted, ref } from 'vue'

const perspective = ref<InstanceType<typeof Perspective>>()
const scene = new THREE.Scene()
scene.add(entities.createHemisphereLight())
scene.add(entities.createBox([3, 0, 0], [1, 2, 1], [1, 0, 0]))
onMounted(async () => {
  // access renderer, controls, camera etc. via component ref
  perspective.value?.render()
})

</script>

<style scoped>
</style>