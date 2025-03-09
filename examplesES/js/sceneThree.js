import * as THREE from 'three'

export class Scene {
  constructor () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.camera.position.z = 5

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )

    this.meshs = []

    const viewerElement = document.getElementById("viewer");
    viewerElement.appendChild( this.renderer.domElement );

    const titleElement = document.getElementById("title");
    titleElement.innerHTML += document.title;
  }

  animate() {
    return f => {
      if (this.meshs.length) {
        this.meshs.forEach(( mesh ) => {
          mesh.rotation.x += 0.005
          mesh.rotation.y += 0.005
        })
      }
      this.renderer.render( this.scene, this.camera )
    }
  }

  render() {
    this.renderer.setAnimationLoop( this.animate() )
  }

  addSurface( surface, material, wireframe = true ) {
    material = material || new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.DoubleSide, wireframe: false } )

    let mesh = new THREE.Mesh( surface, material )
    this.meshs.push( mesh )
    this.scene.add( mesh )

    if (wireframe) {
      const material2 = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide, wireframe: true } )
      const mesh2 = new THREE.Mesh( surface, material2 )
      this.meshs.push( mesh2 )
      this.scene.add( mesh2 )
    }
  }

  addCurve(curve, material) {
    material = material || new THREE.LineBasicMaterial( { linewidth: 2, color: 0xdcdcdc } )

    const line = new THREE.Line( curve, material )

    this.meshs.push( line )
    this.scene.add( line )
  }
}
