'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * После перехода между страницами оставляем видимую область сверху
 * (без прокрутки к canvas/видео, которые могли получить фокус).
 */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
