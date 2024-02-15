// main library for WebGL
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'
import nebula from '../assets/images/nebula.jpg'
import starts from '../assets/images/stars.jpg'
import pejuang from '../assets/images/pejuang.jpg'


// canvas
const canvas = document.getElementById('canvas')

// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true


const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
// scene.background = textureLoader.load(starts)
const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background =  cubeTextureLoader.load([
    pejuang,
    pejuang,
    pejuang,
    pejuang,
    pejuang,
    pejuang,
])

// bentuk object geometry
const boxGeometry = new THREE.BoxGeometry()

// material untuk style pada object geometry
const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0x00FFFF
})

// mesh untuk menyatukan geometry dan material
const box = new THREE.Mesh(boxGeometry, boxMaterial)
box.position.setY(1);
box.castShadow = true
scene.add(box)

//membuat dataran   
const planeGeometry = new THREE.PlaneGeometry(30, 30)
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.receiveShadow = true
scene.add(plane)

plane.rotation.x = Math.PI / 2


//membuat bola bola ayam
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0x0000ff,
    roughness: 1

})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(-10, 5, 0)
sphere.castShadow = true

scene.add(sphere)

// const geometry = new THREE.CapsuleGeometry( 2, 15, 4, 40 ); 
// const material = new THREE.MeshStandardMaterial( {color: 0xffff} ); 
// const capsule = new THREE.Mesh( geometry, material );
// capsule.position.set(1, 2, -10)
// capsule.rotation.x = Math.PI / 2
// capsule.rotation.z = Math.PI / 2
// scene.add( capsule );

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// untuk menampilkan grid helper
const gridHelper = new THREE.GridHelper(30)
scene.add(gridHelper)

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

const gui = new dat.GUI();
const options = {
    sphereColor: '#ff7f50',
    wireframe: false,
    speed: 0.01,
    roughness: 1,
    angle: 0.2,
    penumbra: 0.1,
    intensity: 1000,
}

gui.addColor(options, 'sphereColor').onChange((e) => {
    sphere.material.color.set(e)
})
gui.add(options, 'wireframe').onChange((e) => {
    sphere.material.wireframe = e
})
gui.add(options, 'speed', 0, 100)

gui.add(options, 'roughness', 0.0, 1.0,).onChange((e) => {
    sphere.material.roughness = e;
})

gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'intensity', 0, 1000)


//penerapan cahaya
// const ambientLight = new THREE.AmbientLight(0x333333, 15)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
// directionalLight.position.set(-30, 50, 0)
// scene.add(directionalLight)

// const directionalLight2 = new THREE.DirectionalLight(0xffffff, 3)
// directionalLight2.position.set(30, 50, 0)
// scene.add(directionalLight2)

// const helper = new THREE.DirectionalLightHelper( directionalLight, 5 );
// scene.add( helper );

// const helper2 = new THREE.DirectionalLightHelper( directionalLight2, 5 );
// scene.add( helper2 );

const spotLight = new THREE.SpotLight(0xffffff, 1000);
spotLight.castShadow = true
spotLight.position.set(50, 50, 0)
scene.add(spotLight)

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);




// render element
let step = 0
function animate(time) {
    box.rotation.x = time / 100
    box.rotation.y = time / 1000
    renderer.render(scene, camera)

    step += options.speed
    sphere.position.y = 10 * Math.abs(Math.cos(step))

    spotLightHelper.update()

    spotLight.angle     = options.angle
    spotLight.penumbra  = options.penumbra
    spotLight.intensity = options.intensity
}

renderer.setAnimationLoop(animate)