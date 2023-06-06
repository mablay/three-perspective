import { useEventListener, useResizeObserver } from '@vueuse/core'
import { Scene, WebGLRenderer } from 'three'
import { createCamera } from './entities'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { type Ref, onMounted } from 'vue'

function initPerspective (canvas: HTMLCanvasElement, scene: Scene) {

  // CAMERA
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const aspect = width / height
  const camera = createCamera(aspect)
  camera.position.set(-3, 2, -4)

  // RENDERER
  const renderer = new WebGLRenderer({ canvas })
  renderer.setSize(width, height)
  const render = () => renderer.render(scene, camera)

  // CONTROLS
  const orbit = new OrbitControls(camera, canvas)

  return { camera, renderer, render, orbit}
}

export function usePerspective (canvas: Ref<HTMLCanvasElement|undefined>, scene: Scene) {
  onMounted(() => {
    if (!canvas.value) throw new Error('Missing HTMLCanvasElement!')

    const { orbit, render, camera, renderer } = initPerspective(canvas.value, scene)

    useEventListener(orbit, 'change', render)

    useResizeObserver(canvas, (entries) => {
      const entry = entries[0]
      const { width, height } = entry.contentRect
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })

    render()
  })
}
