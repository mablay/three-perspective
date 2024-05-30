<!-- TEST FILE, NOT CONTAINED IN THE LIBRARY -->
<template>
  <div class="background">
    <ThreePerspective
      ref="perspective"
      :scene="scene"
      :antialias="true"
      :alpha="true"
    />
  </div>
</template>

<script setup lang="ts">
import { entities, type ThreePerspective } from '../dist/three-perspective.es'
import '../dist/style.css'
import '../dist/fullscreen.css'
import { onMounted, ref, toRaw } from 'vue'

const perspective = ref<ThreePerspective>()
const scene = entities.exampleScene()

onMounted(async () => {
  if (!perspective.value) throw new Error('Missing perspective!')
  console.log('perspective:', {...toRaw(perspective.value)})
})

</script>

<style scoped>
.background {
  background: linear-gradient(180deg, #1CB5E0 0%, #000851 100%);
  width: 100vw;
  height: 100vh;
}
</style>