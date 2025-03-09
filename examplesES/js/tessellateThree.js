import * as THREE from 'three'

const flatten = ( arr ) => arr.reduce(( acc, val ) => Array.isArray( val ) ? acc.concat( flatten( val ) ) : acc.concat( val ), [])

export function tessellateSurface( surface ) {

  const tess = surface.tessellate()

  const coords = new Float32Array( flatten(tess.points) )
  const indices = flatten( tess.faces )

  const geometry = new THREE.BufferGeometry()

  geometry.setIndex( indices )
  geometry.setAttribute( 'position', new THREE.BufferAttribute( coords, 3, false ) )

  //geometry.center()
  geometry.scale( 0.1, 0.1, 0.1 )

  return geometry
}

export function tessellateCurve( curve ) {
  const points = curve.tessellate()

  const coords = new Float32Array( flatten(points) )

  const geometry = new THREE.BufferGeometry()

  geometry.setAttribute( 'position', new THREE.BufferAttribute( coords, 3, false ) )

  geometry.scale( 0.25, 0.25, 0.25 )

  return geometry
}


