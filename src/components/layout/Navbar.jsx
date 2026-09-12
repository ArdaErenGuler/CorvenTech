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

/** Aktif bölüm, bağlantının solundaki küçük nokta ile gösterilir (altı çizili şerit yok). */
function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={`inline-flex items-center gap-2 py-2 text-[0.93rem] font-medium transition-colors duration-200 hover:text-heading ${
        active ? 'text-heading' : 'text-muted'
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-1.5 rounded-full transition-colors duration-200 ${active ? 'bg-accent' : 'bg-transparent'}`}
      />
      {label}
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
      {/* Sabit yükseklik, bulanıklık yok: kaydırınca yalnızca zemin ve alt çizgi belirir */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
          scrolled ? 'border-line bg-ink' : 'border-transparent bg-transparent'
        }`}
      >
        <Container className="flex h-18 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Ana menü" className="hidden lg:block">
            <ul className="flex items-center gap-7">
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
              className="grid size-11 place-items-center rounded-lg border border-line text-heading transition-colors hover:border-line-accent lg:hidden"
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
