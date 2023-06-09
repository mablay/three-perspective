import * as THREE from 'three'
import { KTXLoader } from 'three/examples/jsm/loaders/KTXLoader.js'

export type R3 = [x: number, y: number, z: number]

export function exampleScene () {
  const scene = new THREE.Scene()
  scene.add(
    createHemisphereLight(),
    createBox()
  )
  return scene
}

export function createCamera (aspect: number) {
  return new THREE.PerspectiveCamera(70, aspect, 0.1, 1e4)
}

export function createHemisphereLight (skyColor: THREE.ColorRepresentation = '#FFF', groundColor: THREE.ColorRepresentation = '#342') {
  return new THREE.HemisphereLight(skyColor, groundColor, 1)
}

export function createBox (
  pos:R3 = [0, 0, 0],
  dim:R3 = [1, 1, 1],
  rot:R3 = [0, 0, 0],
  color: THREE.ColorRepresentation = '#BFF'
) {
  const geometry = new THREE.BoxGeometry(...dim)
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(...rot)
  mesh.position.set(...pos)
  return mesh
}

export function createImage (url: string) {
  const geometry = new THREE.PlaneGeometry(1, 1)
  const map = new THREE.TextureLoader().load(url)
  const material = new THREE.MeshBasicMaterial({ map })
  return new THREE.Mesh(geometry, material)
}

export async function createKtxImage (url: string, cb?: (texture: THREE.CompressedTexture) => void) {
  const loader = new KTXLoader()
  // loader.setTranscoderPath('examples/jsm/libs/basis/')
  // loader.detectSupport(renderer)
  const map = await loader.load(url, cb ?? (() => {}))
  const geometry = new THREE.PlaneGeometry(1, 1)
  const material = new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide })
  return new THREE.Mesh(geometry, material)

}
