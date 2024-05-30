# Three Perspective

![](https://github.com/mablay/three-perspective/blob/5a4a5b4d0506fd4f32aa9d3877bbaf7f2fe27b95/hero.jpg)

Use [ThreeJS](https://threejs.org) in [Vue3](https://vuejs.org) with minimal boilerplate.

## Features

* auto-resize canvas
* orbital controls
* optional css import for fullscreen view
* one-liner create helper functions
* easily create multiple perspectives to the same scene

## Setup

### As Vue3 Plugin

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import { ThreePerspectivePlugin } from 'three-perspective'
const app = createApp(App)
app.use(ThreePerspectivePlugin)
app.mount('#app')
```

### As Nuxt3 Plugin

```ts
// plugins/three-perspective.ts
import { ThreePerspectivePlugin } from 'three-perspective'
import 'three-perspective/style.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ThreePerspectivePlugin)
})
```

## Vue Example

```vue
<template>
  <!-- fills its parent element.
  If the parent element has height: 0 it won't be visible. -->
  <ThreePerspective ref="perspective" :scene="scene" />
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted, ref } from 'vue'
import { ThreePerspective, entities } from 'three-perspective'
import 'three-perspective/fullscreen.css'

const perspective = ref<InstanceType<typeof ThreePerspective>>()
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
