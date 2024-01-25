import * as THREE from 'three'

//canvas
const canvas = document.getElementById('canvas')

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const scene = new THREE.Scene()
