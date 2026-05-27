import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { JobtaskIcon } from './iconMap'
import { isJobtaskNuiMessage, type NuiJobtaskPayload } from './nuiTypes'
import { MOCK_SCENARIOS } from './mockScenarios'
import './App.css'

type Visibility = 'hidden' | 'visible' | 'hiding'

const HIDE_MS = 320

function applyInfoPayload(
  prev: { toptext: string; text: string; icon?: string; current: number; max: number },
  data: Extract<NuiJobtaskPayload, { message: 'info' }>,
) {
  return {
    toptext: data.toptext ?? prev.toptext,
    text: data.text ?? prev.text,
    icon: data.icon ?? prev.icon,
    current: data.current !== undefined ? Number(data.current) || 0 : prev.current,
    max: data.max !== undefined ? Math.max(1, Number(data.max) || 1) : prev.max,
  }
}

export default function App() {
  const isDev = import.meta.env.DEV

  const [visibility, setVisibility] = useState<Visibility>('hidden')
  const [panel, setPanel] = useState({
    toptext: 'Job Status',
    text: 'Currently working',
    icon: 'briefcase' as string | undefined,
    current: 0,
    max: 1,
  })

  const lastText = useRef(panel.text)
  const lastTop = useRef(panel.toptext)

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }, [])

  const handlePayload = useCallback(
    (data: NuiJobtaskPayload) => {
      if (data.message === 'close') {
        clearHideTimer()
        setVisibility('hiding')
        hideTimer.current = setTimeout(() => {
          setVisibility('hidden')
          hideTimer.current = null
        }, HIDE_MS)
        return
      }

      clearHideTimer()
      setPanel((p) => {
        const next = applyInfoPayload(
          {
            ...p,
            text: lastText.current,
            toptext: lastTop.current,
          },
          data,
        )
        lastText.current = next.text
        lastTop.current = next.toptext
        return next
      })
      setVisibility('visible')
    },
    [clearHideTimer],
  )

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data
      if (!isJobtaskNuiMessage(data)) return
      handlePayload(data)
    }
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('message', onMessage)
      clearHideTimer()
    }
  }, [handlePayload, clearHideTimer])

  useEffect(() => {
    if (!isDev) return
    document.body.classList.add('dev-backdrop')

    let i = 0
    const tick = () => {
      const payload = MOCK_SCENARIOS[i % MOCK_SCENARIOS.length]
      i += 1
      handlePayload(payload)
    }

    tick()
    const id = window.setInterval(tick, 2800)
    return () => {
      window.clearInterval(id)
      document.body.classList.remove('dev-backdrop')
    }
  }, [isDev, handlePayload])

  const { percent, pill } = useMemo(() => {
    const max = Math.max(1, panel.max)
    const cur = Math.min(Math.max(0, panel.current), max)
    const pct = Math.round((cur / max) * 100)
    return { percent: pct, pill: `${cur}/${max}` }
  }, [panel.current, panel.max])

  const rootClass =
    visibility === 'visible'
      ? 'leftinfo leftinfo--visible'
      : visibility === 'hiding'
        ? 'leftinfo leftinfo--hiding'
        : 'leftinfo'

  return (
    <>
      <div className={rootClass}>
        <div className="leftinfo_panel">
          <div className="leftinfo_header">
            <div className="leftinfo_icon_box">
              <div className="leftinfo_icon">
                <JobtaskIcon name={panel.icon} />
              </div>
            </div>
            <div className="leftinfo_titles">
              <div className="leftinfo_top">{panel.toptext}</div>
              <div className="leftinfo_bottom">{panel.text}</div>
            </div>
            <div className="leftinfo_stat">
              <div className="leftinfo_percent">{percent}%</div>
              <div className="leftinfo_pill">{pill}</div>
            </div>
          </div>
          <div className="leftinfo_track">
            <div className="leftinfo_fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </div>
      {isDev ? (
        <div className="dev-hint">
          npm run dev — mock NUI cycles every 2.8s. Run <code>npm run build</code> in /web to emit
          ../html for FiveM.
        </div>
      ) : null}
    </>
  )
}
