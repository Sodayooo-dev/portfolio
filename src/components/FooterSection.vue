<script setup lang="ts">
import { ref, watch } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { ArrowUp, ExternalLink, Heart } from '@lucide/vue'
import LinkedinIcon from '@/components/icons/LinkedinIcon.vue'
import GithubIcon from '@/components/icons/GithubIcon.vue'

const { scrollTo, scrollProgress } = useSmoothScroll()

const showBackToTop = ref(false)

watch(scrollProgress, (p) => {
  showBackToTop.value = p > 0.05
})
</script>

<template>
  <footer class="border-t border-slate-800 bg-[#060910] py-8 sm:py-10 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
      
      <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2">
        <span class="font-mono font-bold text-slate-200">
          Jhezriel Jay Barangan
        </span>
        <span class="text-blue-400 font-mono">(Sodayooo)</span>
        <span>&bull;</span>
        <span class="font-mono text-slate-400">sodayooo.dpdns.org</span>
      </div>

      <div class="flex flex-wrap items-center justify-center gap-4 font-medium text-xs">
        <a 
          href="https://www.linkedin.com/in/jhezriel-barangan" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hover:text-blue-400 transition-colors flex items-center space-x-1 py-1"
        >
          <LinkedinIcon class="w-3.5 h-3.5 text-blue-600" />
          <span>LinkedIn</span>
        </a>

        <a 
          href="https://github.com/sodayooo" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="hover:text-blue-400 transition-colors flex items-center space-x-1 py-1"
        >
          <GithubIcon class="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>

        <a 
          href="/challenges/NCII-CSS" 
          class="hover:text-blue-400 transition-colors py-1"
        >
          NCII-CSS Lab
        </a>

        <a 
          href="https://sodayooo.dpdns.org/whiteboard" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-blue-400 transition-colors py-1"
        >
          Whiteboard
        </a>

        <a 
          href="https://git.sodayooo.dpdns.org" 
          target="_blank" 
          rel="noopener noreferrer"
          class="hover:text-blue-400 transition-colors py-1"
        >
          Gitea
        </a>
      </div>
    </div>

    <button
      type="button"
      @click="scrollTo('#hero', { offset: 0, duration: 1.4 })"
      class="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-xl border border-blue-400/30 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
      :class="showBackToTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'"
      aria-label="Smooth scroll back to top of page"
      title="Scroll to top"
    >
      <ArrowUp class="w-4 h-4" />
    </button>
  </footer>
</template>
