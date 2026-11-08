import { Check, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { presentationConfig, presentationLabels as labels } from '../data/presentation'
import { PresentationController, type PresentationState } from '../lib/PresentationController'

export function PresentationControl() {
  const [state, setState] = useState<PresentationState>('paused')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const controllerRef = useRef<PresentationController | null>(null)
  const enabled = state === 'playing' || state === 'waiting'
  const Icon = state === 'finished' ? Check : enabled ? Pause : Play

  useEffect(() => {
    if (!buttonRef.current) return
    const controller = new PresentationController(buttonRef.current, presentationConfig, setState)
    controllerRef.current = controller
    return () => { controller.destroy(); controllerRef.current = null }
  }, [])

  return <div className="presentation-control" data-state={state}>
    <button ref={buttonRef} type="button" aria-label={enabled ? labels.pause : labels.start} aria-pressed={enabled} aria-describedby="presentation-status" onClick={() => controllerRef.current?.toggle()}>
      <span className="presentation-icon"><Icon size={15} aria-hidden="true" /></span>
      <span><span className="presentation-title">{labels.title}</span><span id="presentation-status" role="status" aria-live="polite">{labels[state]}</span></span>
      <span className="presentation-speed" aria-hidden="true">{state === 'playing' ? `${presentationConfig.speed} px/s` : enabled ? 'AUTO' : 'MANUAL'}</span>
    </button>
  </div>
}
