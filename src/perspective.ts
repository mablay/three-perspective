import { Scene, WebGLRenderer } from 'three'
import { createCamera } from './entities'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export interface PerspectiveProps {
  scene: Scene
  antialias?: boolean
  /** default: 'highp' */
  precision?: 'highp' | 'mediump' | 'lowp'
  /** default: 'default' */
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
  const renderer = new WebGLRenderer(renderProps)
  renderer.setSize(width, height)
  const render = () => renderer.render(scene, camera)

  // CONTROLS
  const orbit = new OrbitControls(camera, renderer.domElement)

  return { camera, renderer, render, orbit}
}
