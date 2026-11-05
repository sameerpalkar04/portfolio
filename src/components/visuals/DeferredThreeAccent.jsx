import { lazy, Suspense, useEffect, useRef, useState } from 'react'

const ThreeAccent = lazy(() => import('./ThreeAccent.jsx'))

export default function DeferredThreeAccent({ variant, theme, className = '' }) {
  const hostRef = useRef(null)
  const [nearViewport, setNearViewport] = useState(false)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    if (typeof IntersectionObserver === 'undefined') {
      setNearViewport(true)
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNearViewport(true)
        observer.disconnect()
      }
    }, { rootMargin: '160px' })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className={`three-accent-slot ${className}`} aria-hidden="true">
      {nearViewport && <Suspense fallback={null}><ThreeAccent variant={variant} theme={theme} /></Suspense>}
    </div>
  )
}
