'use client';

import { useState } from 'react';
import { FadeUp } from './FadeUp';

const slides = [
  { title: 'Spotlight - слайд 1', src: '/images/1.png' },
  { title: 'Spotlight - слайд 2', src: '/images/2.png' },
  { title: 'Spotlight - слайд 3', src: '/images/3.png' },
  { title: 'Spotlight - слайд 4', src: '/images/4.png' },
  { title: 'Spotlight - слайд 5', src: '/images/5.png' },
];

export function Benefits() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToSlide(index: number) {
    setCurrentIndex(index);
  }

  function nextSlide() {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }

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
          <div className="relative max-w-[1000px] mx-auto">
            <div className="overflow-hidden rounded-[var(--radius-xl)] shadow-card-lg">
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
            </div>

            <button
              type="button"
              aria-label="Предыдущий"
              onClick={prevSlide}
              className="absolute left-2 md:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur border border-[var(--border)] grid place-items-center hover:border-alfa-red transition-colors shadow-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="Следующий"
              onClick={nextSlide}
              className="absolute right-2 md:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/95 backdrop-blur border border-[var(--border)] grid place-items-center hover:border-alfa-red transition-colors shadow-card"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div className="mt-4 mx-auto w-fit flex items-center gap-3 rounded-full border border-white/70 bg-white/90 px-3 py-2 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
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
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
