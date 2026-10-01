<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { Terminal, Trash2, CornerDownLeft } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let terminalCtx: gsap.Context | null = null

interface TerminalEntry {
  text: string
  type: 'system' | 'prompt' | 'info' | 'success' | 'error' | 'output'
}

const inputCmd = ref('')
const commandHistory = ref<string[]>([])
const historyIndex = ref(-1)
const terminalOutputRef = ref<HTMLElement | null>(null)

const entries = ref<TerminalEntry[]>([
  { text: 'Jhezriel Jay Barangan (Sodayooo) System Shell [Version 2.4.0]', type: 'system' },
  { text: 'Connected to guest@sodayooo.dpdns.org (Ubuntu 24.04 LTS)', type: 'info' },
  { text: 'Type "help" or click any quick command chip below to explore.', type: 'info' }
])

const quickChips = ['help', 'whoami', 'projects', 'skills', 'ping sodayooo.dpdns.org', 'contact', 'clear']

function scrollToBottom() {
  nextTick(() => {
    if (terminalOutputRef.value) {
      terminalOutputRef.value.scrollTop = terminalOutputRef.value.scrollHeight
    }
  })
}

//One might expect my terminal to be an AI agent in disguise, but nope. It's just a bunch of if-else statements
//Good job peeking through my code though

function executeCommand(rawCommand: string) {
  const cmd = rawCommand.trim()
  if (!cmd) return

  entries.value.push({ text: `soda@workspace:~$ ${cmd}`, type: 'prompt' })
  commandHistory.value.push(cmd)
  historyIndex.value = -1

  const lower = cmd.toLowerCase()

  if (lower === 'help') {
    entries.value.push({
      type: 'output',
      text: `Available Shell Commands:
  • help          - Display this command index
  • whoami        - Student background and developer persona
  • projects      - List all hosted simulators and webapps
  • skills        - Technical programming languages and DevOps tooling
  • ping <host>   - Test network reachability and round-trip time
  • contact       - LinkedIn profile and domain details
  • clear         - Flush terminal scrollback buffer`
    })
  } else if (lower === 'whoami') {
    entries.value.push({
      type: 'success',
      text: `Name: Jhezriel Jay Barangan (Sodayooo)
Computer Engineering Student`
    })
  } else if (lower === 'projects' || lower === 'apps') {
    entries.value.push({
      type: 'output',
      text: `Active Hosted Services:
  [1] NCII-CSS Assessment Lab  -> /challenges/NCII-CSS
  [2] Online Whiteboard         -> /whiteboard
  [3] PostgreSQL Sandbox        -> /challenges/elective2-rdb/midterms/
  [4] Gitea Git Daemon          -> https://git.sodayooo.dpdns.org
  [5] Modded Minecraft Node`
    })
  } else if (lower === 'skills' || lower === 'tech') {
    entries.value.push({
      type: 'output',
      text: `Language & Systems Stack:
  • C++        : Basic Coding Logic and Design
  • Java       : OOP, Data structures and Algorithm
  • Python     : Data Analysis
  • HTML/CSS   : Semantic structures, Tailwind CSS, Vue 3
  • PostgreSQL : Relational schema design, queries
  • Oracle Cloud : Web hosting and services`
    })
  } else if (lower.startsWith('ping')) {
    const host = cmd.split(' ')[1] || 'sodayooo.dpdns.org'
    entries.value.push({
      type: 'info',
      text: `PING ${host} (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=1.84 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=1.92 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=1.79 ms
--- ${host} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss`
    })
  } else if (lower === 'contact' || lower === 'social') {
    entries.value.push({
      type: 'info',
      text: `Network Contacts:
  • LinkedIn : https://www.linkedin.com/in/jhezriel-barangan
  • GitHub   : https://github.com/sodayooo`
    })
  } else if (lower === 'clear') {
    entries.value = []
  } else if (lower.startsWith('sudo')) {
    entries.value.push({ type: 'error', text: 'guest is already granted standard simulation privileges. Root not required.' })
  } else {
    entries.value.push({ type: 'error', text: `zsh: command not found: "${cmd}". Type "help" to view valid commands.` })
  }

  inputCmd.value = ''
  scrollToBottom()
}

function handleKeyDown(e: KeyboardEvent) {
  const history = commandHistory.value
  if (e.key === 'ArrowUp' && history.length > 0) {
    historyIndex.value = historyIndex.value === -1
      ? history.length - 1
      : Math.max(0, historyIndex.value - 1)
    inputCmd.value = history[historyIndex.value] ?? ''
    e.preventDefault()
  } else if (e.key === 'ArrowDown' && history.length > 0 && historyIndex.value !== -1) {
    if (historyIndex.value < history.length - 1) {
      historyIndex.value++
      inputCmd.value = history[historyIndex.value] ?? ''
    } else {
      historyIndex.value = -1
      inputCmd.value = ''
    }
    e.preventDefault()
  }
}

