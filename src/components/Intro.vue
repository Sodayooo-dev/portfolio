<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

//YEAAAAHHHH fancy scroll animations? these are free templates lol

const props = withDefaults(
  defineProps<{
    videoSrc?: string
  }>(),
  {
    videoSrc: '/projects/P1140574.mp4',
  }
)

const rootRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  nextTick(() => {
    if (!rootRef.value) return

    ctx = gsap.context(() => {
      const video = rootRef.value?.querySelector<HTMLVideoElement>('#video')
      const videoContainer = rootRef.value?.querySelector<HTMLElement>('#video-container')
      const videoOverlay = rootRef.value?.querySelector<HTMLElement>('.video-overlay')
      const overlayCaption = rootRef.value?.querySelector<HTMLElement>('.video-overlay .caption')
      const overlayContent = rootRef.value?.querySelector<HTMLElement>('.video-overlay .content')

      if (video) {
        video.play().catch(() => {})
      }

      const overlay = document.createElement('div')
      overlay.style.position = 'absolute'
      overlay.style.top = '0'
      overlay.style.left = '0'
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.backgroundColor = 'rgba(0,0,0,0)'
      overlay.style.pointerEvents = 'none'
      overlay.style.zIndex = '1'
      if (videoContainer) {
        videoContainer.appendChild(overlay)
      }

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.value?.querySelector('.t2-hero-container'),
          start: 'top top',
          end: 'top+=400 top',
          scrub: 1.2,
        }
      })

      const headerElements = rootRef.value?.querySelectorAll('.header-content > *')
      if (headerElements) {
        headerElements.forEach((element, index) => {
          heroTl.to(
            element,
            {
              rotationX: 90,
              y: -30,
              scale: 0.7,
              opacity: 0,
              filter: 'blur(4px)',
              ease: 'power3.inOut',
              transformOrigin: 'center top'
            },
            index * 0.08
          )
        })
      }

      if (videoContainer && video && videoOverlay && overlayCaption && overlayContent) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rootRef.value?.querySelector('.scroll-container'),
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            onEnter: () => video.play().catch(() => {})
          }
        })

        tl.to(
          videoContainer,
          {
            width: '90vw',
            height: '90vh',
            borderRadius: '0',
            ease: 'expo.out',
            duration: 0.5
          },
          0
        )
          .to(
            video,
            {
              scale: 1.1,
              ease: 'expo.out',
              duration: 0.5
            },
            0
          )
          .to(
            overlay,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              ease: 'power3.inOut',
              duration: 0.5
            },
            0
          )
          .to(
            videoOverlay,
            {
              clipPath: 'inset(0% 0 0 0)',
              backdropFilter: 'blur(8px)',
              ease: 'expo.out',
              duration: 0.3
            },
            0.4
          )
          .to(
            overlayCaption,
            {
              transform: 'translateY(0)',
              ease: 'expo.out',
              duration: 0.3
            },
            0.45
          )
          .to(
            overlayContent,
            {
              filter: 'blur(0px)',
              transform: 'scale(1)',
              ease: 'expo.out',
              duration: 0.4
            },
            0.45
          )
      }

      const quoteTexts = rootRef.value?.querySelectorAll('.footer-content p')
      if (quoteTexts) {
        quoteTexts.forEach((text) => {
          gsap.from(text, {
            scrollTrigger: {
              trigger: text,
              start: 'top 85%',
              end: 'top 70%',
              scrub: 1.2
            },
            y: 15,
            filter: 'blur(5px)',
            ease: 'expo.out'
          })
        })
      }
    }, rootRef.value ?? undefined)

    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 200)
  })
})

onUnmounted(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <div ref="rootRef" class="template2-wrapper">
    <div class="container t2-hero-container">
      <div class="header-content">
        <h1 class="title">Sodayooo.dpdns.org</h1>
        <h2 class="subtitle">Developer Portfolio</h2>
        <div class="date">{2026}</div>
        <div class="credits">
          <p>Have an idea for a project?</p>
          <p>Contact me: sodayooo.dev@gmail.com</p>
        </div>
      </div>
    </div>

    <div class="scroll-container">
      <div class="video-wrapper">
        <div id="video-container">
          <video id="video" loop muted playsinline autoplay preload="auto">
            <source :src="props.videoSrc" type="video/mp4">
          </video>
          <div class="video-overlay">
            <div class="caption"></div>
            <div class="content">
              <h2>Self-hosted Projects</h2>
              <p>From development to deployment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.template2-wrapper {
  --color-offwhite: #ffffff;
  --color-offblack: #080c14;
  --color-offblack-transparent: rgba(8, 12, 20, 0.65);
  --color-overlay-dark: rgba(0, 0, 0, 0.4);
  --font-main: "Inter", sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --transition-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  font-family: var(--font-main);
  color: #ffffff;
  letter-spacing: -0.02em;
  font-weight: 700;
  position: relative;
  background: transparent;
  width: 100%;
}

.container {
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  perspective: 800px;
  background: transparent;
  text-align: center;
  margin: 0 auto;
}

.header-content {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform-style: preserve-3d;
}

.header-content > * {
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform-origin: center top;
}

.title {
  margin-bottom: 1.25rem;
  font-size: 2.75rem;
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -0.02em;
  text-align: center;
  width: 100%;
}

.subtitle {
  margin-bottom: 2.5rem;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: #e2e8f0;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-align: center;
  width: 100%;
}

.date {
  margin: 2rem 0;
  font-size: 1rem;
  font-family: var(--font-mono);
  color: #60a5fa;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-align: center;
  width: 100%;
}

.credits {
  margin-top: 2.5rem;
  text-transform: uppercase;
  font-size: 0.85rem;
  font-family: var(--font-mono);
  color: #cbd5e1;
  letter-spacing: 0.08em;
  text-align: center;
  width: 100%;
}

.credits p {
  margin: 0.2rem 0;
}

.scroll-container {
  position: relative;
  height: 300vh;
  background: transparent;
  width: 100%;
}

.video-wrapper {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background: transparent;
}

#video-container {
  width: 300px;
  height: 300px;
  overflow: hidden;
  background-color: var(--color-offblack);
  position: relative;
  transition: border-radius 0.3s ease;
  filter: blur(0px);
  clip-path: inset(0 0 0 0);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
}

#video-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s ease;
  pointer-events: none;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
  z-index: 0;
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-offblack-transparent);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 2rem;
  clip-path: inset(100% 0 0 0);
  backdrop-filter: blur(8px);
  z-index: 2;
}

.video-overlay .caption {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
  transform: translateY(30px);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  position: absolute;
  top: 2.5rem;
  left: 0;
  width: 100%;
  text-align: center;
  color: #38bdf8;
  font-weight: 700;
}

.video-overlay .content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100%;
  filter: blur(10px);
  transform: scale(1.1);
  opacity: 1;
}

.video-overlay h2 {
  font-size: 2.6rem;
  margin-bottom: 0.75rem;
  transform: translateY(30px);
  text-transform: uppercase;
  color: #ffffff;
  font-weight: 800;
  letter-spacing: -0.01em;
  text-align: center;
}

.video-overlay p {
  font-size: 1.25rem;
  line-height: 1.8;
  max-width: 36ch;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1rem;
  transform: translateY(30px);
  color: #f1f5f9;
  text-align: center;
}


@media (max-width: 768px) {
  .title {
    font-size: 1.85rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .video-overlay h2 {
    font-size: 1.75rem;
  }

  .video-overlay p {
    font-size: 1rem;
  }

  .quote {
    font-size: 1.05rem;
  }
}
</style>
