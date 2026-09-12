import { useEffect, useState } from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import Button from '../ui/Button';
import MobileDrawer from './MobileDrawer';
import { navLinks } from '../../data/site';
import { useUI } from '../../context/UIContext';
import useActiveSection from '../../hooks/useActiveSection';
import useScrolled from '../../hooks/useScrolled';

// Hero ('top') da gözlenir; en üste dönüldüğünde hiçbir bağlantı aktif görünmez.
const OBSERVED_IDS = ['top', ...navLinks.map((link) => link.href.slice(1))];

function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={`relative py-2 text-[0.93rem] font-medium transition-colors duration-200 hover:text-heading ${
        active ? 'text-heading' : 'text-muted'
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-300 ease-out-expo ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </a>
  );
}

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrolled(24);
  const active = useActiveSection(OBSERVED_IDS);
  const { openModal } = useUI();

  // Masaüstü genişliğine geçilirse açık kalmış çekmeceyi kapat.
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => event.matches && setDrawerOpen(false);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const openContact = () => {
    setDrawerOpen(false);
    openModal({ type: 'contact' });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,padding,box-shadow,backdrop-filter] duration-300 ease-out-expo ${
          scrolled
            ? 'border-line bg-ink/85 py-3 shadow-md backdrop-blur-xl'
            : 'border-transparent bg-transparent py-5'
        }`}
      >
        <Container className="flex items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink {...link} active={active === link.href.slice(1)} />
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* Dar ekranda gizlenir; oradaki karşılığı mobil çekmecedeki düğmedir.
                Gizleme sarmalayıcıda yapılır: Button'ın kendi inline-flex sınıfı "hidden"ı ezerdi. */}
            <span className="hidden sm:block">
              <Button onClick={openContact} size="sm" icon="arrow-right">
                Bize Ulaşın
              </Button>
            </span>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              aria-label="Menüyü aç"
              className="grid size-11 place-items-center rounded-lg border border-line-strong bg-surface-2 text-heading transition-colors hover:border-line-accent lg:hidden"
            >
              <Icon name="menu" className="size-5" strokeWidth={2} />
            </button>
          </div>
        </Container>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onContact={openContact}
        activeId={active}
      />
    </>
  );
}
