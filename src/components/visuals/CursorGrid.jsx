import { useEffect, useRef } from 'react'

const GRID_SIZE = 72
const GRID_FADE_MS = 700

export default function CursorGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const cells = new Map()
    let frame = 0
    let width = 0
    let height = 0
    let pixelRatio = 1

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      width = bounds.width
      height = bounds.height
      canvas.width = Math.round(width * pixelRatio)
      canvas.height = Math.round(height * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const onPointerMove = (event) => {
      if (event.pointerType === 'touch') return
      const bounds = canvas.getBoundingClientRect()
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) return
      const column = Math.floor(event.clientX / GRID_SIZE)
      const row = Math.floor(event.clientY / GRID_SIZE)
      cells.set(`${column}:${row}`, { column, row, litAt: performance.now() })
      if (!frame) frame = requestAnimationFrame(draw)
    }

    function draw(now) {
      frame = 0
      const bounds = canvas.getBoundingClientRect()
      context.clearRect(0, 0, width, height)
      const light = canvas.closest('.site-shell')?.classList.contains('theme-light')
      const color = light ? '39, 143, 128' : '54, 181, 160'
      let hasActiveCells = false

      for (const [key, cell] of cells) {
        const progress = (now - cell.litAt) / GRID_FADE_MS
        if (progress >= 1) {
          cells.delete(key)
          continue
        }
        hasActiveCells = true
        const alpha = (1 - progress) * 0.68
        const tileX = cell.column * GRID_SIZE - bounds.left + 1
        const tileY = cell.row * GRID_SIZE - bounds.top + 1
        context.fillStyle = `rgba(${color}, ${alpha})`
        context.fillRect(tileX, tileY, GRID_SIZE - 2, GRID_SIZE - 2)
        context.strokeStyle = `rgba(${color}, ${Math.min(alpha + 0.22, 0.9)})`
        context.lineWidth = 1.5
        context.strokeRect(tileX + 0.75, tileY + 0.75, GRID_SIZE - 3.5, GRID_SIZE - 3.5)
      }

      if (hasActiveCells) frame = requestAnimationFrame(draw)
    }

    resize()
    const observer = new ResizeObserver(resize)
    observer.observe(canvas.parentElement)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-grid" aria-hidden="true" />
}
