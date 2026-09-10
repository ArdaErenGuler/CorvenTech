import { useEffect, useState } from 'react';

/**
 * Ekranın ortasındaki bölümün id'sini döner (navbar'da aktif bağlantıyı işaretlemek için).
 * `ids` dizisi bileşen dışında sabit tanımlanmalıdır.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
