import { useEffect, useRef } from 'react';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { company, navLinks } from '../../data/site';

/** Sağdan açılan mobil menü çekmecesi; arka plan tıklaması ve Escape ile kapanır. */
export default function MobileDrawer({ open, onClose, onContact, activeId }) {
  const closeButtonRef = useRef(null);

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
    <div className="fixed inset-0 z-[90] lg:hidden">
      <button
        type="button"
        aria-label="Menüyü kapat"
        onClick={onClose}
        className="animate-fade-in absolute inset-0 w-full bg-ink/75 backdrop-blur-sm"
      />

      <aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
        className="animate-drawer-in absolute inset-y-0 right-0 flex w-[84%] max-w-sm flex-col border-l border-line bg-ink-soft shadow-lg"
      >
        <div className="flex h-20 items-center justify-between border-b border-line px-6">
          <Logo />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Menüyü kapat"
            className="grid size-10 place-items-center rounded-lg border border-line-strong bg-surface-2 text-heading transition-colors hover:border-line-accent"
          >
            <Icon name="x" className="size-5" strokeWidth={2} />
          </button>
        </div>

        <nav aria-label="Mobil menü" className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="divide-y divide-line">
            {navLinks.map((link) => {
              const isActive = activeId === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={onClose}
                    aria-current={isActive ? 'location' : undefined}
                    className={`flex items-center justify-between py-4 text-base font-medium transition-colors ${
                      isActive ? 'text-accent' : 'text-body hover:text-heading'
                    }`}
                  >
                    {link.label}
                    <Icon name="arrow-right" className="size-4 text-accent" />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-line px-6 py-6">
          <Button onClick={onContact} icon="arrow-right" className="w-full">
            Bize Ulaşın
          </Button>
          <p className="mt-5 text-center text-xs text-dim">
            © {new Date().getFullYear()} {company.name}
          </p>
        </div>
      </aside>
    </div>
  );
}
