<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

//OHHHHHHHH a fancy background! Credits to benscott.dev for an amazing (and mesmerizing) idea! His code is open source btw

interface Dot {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  isPink: boolean
}

const canvasRef = ref<HTMLCanvasElement | null>(null)

let animationFrameId: number | null = null
let dots: Dot[] = []
let canvasWidth = 0
let canvasHeight = 0
let dpr = 1
let isTabVisible = true

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, inView: true, hasMoved: false }

const DARK_BLUE_RGB = '81, 162, 233'
const DARK_PINK_RGB = '255, 77, 90'
const LIGHT_BLUE_RGB = '37, 99, 235'
const LIGHT_PINK_RGB = '225, 29, 72'

let config = { nb: 420, distance: 65, d_radius: 280 }

function updateConfig(width: number) {
  if (width > 1600)      config = { nb: 460, distance: 70, d_radius: 300 }
  else if (width > 1300) config = { nb: 380, distance: 65, d_radius: 280 }
  else if (width > 1100) config = { nb: 300, distance: 60, d_radius: 250 }
  else if (width > 800)  config = { nb: 220, distance: 52, d_radius: 210 }
  else if (width > 600)  config = { nb: 140, distance: 45, d_radius: 170 }
  else                   config = { nb: 80,  distance: 40, d_radius: 140 }
}

function createDot(): Dot {
  return {
    x: Math.random() * (canvasWidth || window.innerWidth),
    y: Math.random() * (canvasHeight || window.innerHeight),
    vx: (Math.random() - 0.5) * 0.8,
    vy: (Math.random() - 0.5) * 0.8,
    radius: Math.random() * 1.5 + 0.5,
    isPink: Math.random() < 0.2,
  }
}

function syncDots() {
  const target = config.nb

  if (dots.length === 0) {
    for (let i = 0; i < target; i++) dots.push(createDot())
    const first = dots[0]
    if (first) {
      first.radius = 1.8
      first.isPink = false
      first.x = mouse.x
      first.y = mouse.y
    }
  } else if (dots.length < target) {
    while (dots.length < target) dots.push(createDot())
  } else if (dots.length > target) {
    dots.splice(target)
  }

  for (const dot of dots) {
    if (dot.x > canvasWidth) dot.x = Math.random() * canvasWidth
    if (dot.y > canvasHeight) dot.y = Math.random() * canvasHeight
  }
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return

  canvasWidth = window.innerWidth
  canvasHeight = window.innerHeight
  dpr = Math.min(window.devicePixelRatio || 1, 2)

  canvas.width = Math.floor(canvasWidth * dpr)
  canvas.height = Math.floor(canvasHeight * dpr)
  canvas.style.width = `${canvasWidth}px`
  canvas.style.height = `${canvasHeight}px`

  canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)

  updateConfig(canvasWidth)

  if (!mouse.hasMoved) {
    mouse.x = mouse.targetX = canvasWidth / 2
    mouse.y = mouse.targetY = canvasHeight / 2
  }

  syncDots()
}

function onPointerMove(e: PointerEvent) {
  mouse.hasMoved = true
  mouse.inView = true
  mouse.targetX = e.clientX
  mouse.targetY = e.clientY
}

function onPointerLeave() { mouse.inView = false }

function onVisibilityChange() {
  isTabVisible = !document.hidden
  if (isTabVisible && animationFrameId === null) {
    animationFrameId = requestAnimationFrame(render)
  }
}

function render() {
  if (!isTabVisible) { animationFrameId = null; return }

  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  mouse.x += (mouse.targetX - mouse.x) * 0.15
  mouse.y += (mouse.targetY - mouse.y) * 0.15

  const first = dots[0]
  if (first) { first.x = mouse.x; first.y = mouse.y }

  const isDark = document.documentElement.classList.contains('dark')
  const blueRgb = isDark ? DARK_BLUE_RGB : LIGHT_BLUE_RGB
  const pinkRgb = isDark ? DARK_PINK_RGB : LIGHT_PINK_RGB

  ctx.clearRect(0, 0, canvasWidth + 1, canvasHeight + 1)

  const nb = dots.length
  const { distance, d_radius } = config
  const distanceSq = distance * distance

  if (mouse.inView || !mouse.hasMoved) {
    for (let i = 0; i < nb; i++) {
      const d1 = dots[i]
      if (!d1) continue
      const mdx1 = d1.x - mouse.x
      const mdy1 = d1.y - mouse.y
      if (Math.abs(mdx1) > d_radius || Math.abs(mdy1) > d_radius) continue

      for (let j = i + 1; j < nb; j++) {
        const d2 = dots[j]
        if (!d2) continue
        const dx = d1.x - d2.x
        const dy = d1.y - d2.y
        if (Math.abs(dx) >= distance || Math.abs(dy) >= distance) continue
        if (dx * dx + dy * dy >= distanceSq) continue

        const mDist = Math.hypot(mdx1, mdy1)
        if (mDist >= d_radius) continue

        const alpha = Math.max(0, Math.min(0.85, 1 - Math.max(0, mDist / d_radius - 0.3)))
        ctx.beginPath()
        ctx.moveTo(d1.x, d1.y)
        ctx.lineTo(d2.x, d2.y)
        ctx.strokeStyle = `rgba(${blueRgb}, ${alpha.toFixed(3)})`
        ctx.lineWidth = 0.35
        ctx.stroke()
      }
    }
  }

  const maxFadeDist = canvasWidth / 1.7

  for (let i = 0; i < nb; i++) {
    const dot = dots[i]
    if (!dot) continue

    if (i > 0) {
      if (dot.x < 0)           { dot.x = 0;           dot.vx =  Math.abs(dot.vx) }
      else if (dot.x > canvasWidth)  { dot.x = canvasWidth;  dot.vx = -Math.abs(dot.vx) }
      if (dot.y < 0)           { dot.y = 0;           dot.vy =  Math.abs(dot.vy) }
      else if (dot.y > canvasHeight) { dot.y = canvasHeight; dot.vy = -Math.abs(dot.vy) }
      dot.x += dot.vx
      dot.y += dot.vy
    }

    const alpha = Math.max(0.15, Math.min(1, 1 - Math.hypot(dot.x - mouse.x, dot.y - mouse.y) / maxFadeDist))
    ctx.beginPath()
    ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${dot.isPink ? pinkRgb : blueRgb}, ${alpha.toFixed(3)})`
    ctx.fill()
  }

  animationFrameId = requestAnimationFrame(render)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.addEventListener('pointerleave', onPointerLeave)
  document.addEventListener('visibilitychange', onVisibilityChange)
  animationFrameId = requestAnimationFrame(render)
})

onBeforeUnmount(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  window.removeEventListener('resize', resizeCanvas)
  window.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerleave', onPointerLeave)
  document.removeEventListener('visibilitychange', onVisibilityChange)
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none z-0 w-full h-full block"
    aria-hidden="true"
  />
</template>
