import { useEffect, useState } from 'react';

/** Sayfa `offset` pikselden fazla kaydırıldığında `true` döner. */
export default function useScrolled(offset = 0) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return scrolled;
}
