<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Lightbulb } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let disclaimCtx: gsap.Context | null = null

onMounted(() => {
  disclaimCtx = gsap.context(() => {
    gsap.from('.disclaimer-anim', {
      y: 25,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.disclaimer-anim',
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      }
    })
  })
})

onUnmounted(() => {
  if (disclaimCtx) {
    disclaimCtx.revert()
    disclaimCtx = null
  }
})
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <div class="disclaimer-anim rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
      <div class="p-3 rounded-xl bg-blue-950/70 text-blue-400 flex-shrink-0">
        <Lightbulb class="w-5 h-5" />
      </div>
      <div class="space-y-1 text-xs sm:text-sm">
        <h3 class="font-bold text-white">
          Learning Journey &amp; Development Note
        </h3>
        <p class="text-slate-400 leading-relaxed text-xs">
          As a student and self-taught programmer, I fully disclose the use of AI tools in creating my projects. This helps me build better while also learning better. I only use AI as a tool and a guide and not as a way to build things for me.
        </p>
      </div>
    </div>
  </section>
</template>
