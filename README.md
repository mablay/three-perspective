# Three Perspective

[threejs](https://threejs.org/) convenience component for Vue3.

## Features

* auto-resize canvas
* optional css import for fullscreen view
* small repository of ThreeJS helper functions
* easily create multiple perspectives to the same scene

## Vue Example

```vue
<template>
  <!-- fills its parent element.
  If the parent element has height: 0 it won't be visible. -->
  <Perspective ref="perspective" :scene="scene" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { Perspective, entities } from 'three-perspective'
import 'three-perspective/fullscreen.css'

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
```

## Nuxt Plugin

```ts
import { Perspective } from 'three-perspective'
import 'three-perspective/fullscreen.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('Perspective', Perspective)
})
```
