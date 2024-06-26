import * as THREE from 'three'

export type R2 = [x: number, y: number]
export type R3 = [x: number, y: number, z: number]

export function exampleScene () {
  const scene = new THREE.Scene()
  addHemisphereLight(scene)
  addBox(scene)
  return scene
}

export function createCamera (aspect: number) {
  return new THREE.PerspectiveCamera(70, aspect, 0.1, 1e4)
}

export function addHemisphereLight (parent: THREE.Object3D, skyColor: THREE.ColorRepresentation = '#FFF', groundColor: THREE.ColorRepresentation = '#342') {
  const light = new THREE.HemisphereLight(skyColor, groundColor, 1)
  light.position.set(3, 5, 4)
  parent.add(light)
  return light
}

export function addPlane (parent: THREE.Object3D, pos:R3 = [0, 0, 0], dim:R2 = [10, 10], rot:R3 = [Math.PI/2, 0, 0], color:THREE.ColorRepresentation = '#BBB') {
  const geometry = new THREE.PlaneGeometry(...dim)
  const material = new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(...rot)
  mesh.position.set(...pos)
  parent.add(mesh)
  return mesh
}

export function addBox (
  parent: THREE.Object3D, 
  pos:R3 = [0, 0, 0],
  dim:R3 = [1, 1, 1],
  rot:R3 = [0, 0, 0],
  color: THREE.ColorRepresentation = '#BDF'
) {
  const geometry = new THREE.BoxGeometry(...dim)
  const material = new THREE.MeshStandardMaterial({ color })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.set(...rot)
  mesh.position.set(...pos)
  parent.add(mesh)
  return mesh
}

export function addImage (parent: THREE.Object3D, url: string, pos:R3 = [0, 0, 0], dim:R2 = [1, 1]) {
  const geometry = new THREE.PlaneGeometry(...dim)
  const map = new THREE.TextureLoader().load(url)
  const material = new THREE.MeshBasicMaterial({
    map,
    side: THREE.DoubleSide
  })
  const mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(...pos)
  parent.add(mesh)
  return mesh
}
