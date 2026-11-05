import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'

function makeParticles(count, minRadius, maxRadius) {
  const positions = new Float32Array(count * 3)
  let seed = 17
  const random = () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
  for (let index = 0; index < count; index += 1) {
    const y = random() * 2 - 1
    const angle = random() * Math.PI * 2
    const radius = minRadius + random() * (maxRadius - minRadius)
    const ring = Math.sqrt(1 - y * y) * radius
    positions[index * 3] = Math.cos(angle) * ring
    positions[index * 3 + 1] = y * radius
    positions[index * 3 + 2] = Math.sin(angle) * ring
  }
  return positions
}

function makeGlowTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  const gradient = context.createRadialGradient(64, 64, 2, 64, 64, 62)
  gradient.addColorStop(0, 'rgba(231, 247, 70, .5)')
  gradient.addColorStop(0.28, 'rgba(210, 239, 42, .2)')
  gradient.addColorStop(1, 'rgba(210, 239, 42, 0)')
  context.fillStyle = gradient
  context.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(canvas)
}

export default function ThreeAccent({ variant = 'orb', theme = 'dark' }) {
  const hostRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
    } catch {
      return undefined
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setSize(host.clientWidth, host.clientHeight, false)
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, host.clientWidth / Math.max(host.clientHeight, 1), 0.1, 30)
    camera.position.z = variant === 'orb' ? 4.1 : 5.2
    const accent = theme === 'light' ? 0x78970b : 0xe3ef26
    const root = new THREE.Group()
    scene.add(root)
    let haloMaterial = null
    let haloSprite = null
    let outerParticles = null
    const orbitRings = []

    if (variant === 'orb') {
      const globeCore = new THREE.Mesh(
        new THREE.SphereGeometry(0.98, 32, 24),
        new THREE.MeshBasicMaterial({ color: theme === 'light' ? 0xe3eabf : 0x11140a, transparent: true, opacity: 0.78 }),
      )
      root.add(globeCore)

      const globeGrid = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(1.015, 20, 14)),
        new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.34 }),
      )
      root.add(globeGrid)

      const facetShell = new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.045, 2),
        new THREE.MeshBasicMaterial({ color: accent, wireframe: true, transparent: true, opacity: 0.31 }),
      )
      root.add(facetShell)

      const surfacePoints = new THREE.BufferGeometry()
      surfacePoints.setAttribute('position', new THREE.BufferAttribute(makeParticles(260, 1.02, 1.04), 3))
      root.add(new THREE.Points(surfacePoints, new THREE.PointsMaterial({ color: accent, size: 0.018, transparent: true, opacity: 0.82, sizeAttenuation: true, blending: THREE.AdditiveBlending })))

      const ringSpecs = [
        { radius: 1.3, tube: 0.009, rotation: [0.85, 0.15, -0.42], opacity: 0.8 },
        { radius: 1.43, tube: 0.006, rotation: [-0.38, 0.72, 0.58], opacity: 0.55 },
        { radius: 1.57, tube: 0.004, rotation: [1.1, -0.58, 0.17], opacity: 0.3 },
      ]
      ringSpecs.forEach(({ radius, tube, rotation, opacity }) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(radius, tube, 6, 144),
          new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity }),
        )
        ring.rotation.set(...rotation)
        root.add(ring)
        orbitRings.push(ring)
      })

      const orbitGeometry = new THREE.BufferGeometry()
      orbitGeometry.setAttribute('position', new THREE.BufferAttribute(makeParticles(110, 1.72, 2.05), 3))
      outerParticles = new THREE.Group()
      outerParticles.add(new THREE.Points(orbitGeometry, new THREE.PointsMaterial({ color: accent, size: 0.022, transparent: true, opacity: 0.7, sizeAttenuation: true, blending: THREE.AdditiveBlending })))
      scene.add(outerParticles)

      haloMaterial = new THREE.SpriteMaterial({ map: makeGlowTexture(), color: accent, transparent: true, opacity: 0.36, depthWrite: false, blending: THREE.AdditiveBlending })
      haloSprite = new THREE.Sprite(haloMaterial)
      haloSprite.position.z = -1.1
      haloSprite.scale.set(4.8, 4.8, 1)
      scene.add(haloSprite)
    } else {
      const nodes = [
        [-1.35, 0.7, 0], [-0.7, 1.15, 0.15], [0.08, 0.9, -0.12], [0.92, 1.12, 0.1], [1.4, 0.45, -0.08],
        [-1.2, -0.08, -0.16], [-0.4, 0.05, 0.18], [0.48, 0.1, -0.05], [1.18, -0.25, 0.2],
        [-0.92, -0.92, 0.06], [-0.1, -0.82, -0.18], [0.72, -0.94, 0.12], [1.42, -0.82, -0.06],
      ]
      const lines = [[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[2,7],[3,7],[4,8],[5,6],[6,7],[7,8],[5,9],[6,9],[6,10],[7,10],[7,11],[8,11],[8,12],[9,10],[10,11],[11,12]]
      const linePositions = []
      for (const [from, to] of lines) linePositions.push(...nodes[from], ...nodes[to])
      const lineGeometry = new THREE.BufferGeometry()
      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
      root.add(new THREE.LineSegments(lineGeometry, new THREE.LineBasicMaterial({ color: accent, transparent: true, opacity: 0.42 })))
      const nodeGeometry = new THREE.BufferGeometry()
      nodeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodes.flat(), 3))
      root.add(new THREE.Points(nodeGeometry, new THREE.PointsMaterial({ color: accent, size: 0.065, transparent: true, opacity: 0.8, sizeAttenuation: true })))
      const moteGeometry = new THREE.BufferGeometry()
      moteGeometry.setAttribute('position', new THREE.BufferAttribute(makeParticles(42, 1.65, 2.15), 3))
      outerParticles = new THREE.Group()
      outerParticles.add(new THREE.Points(moteGeometry, new THREE.PointsMaterial({ color: accent, size: 0.025, transparent: true, opacity: 0.52, sizeAttenuation: true })))
      scene.add(outerParticles)
    }

    let active = true
    let frameId = 0
    let targetX = 0
    let targetY = 0
    let smoothX = 0
    let smoothY = 0
    const handlePointer = (event) => {
      if (reducedMotion) return
      const bounds = host.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        targetX = 0
        targetY = 0
        return
      }
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      targetY = x * (variant === 'orb' ? 1.25 : 0.7)
      targetX = -y * (variant === 'orb' ? 0.95 : 0.55)
    }
    window.addEventListener('pointermove', handlePointer, { passive: true })

    const resize = () => {
      if (!host.clientWidth || !host.clientHeight) return
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight, false)
      renderer.render(scene, camera)
    }
    window.addEventListener('resize', resize)

    let idleRotation = 0
    const render = () => {
      if (!active || reducedMotion) return
      smoothX += (targetX - smoothX) * 0.055
      smoothY += (targetY - smoothY) * 0.055
      idleRotation += variant === 'orb' ? 0.002 : 0.001
      root.rotation.y = idleRotation + smoothY * 0.8
      root.rotation.x += (smoothX * 0.6 - root.rotation.x) * 0.06
      root.rotation.z += (smoothY * 0.12 - root.rotation.z) * 0.04
      root.scale.setScalar(1 + Math.min(Math.hypot(smoothX, smoothY), 1) * 0.035)
      orbitRings.forEach((ring, index) => {
        ring.rotation.z += (index % 2 === 0 ? 1 : -1) * (0.0007 + index * 0.00025)
      })
      if (outerParticles) {
        outerParticles.rotation.y -= 0.0013
        outerParticles.rotation.x += 0.00045
      }
      if (haloMaterial && haloSprite) {
        const cursorEnergy = Math.min(Math.hypot(smoothX, smoothY), 1)
        haloMaterial.opacity = 0.25 + cursorEnergy * 0.22 + (Math.sin(idleRotation * 2.8) + 1) * 0.035
        haloSprite.position.x += (smoothY * 0.42 - haloSprite.position.x) * 0.025
        haloSprite.position.y += (smoothX * 0.32 - haloSprite.position.y) * 0.025
      }
      renderer.render(scene, camera)
      frameId = window.requestAnimationFrame(render)
    }

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(([entry]) => {
          active = entry.isIntersecting
          if (!active) {
            window.cancelAnimationFrame(frameId)
            frameId = 0
          } else if (reducedMotion) {
            renderer.render(scene, camera)
          } else if (!frameId) {
            frameId = window.requestAnimationFrame(render)
          }
        }, { threshold: 0.01 })
      : null
    observer?.observe(host)
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    resizeObserver?.observe(host)

    if (reducedMotion) renderer.render(scene, camera)
    else frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', handlePointer)
      window.removeEventListener('resize', resize)
      observer?.disconnect()
      resizeObserver?.disconnect()
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => { material.map?.dispose(); material.dispose() })
        else if (object.material) { object.material.map?.dispose(); object.material.dispose() }
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [reducedMotion, theme, variant])

  return <div ref={hostRef} className={`three-accent three-accent--${variant}`} aria-hidden="true" />
}
