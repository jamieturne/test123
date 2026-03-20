'use client'

import type { Application } from '@splinetool/runtime'
import { Suspense, lazy, useEffect, useRef } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null)

  // Canvas Spline попадает в tab order и при загрузке может получить фокус —
  // браузер тогда прокручивает страницу вниз. Убираем из порядка табуляции.
  useEffect(() => {
    const root = wrapRef.current
    if (!root) return

    const stripCanvasTabIndex = () => {
      root.querySelectorAll('canvas').forEach((canvas) => {
        canvas.setAttribute('tabindex', '-1')
        canvas.setAttribute('aria-hidden', 'true')
      })
    }

    stripCanvasTabIndex()
    const obs = new MutationObserver(stripCanvasTabIndex)
    obs.observe(root, { childList: true, subtree: true })
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={wrapRef}
      className={className}
      tabIndex={-1}
      style={{ outline: 'none' }}
    >
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center min-h-[200px]">
            <span className="loader" />
          </div>
        }
      >
        <Spline
          scene={scene}
          className="w-full h-full"
          onLoad={(app: Application) => {
            // По умолчанию события только над canvas — робот «теряет» курсор.
            // Глобально: следим за мышью по всей странице (как в редакторе Spline).
            app.setGlobalEvents(true)
          }}
        />
      </Suspense>
    </div>
  )
}
