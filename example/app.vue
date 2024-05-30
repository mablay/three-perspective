<!-- TEST FILE, NOT CONTAINED IN THE LIBRARY -->
<template>
  <div class="background">
    <div class="col">
      <ThreePerspective ref="perspective" :scene="scene" :alpha="true" />
    </div>
    <!-- <div class="col">
      <ThreePerspective :scene="scene" :alpha="true" />
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { entities, type ThreePerspective } from '../dist/three-perspective.es'
import '../dist/style.css'
import '../dist/fullscreen.css'
import { onMounted, ref, toRaw } from 'vue'
import { Scene } from 'three'

const perspective = ref<ThreePerspective>()
const scene = new Scene()
entities.addHemisphereLight(scene)
entities.addBox(scene, [0, 0, 0], [3, 0.2, 3])
// entities.addBox(scene, [0, 1.2, 0], [1, 0.2, 5])
entities.addBox(scene, [0, 1, 0], [1, 1, 1], [Math.PI / 4, 0, Math.PI / 4])
// entities.addBox(scene, [0, 0.6, 2])

onMounted(async () => {
  if (!perspective.value) throw new Error('Missing perspective!')
  console.log('perspective:', {...toRaw(perspective.value)})
})

</script>

<style scoped>
.background {
  background: linear-gradient(180deg, #1CB5E0 0%, #000851 100%);
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
}
.col {
  display: flex;
  flex: 1 1 0%;
  /* border: 1px solid #888; */
}
</style>