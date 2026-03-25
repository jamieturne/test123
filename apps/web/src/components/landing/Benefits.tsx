'use client';

import { useEffect, useRef, useState } from 'react';
import { FadeUp } from './FadeUp';

const slides = [
  { title: 'Spotlight - слайд 1', src: '/images/1.png' },
  { title: 'Spotlight - слайд 2', src: '/images/2.png' },
  { title: 'Spotlight - слайд 3', src: '/images/3.png' },
  { title: 'Spotlight - слайд 4', src: '/images/4.png' },
  { title: 'Spotlight - слайд 5', src: '/images/5.png' },
];

const AUTO_PLAY_INTERVAL = 5000;

export function Benefits() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopAutoPlay() {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }

  function startAutoPlay() {
    if (isPaused) {
      stopAutoPlay();
      return;
    }
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_INTERVAL);
  }

  function goToSlide(index: number) {
    setCurrentIndex(index);
    startAutoPlay();
  }

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    startAutoPlay();
  }

  function prevSlide() {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startAutoPlay();
  }

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [isPaused]);

  return (
    <section className="py-24 bg-white" id="why">
      <div className="max-w-[1200px] mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium bg-[var(--bg-subtle)] text-[var(--text-secondary)] border border-[var(--border)]">
              О продукте
            </span>
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-4 text-[var(--text-primary)]">
            Про Spotlight
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Узнайте больше о возможностях платформы и преимуществах подключения
          </p>
        </FadeUp>

        <FadeUp>
          <div
            className="relative max-w-[1000px] mx-auto overflow-hidden rounded-[var(--radius-xl)] shadow-card-lg"
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide) => (
                <div key={slide.title} className="w-full flex-shrink-0">
                  <img src={slide.src} alt={slide.title} className="w-full block aspect-[16/9] object-cover" />
                </div>
              ))}
            </div>

            <button
              type="button"
              aria-label="Предыдущий"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-[var(--border)] grid place-items-center hover:border-alfa-red transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Следующий"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur border border-[var(--border)] grid place-items-center hover:border-alfa-red transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full border border-white/70 bg-white/80 px-3 py-2 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <div className="flex items-center gap-1.5">
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    aria-label={`Перейти к ${slide.title}`}
                    onClick={() => goToSlide(index)}
                    className={`h-2 border transition-all ${
                      index === currentIndex
                        ? 'w-6 rounded-md bg-alfa-red border-alfa-red'
                        : 'w-2 rounded-full bg-black/10 border-black/10 hover:bg-black/20'
                    }`}
                  />
                ))}
              </div>

              <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-black/10">
                {!isPaused && (
                  <div
                    key={currentIndex}
                    className="absolute inset-y-0 left-0 rounded-full bg-alfa-red"
                    style={{ animation: `carousel-progress ${AUTO_PLAY_INTERVAL}ms linear forwards` }}
                  />
                )}
              </div>

              <button
                type="button"
                aria-label={isPaused ? 'Запустить автопрокрутку' : 'Поставить автопрокрутку на паузу'}
                onClick={() => setIsPaused((prev) => !prev)}
                className="grid h-7 w-7 place-items-center rounded-full border border-black/10 bg-white text-[var(--text-primary)] hover:bg-[var(--bg-alt)] transition-colors"
              >
                {isPaused ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="8,5 19,12 8,19" />
                  </svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="5" width="4" height="14" />
                    <rect x="14" y="5" width="4" height="14" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </FadeUp>
      </div>

      <style jsx global>{`
        @keyframes carousel-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
