export function Footer() {
  return (
    <footer className="py-8 border-t border-[var(--border)] bg-white">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-[13px] text-[var(--text-tertiary)]">2025 АО «Альфа-Банк» / Нейропомощник Spotlight</div>
        <div className="flex gap-6">
          {['Документация', 'CookBook', 'AI Flow', 'Чат поддержки'].map(link => (
            <a key={link} href="#" className="text-[13px] text-[var(--text-tertiary)] no-underline hover:text-[var(--text-primary)] transition-colors">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
