import * as THREE from 'three'
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader.js'

export function exampleScene () {
  const scene = new THREE.Scene()
  scene.add(
    createLight(),
    createBox()
  )
  return scene
}

export function createCamera (aspect: number) {
  return new THREE.PerspectiveCamera(70, aspect, 0.1, 1e4)
}

export function createLight () {
  return new THREE.HemisphereLight('#FFF', '#432', 1)
}

export function createBox () {
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshStandardMaterial({
    color: '#BFF'
  })
  return new THREE.Mesh(geometry, material)
}

export function createImage (url: string) {
  const geometry = new THREE.PlaneGeometry(1, 1)
  const map = new THREE.TextureLoader().load(url)
  const material = new THREE.MeshBasicMaterial({ map })
  return new THREE.Mesh(geometry, material)
}

export async function createKtxImage (url: string, cb?: (texture: THREE.CompressedTexture) => void) {
  const loader = new KTXLoader()
  const map = await loader.load(url, cb ?? (() => {}))
  const geometry = new THREE.PlaneGeometry(1, 1)
  const material = new THREE.MeshBasicMaterial({ map })
  return new THREE.Mesh(geometry, material)

}
