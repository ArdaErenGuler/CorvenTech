import { useEffect, useRef } from 'react';
import Icon from './Icon';
import useFocusTrap from '../../hooks/useFocusTrap';

const SIZES = {
  md: 'max-w-xl',
  lg: 'max-w-3xl',
};

/**
 * Erişilebilir diyalog kabuğu: Escape ve dış tıklama ile kapanır, açıkken sayfa kaydırmasını kilitler,
 * odağı kapat düğmesine taşır ve kapanınca tetikleyen elemana geri verir.
 */
export default function Modal({ open, onClose, labelledBy, size = 'md', children }) {
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  // Tab dolaşımını pencere içinde tutar, kapanınca odağı açan elemana döndürür.
  useFocusTrap(dialogRef, open);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-lg sm:p-6"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`animate-modal-in relative flex max-h-[90vh] w-full flex-col rounded-2xl border border-line-strong bg-surface shadow-lg inset-shadow-highlight ${SIZES[size]}`}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Kapat"
          className="absolute top-5 right-5 z-10 grid size-9 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Icon name="x" className="size-4" strokeWidth={2} />
        </button>

        {/* Kaydırma iç kapta: kapat düğmesi içerikle birlikte yukarı kaymaz */}
        <div className="overflow-y-auto overscroll-contain p-7 sm:p-9">{children}</div>
      </div>
    </div>
  );
}
