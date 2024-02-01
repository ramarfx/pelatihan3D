// main library for WebGL
import * as THREE from 'three'
import { OrbitControls } from
    'three/examples/jsm/controls/OrbitControls'


// canvas
const canvas = document.getElementById('canvas')

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scene = new THREE.Scene()

// bentuk object geometry
const boxGeometry = new THREE.BoxGeometry()

// material untuk style pada object geometry
const boxMaterial = new THREE.MeshBasicMaterial({
    color: 0x00FFFF
})

// mesh untuk menyatukan geometry dan material
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.setY(1);
scene.add(box)

//membuat dataran   
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xA979A9,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI / 2
scene.add(plane)


//membuat bola bola ayam
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000ff
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-10, 5, 0)
scene.add(sphere)

// const geometry = new THREE.CapsuleGeometry( 2, 15, 4, 40 ); 
// const material = new THREE.MeshBasicMaterial( {color: 0xffff} ); 
// const capsule = new THREE.Mesh( geometry, material );
// capsule.position.set(1, 5, 0)
// capsule.rotation.x = Math.PI / 2
// capsule.rotation.z = Math.PI / 2
// scene.add( capsule );


const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// untuk menampilkan grid helper
// const gridHelper = new THREE.GridHelper(30)
// scene.add(gridHelper)

// membuat perspektif kamera
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000,
)
camera.position.set(-10, 30, 30)

// untuk control secara orbit
const orbit = new OrbitControls(camera, canvas)

// update posisi orbit
orbit.update();

// render element
let step = 0
function animate(time) {
    box.rotation.x = time / 100
    box.rotation.y = time / 1000
    renderer.render(scene, camera)

    step += 0.01
    sphere.position.y = 10 * Math.abs(Math.sin(step))
}

renderer.setAnimationLoop(animate)