<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { Menu, X, Terminal, Layers, Cpu } from '@lucide/vue'

const { scrollTo, lenis } = useSmoothScroll()

const mobileMenuOpen = ref(false)
const activeSection = ref('hero')

function handleNavClick(target: string) {
  mobileMenuOpen.value = false
  scrollTo(target, { offset: -70 })
}

function closeDropdowns() {
  mobileMenuOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeDropdowns()
}

const isHeaderVisible = ref(false)

function onScroll() {
  const currentY = window.scrollY || (lenis.value?.scroll ?? 0)
  const heroEl = document.getElementById('hero')
  isHeaderVisible.value = heroEl
    ? currentY > 60 || heroEl.getBoundingClientRect().top < -60
    : currentY > 60

  const sectionIds = ['activity', 'terminal', 'tech-stack', 'project-ncii-css', 'projects']
  for (const id of sectionIds) {
    const el = document.getElementById(id)
    if (el) {
      const r = el.getBoundingClientRect()
      if (r.top <= 200 && r.bottom >= 100) {
        activeSection.value = id
        break
      }
    }
  }
}

let unwatchLenis: (() => void) | null = null

onMounted(() => {
  onScroll()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('scroll', onScroll, { passive: true })

  if (lenis.value) {
    lenis.value.on('scroll', onScroll)
  } else {
    unwatchLenis = watch(lenis, (newLenis) => {
      if (newLenis) {
        newLenis.on('scroll', onScroll)
        unwatchLenis?.()
        unwatchLenis = null
      }
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('scroll', onScroll)
  lenis.value?.off('scroll', onScroll)
  unwatchLenis?.()
})
</script>

<template>
  <header 
    class="fixed top-0 inset-x-0 z-50 w-full backdrop-blur-md bg-[#080c14]/90 border-b border-slate-800/80 transition-all duration-300 transform"
    :class="isHeaderVisible ? 'translate-y-0 opacity-100 pointer-events-auto shadow-md' : '-translate-y-full opacity-0 pointer-events-none'"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

      <button 
        type="button"
        @click="handleNavClick('#hero')" 
        class="flex items-center space-x-2.5 text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-blue-600 rounded-lg p-1"
        aria-label="Return to top of page"
      >
        <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs group-hover:scale-105 transition-transform duration-150">
          S
        </div>
        <div class="flex items-center space-x-2">
          <span class="font-mono font-bold text-xs sm:text-sm text-white tracking-tight">
            sodayooo<span class="text-blue-400">.</span>dpdns<span class="text-blue-400">.</span>org
          </span>
        </div>
      </button>

      <nav class="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold text-slate-300" aria-label="Main Navigation">
        <button
          type="button"
          @click="handleNavClick('#projects')"
          class="px-3 py-2 rounded-lg hover:text-blue-400 hover:bg-slate-800/80 transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
          :class="{ 'text-blue-400 bg-slate-800/80': activeSection === 'projects' }"
        >
          <Layers class="w-4 h-4 text-blue-400" />
          <span>Projects</span>
        </button>

        <button
          type="button"
          @click="handleNavClick('#tech-stack')"
          class="px-3 py-2 rounded-lg hover:text-blue-400 hover:bg-slate-800/80 transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
          :class="{ 'text-blue-400 bg-slate-800/80': activeSection === 'tech-stack' }"
        >
          <Cpu class="w-4 h-4 text-emerald-400" />
          <span>Tech Stack</span>
        </button>

        <button
          type="button"
          @click="handleNavClick('#terminal')"
          class="px-3 py-2 rounded-lg hover:text-blue-400 hover:bg-slate-800/80 transition-colors flex items-center space-x-1.5 cursor-pointer min-h-[44px]"
          :class="{ 'text-blue-400 bg-slate-800/80': activeSection === 'terminal' }"
        >
          <Terminal class="w-4 h-4 text-amber-400" />
          <span>CLI Shell</span>
        </button>

      </nav>

      <div class="flex items-center space-x-2 sm:space-x-3">

        <button
          type="button"
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2.5 rounded-xl border border-slate-800 text-slate-300 bg-slate-900 hover:bg-slate-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
          aria-label="Toggle navigation menu"
          :aria-expanded="mobileMenuOpen"
        >
          <X v-if="mobileMenuOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div
      v-if="mobileMenuOpen" 
      class="md:hidden border-t border-slate-800 px-4 py-3 bg-slate-950 shadow-xl space-y-1.5"
    >
      <button 
        type="button"
        @click="handleNavClick('#projects')"
        class="w-full flex items-center space-x-2.5 py-3 px-3.5 rounded-xl text-left text-slate-200 hover:bg-slate-900 text-xs font-semibold min-h-[44px] cursor-pointer"
      >
        <Layers class="w-4 h-4 text-blue-400" />
        <span>Projects</span>
      </button>

      <button 
        type="button"
        @click="handleNavClick('#tech-stack')"
        class="w-full flex items-center space-x-2.5 py-3 px-3.5 rounded-xl text-left text-slate-200 hover:bg-slate-900 text-xs font-semibold min-h-[44px] cursor-pointer"
      >
        <Cpu class="w-4 h-4 text-emerald-400" />
        <span>Tech Stack</span>
      </button>

      <button 
        type="button"
        @click="handleNavClick('#terminal')"
        class="w-full flex items-center space-x-2.5 py-3 px-3.5 rounded-xl text-left text-slate-200 hover:bg-slate-900 text-xs font-semibold min-h-[44px] cursor-pointer"
      >
        <Terminal class="w-4 h-4 text-amber-400" />
        <span>CLI Shell</span>
      </button>
    </div>
  </header>
</template>
