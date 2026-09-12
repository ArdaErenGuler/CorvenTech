import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Açık diyalogda Tab dolaşımını kabın içinde tutar ve kapanınca odağı,
 * diyalogu açan elemana geri verir. `containerRef` diyalog kabına bağlanmalıdır.
 */
export default function useFocusTrap(containerRef, open) {
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement;

    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return;
      const container = containerRef.current;
      if (!container) return;

      const items = [...container.querySelectorAll(FOCUSABLE)].filter(
        (element) => element.getClientRects().length > 0,
      );
      if (!items.length) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const outside = !container.contains(active);

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // Tetikleyen eleman hâlâ sayfadaysa odağı ona döndür.
      if (previouslyFocused instanceof HTMLElement && document.contains(previouslyFocused)) {
        previouslyFocused.focus();
      }
    };
  }, [containerRef, open]);
}
