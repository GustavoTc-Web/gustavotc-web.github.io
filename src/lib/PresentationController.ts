export type PresentationState = 'waiting' | 'playing' | 'paused' | 'finished'

interface PresentationOptions {
  speed: number
  delay: number
  desktopQuery: string
}

const navigationKeys = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar', 'Tab', 'Escape'])

/** A apresentação nunca cancela eventos nativos nem altera a rolagem das âncoras. */
export class PresentationController {
  private state: PresentationState = 'paused'
  private timer: ReturnType<typeof setTimeout> | undefined
  private frame: number | undefined
  private position = 0
  private expectedPosition = 0
  private lastTime = 0
  private readonly reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  private readonly desktop: MediaQueryList
  private readonly cleanup: (() => void)[] = []

  constructor(
    private readonly control: HTMLElement,
    private readonly options: PresentationOptions,
    private readonly onChange: (state: PresentationState) => void,
  ) {
    this.desktop = window.matchMedia(options.desktopQuery)
    const listen = <K extends keyof WindowEventMap>(type: K, handler: (event: WindowEventMap[K]) => void) => {
      window.addEventListener(type, handler, { capture: true, passive: true })
      this.cleanup.push(() => window.removeEventListener(type, handler, true))
    }
    const outsideControl = (event: Event) => !event.composedPath().includes(this.control)
    const interrupt = (event: Event) => { if (outsideControl(event)) this.pause() }

    listen('wheel', () => this.pause())
    listen('touchstart', interrupt)
    listen('pointerdown', interrupt)
    listen('click', interrupt)
    listen('focusin', interrupt)
    listen('keydown', (event) => {
      if (navigationKeys.has(event.key) && outsideControl(event)) this.pause()
    })
    listen('scroll', (event) => {
      // A barra de rolagem e outras rolagens externas podem não emitir pointerdown no DOM.
      if (event.target !== document && event.target !== window) return
      if (this.state === 'waiting' && window.scrollY > 1) this.pause()
      if (this.state === 'playing' && Math.abs(window.scrollY - this.expectedPosition) > 2) this.pause()
    })
    listen('hashchange', () => this.pause())
    listen('resize', () => this.pause())
    listen('blur', () => this.pause())
    listen('pagehide', () => this.pause())

    const onVisibility = () => { if (document.hidden) this.pause() }
    const onPreference = () => { if (this.reducedMotion.matches || !this.desktop.matches) this.pause() }
    document.addEventListener('visibilitychange', onVisibility)
    this.reducedMotion.addEventListener('change', onPreference)
    this.desktop.addEventListener('change', onPreference)
    this.cleanup.push(() => {
      document.removeEventListener('visibilitychange', onVisibility)
      this.reducedMotion.removeEventListener('change', onPreference)
      this.desktop.removeEventListener('change', onPreference)
    })

    if (this.canStartAutomatically()) {
      this.setState('waiting')
      this.timer = setTimeout(() => {
        this.timer = undefined
        if (this.canStartAutomatically()) this.start()
        else this.pause()
      }, options.delay)
    }
  }

  private canStartAutomatically() {
    const focused = document.activeElement
    return this.desktop.matches && !this.reducedMotion.matches && !document.hidden
      && !window.location.hash && window.scrollY <= 1
      && (!focused || focused === document.body || focused === document.documentElement)
  }

  private setState(state: PresentationState) {
    this.state = state
    this.onChange(state)
  }

  private cancelScheduledWork() {
    clearTimeout(this.timer)
    if (this.frame !== undefined) cancelAnimationFrame(this.frame)
    this.timer = undefined
    this.frame = undefined
  }

  private maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
  }

  private tick = (time: number) => {
    if (this.state !== 'playing') return
    // A rolagem nativa pode acontecer antes de seu evento scroll ser entregue.
    // Verifica a posição antes de escrever para nunca desfazer a navegação manual.
    if (Math.abs(window.scrollY - this.expectedPosition) > 2) { this.pause(); return }
    // Sem recuperação brusca de tempo após um quadro muito demorado.
    const elapsed = Math.max(0, Math.min(time - this.lastTime, 64)) / 1_000
    this.lastTime = time
    const end = this.maxScroll()
    this.position = Math.min(end, this.position + this.options.speed * elapsed)
    this.expectedPosition = this.position
    // "instant" é essencial: não herda scroll-behavior:smooth das âncoras.
    window.scrollTo({ top: this.position, left: window.scrollX, behavior: 'instant' })
    if (this.position >= end) {
      this.frame = undefined
      this.setState('finished')
      return
    }
    this.frame = requestAnimationFrame(this.tick)
  }

  start() {
    this.cancelScheduledWork()
    if (document.hidden) { this.setState('paused'); return }
    this.position = window.scrollY
    this.expectedPosition = this.position
    if (this.position >= this.maxScroll() - 1) { this.setState('finished'); return }
    this.lastTime = performance.now()
    this.setState('playing')
    this.frame = requestAnimationFrame(this.tick)
  }

  pause() {
    this.cancelScheduledWork()
    this.setState('paused')
  }

  toggle() {
    if (this.state === 'playing' || this.state === 'waiting') this.pause()
    else this.start()
  }

  destroy() {
    this.cancelScheduledWork()
    this.cleanup.forEach((dispose) => dispose())
  }
}
