import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//canvas
const canvas = document.getElementById('canvas')

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scene = new THREE.Scene()


//object dan material
const boxGeometry = new THREE.BoxGeometry(10, 1, 10)
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
})

//menyatukan box elemen dengan material
const box = new THREE.Mesh(boxGeometry, boxMaterial)
scene.add(box)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

//untuk menampilkan grid pada layar
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

const loader = new GLTFLoader();
loader.load('../assets/monyet.glb', (gltf) => {
  scene.add(gltf.scene)
})

//membuat kamera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
)
camera.position.set(-10, 10, 30)

//untuk orbit
const orbit = new OrbitControls(camera, canvas)

//update posisi orbit
orbit.update();


function animate() {
    renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
