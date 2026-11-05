import { useEffect } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'

const particles = [
  { x: 8, y: 24, size: 5, depth: 16, delay: 0 },
  { x: 18, y: 72, size: 3, depth: 25, delay: 1.2 },
  { x: 34, y: 39, size: 4, depth: 13, delay: 2.1 },
  { x: 54, y: 16, size: 3, depth: 22, delay: 0.7 },
  { x: 68, y: 78, size: 5, depth: 17, delay: 1.7 },
  { x: 82, y: 32, size: 4, depth: 26, delay: 2.5 },
  { x: 93, y: 67, size: 3, depth: 12, delay: 0.4 },
  { x: 45, y: 88, size: 3, depth: 20, delay: 1.5 },
  { x: 13, y: 48, size: 4, depth: 28, delay: 2.8 },
  { x: 27, y: 14, size: 3, depth: 18, delay: 3.2 },
  { x: 39, y: 61, size: 4, depth: 24, delay: 1.9 },
  { x: 61, y: 49, size: 3, depth: 30, delay: 0.9 },
  { x: 76, y: 87, size: 4, depth: 16, delay: 3.6 },
  { x: 88, y: 15, size: 3, depth: 26, delay: 2.3 },
  { x: 97, y: 47, size: 4, depth: 19, delay: 1.1 },
  { x: 6, y: 85, size: 3, depth: 23, delay: 2.6 },
  { x: 56, y: 93, size: 4, depth: 14, delay: 3.9 },
]

function AmbientParticle({ particle, pointerX, pointerY, reducedMotion }) {
  const x = useTransform(pointerX, [-1, 1], [-particle.depth, particle.depth])
  const y = useTransform(pointerY, [-1, 1], [-particle.depth, particle.depth])
  return (
    <motion.i
      className="cursor-particle"
      style={{ left: `${particle.x}%`, top: `${particle.y}%`, width: particle.size, height: particle.size, x, y }}
      animate={reducedMotion ? undefined : { opacity: [0.18, 0.62, 0.18], scale: [0.8, 1.2, 0.8] }}
      transition={reducedMotion ? undefined : { duration: 5.5 + particle.delay, delay: particle.delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function CursorBackground({ theme }) {
  const reducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springX = useSpring(pointerX, { stiffness: 55, damping: 24, mass: 0.7 })
  const springY = useSpring(pointerY, { stiffness: 55, damping: 24, mass: 0.7 })
  const trailingX = useSpring(pointerX, { stiffness: 24, damping: 20, mass: 1.1 })
  const trailingY = useSpring(pointerY, { stiffness: 24, damping: 20, mass: 1.1 })
  const normalizedXTarget = useMotionValue(0)
  const normalizedYTarget = useMotionValue(0)
  const normalizedX = useSpring(normalizedXTarget, { stiffness: 40, damping: 22 })
  const normalizedY = useSpring(normalizedYTarget, { stiffness: 40, damping: 22 })
  const scanlineX = useTransform(springX, (value) => value * -0.08)
  const orbitRotation = useTransform(normalizedX, [-1, 1], [-38, 38])
  const orbitScale = useTransform(normalizedY, [-1, 1], [0.82, 1.12])

  useEffect(() => {
    const updatePointer = (event) => {
      pointerX.set(event.clientX)
      pointerY.set(event.clientY)
      normalizedXTarget.set((event.clientX / window.innerWidth - 0.5) * 2)
      normalizedYTarget.set((event.clientY / window.innerHeight - 0.5) * 2)
    }
    const centerPointer = () => {
      pointerX.set(window.innerWidth * 0.5)
      pointerY.set(window.innerHeight * 0.45)
    }
    centerPointer()
    if (reducedMotion) return undefined
    window.addEventListener('pointermove', updatePointer, { passive: true })
    window.addEventListener('resize', centerPointer)
    return () => {
      window.removeEventListener('pointermove', updatePointer)
      window.removeEventListener('resize', centerPointer)
    }
  }, [normalizedXTarget, normalizedYTarget, pointerX, pointerY, reducedMotion])

  return (
    <>
    <div className={`interactive-backdrop interactive-backdrop--${theme}`} aria-hidden="true">
      <motion.div className="cursor-aura cursor-aura--wide" style={{ x: springX, y: springY }} />
      <motion.div className="cursor-aura cursor-aura--core" style={{ x: trailingX, y: trailingY }} />
      <div className="cursor-particle-field">
        {particles.map((particle, index) => <AmbientParticle key={index} particle={particle} pointerX={normalizedX} pointerY={normalizedY} reducedMotion={reducedMotion} />)}
      </div>
      <motion.div className="cursor-scanline" style={{ x: scanlineX }} />
    </div>
    <div className="cursor-foreground" aria-hidden="true">
      <motion.div className="cursor-orbit-system" style={{ x: springX, y: springY, rotate: orbitRotation, scale: orbitScale }}>
        <i className="cursor-orbit-ring cursor-orbit-ring--outer" />
        <i className="cursor-orbit-ring cursor-orbit-ring--middle" />
        <i className="cursor-orbit-ring cursor-orbit-ring--inner" />
        <i className="cursor-orbit-marker cursor-orbit-marker--one" />
        <i className="cursor-orbit-marker cursor-orbit-marker--two" />
        <i className="cursor-orbit-marker cursor-orbit-marker--three" />
        <i className="cursor-orbit-center" />
      </motion.div>
    </div>
    </>
  )
}
