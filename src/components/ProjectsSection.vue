<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { projects } from '@/data/projects'
import { 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  ArrowRight
} from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const archContainerRef = ref<HTMLElement | null>(null)
const archRightRef = ref<HTMLElement | null>(null)

let mm: gsap.MatchMedia | null = null

function setupScrollAnimations() {
  if (!archContainerRef.value || !archRightRef.value) return

  const wrappers = archRightRef.value.querySelectorAll<HTMLElement>('.img-wrapper')
  const infoItems = archContainerRef.value.querySelectorAll<HTMLElement>('.arch__info')

  wrappers.forEach((el, index) => {
    el.style.zIndex = (wrappers.length - index).toString()
  })

  mm = gsap.matchMedia()

  mm.add("(min-width: 769px)", () => {
    const firstWrap = wrappers[0]
    if (firstWrap) {
      gsap.set(firstWrap, {
        opacity: 1,
        y: 0,
        scale: 1,
        pointerEvents: "auto",
      })
    }

    const initialImgs = archRightRef.value!.querySelectorAll<HTMLElement>('.card-img')
    if (initialImgs.length > 0 && initialImgs[0]) {
      gsap.set(initialImgs[0], { y: 0, scale: 1 })
      for (let i = 1; i < initialImgs.length; i++) {
        const img = initialImgs[i]
        if (img) gsap.set(img, { y: 15, scale: 1.04 })
      }
    }

    for (let i = 1; i < wrappers.length; i++) {
      const wrap = wrappers[i]
      if (wrap) {
        gsap.set(wrap, {
          opacity: 0,
          y: 30,
          scale: 0.95,
          pointerEvents: "none",
        })
      }
    }

    infoItems.forEach((item, i) => {
      gsap.set(item, {
        opacity: i === 0 ? 1 : 0.25,
      })
    })

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: archContainerRef.value,
        start: "top 80px",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
      }
    })

    const stepDuration = 1.2
    const dwellDuration = 1.0

    mainTimeline.to({}, { duration: dwellDuration })

    for (let i = 0; i < wrappers.length - 1; i++) {
      const curWrap = wrappers[i]
      const nxtWrap = wrappers[i + 1]
      if (!curWrap || !nxtWrap) continue

      const curImg = curWrap.querySelector('.card-img')
      const nxtImg = nxtWrap.querySelector('.card-img')
      const curInfo = infoItems[i]
      const nxtInfo = infoItems[i + 1]

      const step = gsap.timeline()

      step.to(curWrap, {
        y: -30,
        scale: 0.95,
        opacity: 0,
        duration: stepDuration,
        ease: "power2.inOut",
        pointerEvents: "none",
      }, 0)

      if (curImg) {
        step.to(curImg, {
          y: -15,
          scale: 1.04,
          duration: stepDuration,
          ease: "power2.inOut",
        }, 0)
      }

      step.to(nxtWrap, {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: stepDuration,
        ease: "power2.inOut",
        pointerEvents: "auto",
      }, 0)

      if (nxtImg) {
        step.to(nxtImg, {
          y: 0,
          scale: 1,
          duration: stepDuration,
          ease: "power2.inOut",
        }, 0)
      }

      if (curInfo) {
        step.to(curInfo, {
          opacity: 0.25,
          duration: stepDuration,
          ease: "power2.inOut",
        }, 0)
      }

      if (nxtInfo) {
        step.to(nxtInfo, {
          opacity: 1,
          duration: stepDuration,
          ease: "power2.inOut",
        }, 0)
      }

      mainTimeline.add(step)

      mainTimeline.to({}, { duration: i === wrappers.length - 2 ? 1.6 : dwellDuration })
    }
  })

  mm.add("(max-width: 768px)", () => {
    gsap.set(wrappers, {
      clearProps: "all",
    })
    const initialImgs = archRightRef.value?.querySelectorAll<HTMLElement>('.card-img')
    if (initialImgs) {
      gsap.set(initialImgs, { clearProps: "all" })
    }
    infoItems.forEach((item) => {
      gsap.set(item, { clearProps: "all" })
    })

    const mobileCards = archContainerRef.value?.querySelectorAll('.mobile-project-card')
    mobileCards?.forEach((card) => {
      gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      })
    })
  })
}

onMounted(() => {
  nextTick(() => {
    setupScrollAnimations()
    setTimeout(() => {
      ScrollTrigger.refresh()
    }, 250)
  })
})

onUnmounted(() => {
  if (mm) {
    mm.revert()
    mm = null
  }
})
</script>

