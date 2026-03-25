import { FadeUp } from './FadeUp';

const slides = [
  { title: 'Spotlight - слайд 1', src: '/images/1.png' },
  { title: 'Spotlight - слайд 2', src: '/images/2.png' },
  { title: 'Spotlight - слайд 3', src: '/images/3.png' },
  { title: 'Spotlight - слайд 4', src: '/images/4.png' },
  { title: 'Spotlight - слайд 5', src: '/images/5.png' },
];

export function Benefits() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {slides.map((slide, i) => (
            <FadeUp key={slide.title} delay={i * 0.08} className="rounded-[var(--radius-lg)] overflow-hidden shadow-card border border-[var(--border)]">
              <img src={slide.src} alt={slide.title} className="w-full aspect-[16/9] object-cover block" />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
