<template>
  <Perspective :scene="scene" />
</template>

<script setup lang="ts">
import Perspective from '../src/perspective.vue'
import { entities } from '../index'
const scene = entities.exampleScene()
</script>

<style scoped>
</style>