<template>
  <section id="projects" class="relative py-12 sm:py-16">
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 text-center">
      <div class="max-w-3xl mx-auto space-y-2 flex flex-col items-center text-center">
        <div class="inline-flex items-center space-x-2 text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
          <Layers class="w-4 h-4" />
          <span>Pinned Project Showcase</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-center">
          Featured Webapps &amp; Labs
        </h2>
        <p class="text-xs sm:text-sm text-slate-300 leading-relaxed text-center max-w-xl">
          Explore currently deployed webapps and self-hosted projects.
        </p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div ref="archContainerRef" class="arch flex flex-col md:flex-row gap-8 lg:gap-14 justify-between relative items-start">
        
        <div class="arch__left flex flex-col flex-1 min-w-0">
          
          <div 
            v-for="(project, index) in projects" 
            :key="project.id"
            :id="`project-${project.id}`"
            class="arch__info min-h-auto md:min-h-screen flex flex-col justify-center py-10 md:py-16 space-y-5"
            :class="{ 'pb-36 md:pb-52': index === projects.length - 1 }"
          >
            <div class="content max-w-xl space-y-4">

              <div class="flex items-center space-x-3">
                <span class="font-mono text-xs font-bold text-slate-400">
                  0{{ index + 1 }} / 04
                </span>
              </div>

              <div>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {{ project.title }}
                </h3>
                <p class="text-xs sm:text-sm font-mono text-blue-400 mt-1">
                  {{ project.tagline }}
                </p>
              </div>

              <p class="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {{ project.description }}
              </p>

              <div class="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 space-y-1.5 text-xs">
                <div class="font-mono font-bold text-slate-200 flex items-center space-x-1.5">
                  <Cpu class="w-3.5 h-3.5 text-blue-400" />
                  <span>Architecture &amp; Engine</span>
                </div>
                <p class="text-slate-400 text-[11px] leading-relaxed">
                  {{ project.architecture }}
                </p>
              </div>

              <div class="space-y-2 pt-1">
                <div class="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Core Features
                </div>
                <ul class="grid grid-cols-1 gap-1.5 text-xs text-slate-300">
                  <li 
                    v-for="feat in project.keyFeatures" 
                    :key="feat"
                    class="flex items-start space-x-2"
                  >
                    <CheckCircle2 class="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                    <span class="text-[11px] sm:text-xs">{{ feat }}</span>
                  </li>
                </ul>
              </div>

              <div class="flex flex-wrap gap-1.5 pt-2">
                <span 
                  v-for="tag in project.tags" 
                  :key="tag"
                  class="px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700"
                >
                  {{ tag }}
                </span>
              </div>

            </div>

            <div class="md:hidden pt-4 pb-8 mobile-project-card">
              <div 
                class="rounded-2xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg"
                :style="{ borderColor: project.accentBorder }"
              >
                <div class="h-48 sm:h-56 relative overflow-hidden bg-slate-900">
                  <img 
                    :src="project.image" 
                    :alt="project.imageAlt"
                    class="w-full h-full object-cover object-center" 
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none"></div>
                  <div class="absolute bottom-3 left-3 right-3 text-white font-mono text-xs flex justify-between items-center pointer-events-none">
                    <span class="font-bold truncate">{{ project.title }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div ref="archRightRef" class="arch__right hidden md:flex flex-1 max-w-135 lg:max-w-145 sticky top-20 h-[calc(100vh-5rem)] self-start flex-col justify-center">
          
          <div 
            v-for="(project, index) in projects" 
            :key="project.id"
            :data-index="projects.length - index"
            class="img-wrapper absolute rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900"
            :style="{ zIndex: projects.length - index }"
          >
            <img 
              :src="project.image" 
              :alt="project.imageAlt"
              class="card-img w-full h-full object-cover object-center will-change-transform"
              loading="lazy"
            />

            <div class="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-black/40 pointer-events-none"></div>

            <div class="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span class="px-2.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/10 text-slate-200 font-mono text-[11px] font-bold shadow-sm">
                0{{ index + 1 }} / 04
              </span>
            </div>

            <div class="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-white/10 text-white flex items-center justify-between shadow-lg">
              <div class="min-w-0 pr-3">
                <h4 class="font-bold text-xs sm:text-sm truncate text-white">{{ project.title }}</h4>
              </div>
              <a 
                v-if="project.available"
                :href="project.url" 
                :target="project.isExternal ? '_blank' : '_self'"
                :rel="project.isExternal ? 'noopener noreferrer' : ''"
                class="shrink-0 px-3.5 py-2 rounded-lg text-xs font-bold text-white flex items-center space-x-1.5 hover:brightness-110 active:scale-95 transition-all shadow-xs cursor-pointer min-h-11"
                :style="{ backgroundColor: project.accentColor }"
              >
                <span>Launch</span>
                <ExternalLink v-if="project.isExternal" class="w-3.5 h-3.5" />
                <ArrowRight v-else class="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>

  </section>
</template>

<style scoped>
.arch {
  margin-inline: auto;
  align-items: flex-start;
}

@media (min-width: 769px) {
  .arch__left {
    min-width: 340px;
  }

  .arch__right {
    position: sticky;
    top: 5rem;
    height: calc(100vh - 5rem);
    align-self: flex-start;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .arch__right .img-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 100%;
    height: 440px;
    max-height: 75vh;
  }
}
</style>
