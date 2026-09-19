import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

/* Three tilted orbit rings — cheap geometry, expensive-looking depth. */
export default function Rings({ scrollRef }) {
  const group = useRef()

  useFrame((state, delta) => {
    if (!group.current) return
    const scroll = scrollRef?.current ?? 0
    group.current.rotation.z += delta * 0.05
    group.current.rotation.x = 1.02 + state.pointer.y * 0.12 + scroll * 0.4
    group.current.rotation.y = state.pointer.x * 0.2
  })

  const rings = [
    { r: 1.45, color: '#b600a8', opacity: 0.45, tube: 0.005 },
    { r: 1.8, color: '#7621b0', opacity: 0.32, tube: 0.004 },
    { r: 2.2, color: '#d7e2ea', opacity: 0.07, tube: 0.003 },
  ]

  return (
    <group ref={group}>
      {rings.map((ring, i) => (
        <mesh key={ring.r} rotation={[i * 0.16, i * 0.22, 0]}>
          <torusGeometry args={[ring.r, ring.tube, 8, 160]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={ring.opacity}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}
