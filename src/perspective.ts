import { useEventListener, useResizeObserver } from '@vueuse/core'
import { Scene, WebGLRenderer } from 'three'
import { createCamera } from './entities'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { type Ref, onMounted, toRaw } from 'vue'

export interface PerspectiveProps {
  scene: THREE.Scene
  antialias?: boolean
  precision?: 'highp' | 'mediump' | 'lowp'
  powerPreference?: 'high-performance' | 'low-power' | 'default'
}

export function initPerspective (props: PerspectiveProps) {
  // console.log('initPerspective:', toRaw(props))
  const { scene, ...renderProps } = props

  // CAMERA
  const width = 1 // canvas.clientWidth
  const height = 1 // canvas.clientHeight
  const aspect = width / height
  const camera = createCamera(aspect)
  camera.position.set(-3, 2, -4)

  // RENDERER
  const renderer = new WebGLRenderer({
    antialias: true,
    powerPreference: 'low-power' // 'high-performance'
  })
  renderer.setSize(width, height)
  const render = () => renderer.render(scene, camera)

  // CONTROLS
  const orbit = new OrbitControls(camera, renderer.domElement)

  return { camera, renderer, render, orbit}
}
