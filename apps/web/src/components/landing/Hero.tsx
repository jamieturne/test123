'use client';

import { FadeUp } from './FadeUp';
import { SpotlightWidget } from './SpotlightWidget';
import { SplineScene } from '@/components/ui/splite';

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-16 overflow-hidden bg-white" id="about">
      <div className="absolute inset-0 z-0">
        <div
          className="absolute -top-[30%] -right-[20%] w-[800px] h-[800px] rounded-full animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(239,49,36,0.06) 0%, transparent 70%)', animationDuration: '8s' }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[600px] h-[600px] rounded-full animate-pulse"
          style={{ background: 'radial-gradient(circle, rgba(177,163,255,0.06) 0%, transparent 70%)', animationDuration: '10s', animationDirection: 'reverse' }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(3,3,6,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(3,3,6,0.03) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 100%)',
          }}
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10 w-full">
        {/* Two-column: text left, robot right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          {/* Left: text content */}
          <div className="flex-1 lg:pr-8">
            <h1 className="text-[clamp(36px,5vw,60px)] font-extrabold tracking-tight leading-[1.08] mb-5 text-[var(--text-primary)]">
              Ваш продукт —<br/>навык{' '}
              <span className="bg-gradient-to-br from-alfa-red to-[#FF6B5A] bg-clip-text text-transparent">Нейропомощника</span>
            </h1>
            <p className="text-[clamp(16px,2vw,19px)] text-[var(--text-secondary)] leading-relaxed mb-9 max-w-xl">
              Клиент вводит запрос в&nbsp;строку Spotlight прямо в&nbsp;интернет-банке —
              AI понимает, находит нужный продукт и&nbsp;выполняет действие.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#roadmap" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] text-base font-semibold no-underline bg-alfa-red text-white shadow-[0_4px_24px_rgba(239,49,36,0.25)] hover:bg-alfa-red-hover hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(239,49,36,0.35)] transition-all">
                Подключить свой продукт
              </a>
              <a href="#demo" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] text-base font-semibold no-underline bg-transparent text-[var(--text-primary)] border border-[var(--border-hover)] hover:bg-[var(--bg-subtle)] hover:-translate-y-0.5 transition-all">
                Смотреть демо
              </a>
            </div>
          </div>

          {/* Right: 3D Robot */}
          <div className="flex-1 relative h-[500px] w-full">
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Spotlight widget below */}
        <FadeUp>
          <SpotlightWidget />
        </FadeUp>

        <div className="mt-12 flex gap-4 flex-wrap justify-center">
          <a href="#roadmap" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] text-base font-semibold no-underline bg-alfa-red text-white shadow-[0_4px_24px_rgba(239,49,36,0.25)] hover:bg-alfa-red-hover hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(239,49,36,0.35)] transition-all">
            Подключить свой продукт
          </a>
          <a href="#demo" className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-[14px] text-base font-semibold no-underline bg-transparent text-[var(--text-primary)] border border-[var(--border-hover)] hover:bg-[var(--bg-subtle)] hover:-translate-y-0.5 transition-all">
            Смотреть демо
          </a>
        </div>
      </div>
    </section>
  );
}