onMounted(() => {
  terminalCtx = gsap.context(() => {
    gsap.from('#terminal .terminal-header-anim', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '#terminal', start: 'top 85%', toggleActions: 'play none none reverse' }
    })
    gsap.from('#terminal .terminal-window-anim', {
      y: 40, opacity: 0, scale: 0.98, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '#terminal .terminal-window-anim', start: 'top 85%', toggleActions: 'play none none reverse' }
    })
  })
})

onUnmounted(() => {
  terminalCtx?.revert()
  terminalCtx = null
})
</script>

<template>
  <section id="terminal" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
    
    <div class="terminal-header-anim space-y-1">
      <div class="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
        <Terminal class="w-4 h-4" />
        <span>Interactive Shell</span>
      </div>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
        Server Terminal Emulator
      </h2>
      <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
        Query project records, run network ping simulations, and inspect developer telemetry via interactive bash console.
      </p>
    </div>

    <!-- Quick Run Command Chips (R-03: min 44px tap targets for mobile) -->
    <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
      <span class="text-[11px] font-mono font-semibold text-slate-400 whitespace-nowrap mr-1 shrink-0">
        Run:
      </span>
      <button 
        v-for="chip in quickChips" 
        :key="chip"
        type="button"
        @click="executeCommand(chip)"
        class="px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-blue-600 hover:text-white text-slate-200 border border-slate-700/60 font-mono text-xs transition-colors cursor-pointer shrink-0 min-h-11 flex items-center justify-center active:scale-95"
      >
        {{ chip }}
      </button>
    </div>

    <!-- Main Terminal Window Container -->
    <div class="terminal-window-anim rounded-2xl border border-slate-800 bg-[#0a0f1d] text-slate-100 shadow-2xl overflow-hidden font-mono text-xs flex flex-col">
      
      <!-- Terminal Header / Titlebar -->
      <div class="bg-[#131b2e] px-4 py-2.5 flex items-center justify-between border-b border-slate-800 select-none">
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 rounded-full bg-rose-500"></div>
          <div class="w-3 h-3 rounded-full bg-amber-500"></div>
          <div class="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span class="text-slate-400 text-xs ml-2">soda@workspace: ~ (bash)</span>
        </div>
        <button 
          type="button" 
          @click="executeCommand('clear')" 
          class="text-slate-400 hover:text-slate-200 p-1 rounded-md text-[11px] flex items-center space-x-1 cursor-pointer min-h-[32px]"
          title="Clear screen"
        >
          <Trash2 class="w-3.5 h-3.5" />
          <span class="hidden sm:inline">Clear</span>
        </button>
      </div>

      <!-- Output Scroll Container -->
      <div 
        ref="terminalOutputRef"
        class="p-4 sm:p-6 space-y-2 h-64 sm:h-72 overflow-y-auto"
      >
        <div 
          v-for="(entry, index) in entries" 
          :key="index"
          class="whitespace-pre-wrap leading-relaxed break-words text-xs sm:text-sm"
          :class="{
            'text-cyan-400 font-bold': entry.type === 'system',
            'text-amber-400 font-bold': entry.type === 'prompt',
            'text-blue-300': entry.type === 'info',
            'text-emerald-400 font-semibold': entry.type === 'success',
            'text-rose-400 font-semibold': entry.type === 'error',
            'text-slate-300': entry.type === 'output'
          }"
        >
          {{ entry.text }}
        </div>
      </div>

      <!-- Interactive Input Form -->
      <form 
        @submit.prevent="executeCommand(inputCmd)"
        class="p-3 bg-[#0d1424] border-t border-slate-800 flex items-center space-x-2"
      >
        <span class="text-emerald-400 font-bold text-xs sm:text-sm flex-shrink-0">
          soda@workspace:~$
        </span>
        <input 
          v-model="inputCmd"
          @keydown="handleKeyDown"
          type="text"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="none"
          spellcheck="false"
          placeholder="Type a command or click a chip above..."
          class="flex-1 bg-transparent border-none text-slate-100 placeholder-slate-500 focus:outline-none text-xs sm:text-sm py-1 min-h-[44px]"
          aria-label="Terminal command input"
        />
        <button 
          type="submit"
          class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-mono text-xs font-bold transition-colors flex items-center space-x-1 flex-shrink-0 cursor-pointer min-h-[44px]"
          aria-label="Execute command"
        >
          <span>Run</span>
          <CornerDownLeft class="w-3.5 h-3.5" />
        </button>
      </form>

    </div>

  </section>
</template>
