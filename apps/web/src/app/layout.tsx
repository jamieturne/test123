import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import { ScrollToTop } from '@/components/ScrollToTop';

const inter = Inter({ subsets: ['latin', 'cyrillic'], variable: '--font-inter' });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Нейропомощник Spotlight — Альфа Бизнес',
  description: 'AI-ассистент в интернет-банке. Подключите свой продукт к Нейропомощнику.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const runtimeApiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || '';

  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APP_CONFIG__ = ${JSON.stringify({ API_URL: runtimeApiUrl })};`,
          }}
        />
        <AuthProvider>
          <ScrollToTop />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
