<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = withDefaults(
  defineProps<{
    text?: string
    images?: string[]
  }>(),
  {
    text: 'Achievements',
    images: () => [
      '/projects/ITE_Convention.jpg',
      '/projects/Regcon2025.jpg',
      '/projects/DICT.jpg',
      '/projects/SoftwareDesign.jpg',
      '/projects/DeansList.jpg',
      '/projects/ICTRoadshow.jpg',
      '/projects/Regcon2025-2.jpg',
      '/projects/OJT.jpg',
      '/projects/DICT.jpg',
    ],
  }
)

const sectionRef = ref<HTMLElement | null>(null)
const watermarkWrapRef = ref<HTMLElement | null>(null)
const watermarkTextRef = ref<HTMLElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let animId: number | null = null
let resizeHandler: (() => void) | null = null
let st: ScrollTrigger | null = null
let tlWatermark: gsap.core.Timeline | null = null
let renderer: any = null
let scene: any = null
let camera: any = null
let geometries: any[] = []
let materials: any[] = []
let textures: any[] = []

async function getThree(): Promise<any> {
  if (typeof window !== 'undefined' && (window as any).THREE) {
    return (window as any).THREE
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => resolve((window as any).THREE)
    script.onerror = reject
    document.head.appendChild(script)
  })
}

onMounted(async () => {
  await nextTick()
  if (!canvasRef.value || !watermarkTextRef.value || !wrapRef.value) return

  const THREE = await getThree()
  if (!THREE || !canvasRef.value) return

  st = ScrollTrigger.create({
    trigger: wrapRef.value,
    start: 'top top',
    end: '+=500%',
    pin: true,
    invalidateOnRefresh: true,
  })

  tlWatermark = gsap.timeline({
    scrollTrigger: {
      trigger: wrapRef.value,
      start: 'top top',
      end: '+=500%',
      scrub: true,
      invalidateOnRefresh: true,
    },
    defaults: { ease: 'none' }
  })

  tlWatermark.fromTo(
    watermarkTextRef.value,
    { x: '20%' },
    { x: '-60%' }
  )

  scene = new THREE.Scene()

  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 1.75
  camera.position.y = 0.3
  camera.rotation.z = 2 * Math.PI * 0.01

  const textureLoader = new THREE.TextureLoader()
  const imageList = [...props.images]
  if (imageList.length >= 4) {
    imageList.unshift(imageList[imageList.length - 2]!, imageList[imageList.length - 1]!)
    imageList.splice(imageList.length - 2, 2)
  }

  textures = imageList.map(image => textureLoader.load(image))

  const geometry = new THREE.PlaneGeometry(1, 0.75, 14, 14)
  geometries.push(geometry)

  const uOffset = new THREE.Vector2(0, 0)
  const items: Array<{ mesh: any; index: number }> = []

  const vertexShader = `
    float PI = 3.141592653589793;
    uniform vec2 uOffset;
    varying vec2 vUv;

    vec3 deformationCurve(vec3 position, vec2 uv) {
      position.x = position.x - (sin(uv.y * PI) * uOffset.x);
      return position;
    }

    void main() {
      vUv = uv;
      vec3 newPosition = deformationCurve(position, uv);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `

  const fragmentShader = `
    uniform vec2 uOffset;
    uniform sampler2D uTexture;
    uniform float uAlpha;
    varying vec2 vUv;

    vec3 rgbShift(sampler2D textureImage, vec2 uv, vec2 offset) {
      vec2 rg = texture2D(textureImage, uv).rg;
      float b = texture2D(textureImage, uv + offset).b;
      return vec3(rg, b);
    }

    void main() {
      vec3 color = rgbShift(uTexture, vUv, uOffset);
      gl_FragColor = vec4(color, uAlpha);
    }
  `

  for (let i = 0; i < textures.length; i++) {
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uOffset: { value: uOffset },
        uTexture: { value: textures[i] },
        uAlpha: { value: 1.0 }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
    })
    materials.push(material)

    const mesh = new THREE.Mesh(geometry, material)
    items.push({ mesh, index: i })
    scene.add(mesh)
  }

  renderer = new THREE.WebGLRenderer({ canvas: canvasRef.value, alpha: true, antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  const updateMeshes = () => {
    const width = 1.1
    const wholeWidth = items.length * width
    const progress = st ? st.progress : 0

    items.forEach((item) => {
      item.mesh.position.x = ((width * item.index) - (progress * 10) + (42069 * wholeWidth)) % wholeWidth - 2 * width
      item.mesh.rotation.y = 2 * Math.PI * 0.03
    })
  }

  const render = () => {
    if (st && st.isActive) {
      uOffset.set(st.getVelocity() * 0.00002, 0)
    } else {
      uOffset.set(0, 0)
    }

    updateMeshes()
    renderer.render(scene, camera)
    animId = requestAnimationFrame(render)
  }

  render()

  resizeHandler = () => {
    if (!camera || !renderer) return
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  window.addEventListener('resize', resizeHandler, { passive: true })

  setTimeout(() => {
    ScrollTrigger.refresh()
  }, 250)
})

onUnmounted(() => {
  if (animId !== null) cancelAnimationFrame(animId)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)

  if (st) {
    st.kill()
    st = null
  }
  if (tlWatermark) {
    tlWatermark.kill()
    tlWatermark = null
  }

  geometries.forEach(g => g.dispose())
  materials.forEach(m => m.dispose())
  textures.forEach(t => t.dispose())
  geometries = []
  materials = []
  textures = []

  if (renderer) {
    renderer.dispose()
    renderer = null
  }
})
</script>

<template>
  <section ref="sectionRef" id="gallery-carousel" class="gallery-section relative overflow-visible bg-transparent">
    <div ref="wrapRef" class="carousel-wrap">

      <div ref="watermarkWrapRef" class="watermark-wrap">
        <span ref="watermarkTextRef" class="watermark-text">{{ props.text }}</span>
      </div>

      <canvas ref="canvasRef" class="carousel-canvas" />
    </div>
  </section>
</template>

<style scoped>
.gallery-section {
  width: 100%;
  position: relative;
  background: transparent;
}

.carousel-wrap {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.watermark-wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: transparent;
  pointer-events: none;
  z-index: 10;
}

.watermark-text {
  display: inline-block;
  font-size: 30vw;
  font-family: var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.12);
  text-shadow: 0 0 60px rgba(37, 99, 235, 0.2);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.02em;
  will-change: transform;
}

.carousel-canvas {
  width: 100%;
  height: 100%;
  display: block;
  background: transparent;
  position: relative;
  z-index: 20;
}
</style>
