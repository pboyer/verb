import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const flatten = ( arr ) => arr.reduce(( acc, val ) => Array.isArray( val ) ? acc.concat( flatten( val ) ) : acc.concat( val ), [])

export class Scene {
  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.set( 0, 0, 5 )

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    this.controls = new OrbitControls( this.camera, this.renderer.domElement )

    this.meshs = []

    const viewerElement = document.getElementById("viewer")
    viewerElement.appendChild( this.renderer.domElement )

    const titleElement = document.getElementById("title")
    titleElement.innerHTML += document.title

    this.controls.update()
  }

  animate() {
    return f => {
      this.controls.update()
      this.renderer.render( this.scene, this.camera )
    }
  }

  render() {
    this.renderer.setAnimationLoop( this.animate() )
  }

  addSurface( surface, material, wireframe = false ) {
    material = material || new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, wireframe, transparent: true, opacity: 0.4 } )

    let mesh = new THREE.Mesh( surface, material )
    this.meshs.push( mesh )
    this.scene.add( mesh )
  }

  addCurve(curve, material) {
    material = material || new THREE.LineBasicMaterial( { linewidth: 2, color: 0xdcdcdc } )

    const line = new THREE.Line( curve, material )

    this.meshs.push( line )
    this.scene.add( line )
  }

  addPoints(points) {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(flatten(points))
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3, false))

    const material = new THREE.PointsMaterial({ size: 0.1, color: 0xffffff })

    const cloud = new THREE.Points(geometry, material)

    this.scene.add(cloud)
  }
}
