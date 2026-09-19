import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { simplex3d } from './noise.glsl.js'

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
uniform float uFreq;
uniform float uPointer;

varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisp;

${simplex3d}

void main() {
  float slow = uTime * 0.22;
  float n1 = snoise(position * uFreq + vec3(0.0, slow, slow * 0.6));
  float n2 = snoise(position * uFreq * 2.3 + vec3(slow * 1.4, 0.0, 0.0));
  float disp = n1 * uAmp + n2 * uAmp * 0.33 + uPointer * 0.06;

  vDisp = disp;
  vNormal = normalize(normalMatrix * normal);

  vec3 displaced = position + normal * disp;
  vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
  vViewPos = mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const fragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
uniform float uTime;

varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisp;

void main() {
  vec3 viewDir = normalize(-vViewPos);
  float facing = clamp(dot(normalize(vNormal), viewDir), 0.0, 1.0);
  float fresnel = pow(1.0 - facing, 2.6);

  float t = clamp(vDisp * 1.7 + 0.5, 0.0, 1.0);

  // Dark body, hot rim. Keeping the core near-black is what stops the blob
  // blowing out to a pale mass and swallowing the headline in front of it.
  vec3 body = mix(uColorA, uColorB, t) * 0.34;
  vec3 rim = mix(uColorB, uColorC, 0.15 + 0.3 * t);

  vec3 color = body + rim * pow(fresnel, 2.2) * 0.95;
  color += pow(fresnel, 8.0) * 0.22;

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}
`

export default function Blob({ scrollRef }) {
  const mesh = useRef()
  const shell = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.2 },
      uFreq: { value: 1.35 },
      uPointer: { value: 0 },
      uColorA: { value: new THREE.Color('#150420') },
      uColorB: { value: new THREE.Color('#8a1391') },
      uColorC: { value: new THREE.Color('#ff7a3d') },
    }),
    [],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const scroll = scrollRef?.current ?? 0
    const { x, y } = state.pointer

    uniforms.uTime.value = t
    uniforms.uPointer.value += (Math.hypot(x, y) - uniforms.uPointer.value) * 0.05
    // The blob calms down and shrinks as the hero scrolls away.
    uniforms.uAmp.value += (0.18 + scroll * 0.35 - uniforms.uAmp.value) * 0.05

    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.12
      mesh.current.rotation.x += (y * 0.28 - mesh.current.rotation.x) * 0.04
      mesh.current.rotation.z += (-x * 0.2 - mesh.current.rotation.z) * 0.04
      const s = 1 - scroll * 0.35
      mesh.current.scale.setScalar(s)
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.07
      shell.current.rotation.x += delta * 0.03
      shell.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.02 - scroll * 0.3)
    }
  })

  return (
    <group>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[0.88, 42]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
        />
      </mesh>

      {/* wireframe shell — gives the blob an engineered, deliberate edge */}
      <mesh ref={shell} scale={1.5}>
        <icosahedronGeometry args={[0.88, 2]} />
        <meshBasicMaterial
          color="#d7e2ea"
          wireframe
          transparent
          opacity={0.11}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
