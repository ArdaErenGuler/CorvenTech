import { useEffect, useState } from 'react';
import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import { navLinks } from '../../data/site';
import useActiveSection from '../../hooks/useActiveSection';
import useScrolled from '../../hooks/useScrolled';

// Hero ('top') da gözlenir; en üste dönüldüğünde hiçbir bağlantı aktif görünmez.
const OBSERVED_IDS = ['top', ...navLinks.map((link) => link.href.slice(1))];

function NavLink({ label, href, active }) {
  return (
    <a
      href={href}
      aria-current={active ? 'location' : undefined}
      className={`relative py-2 text-sm font-medium transition-colors duration-200 hover:text-ink ${
        active ? 'text-ink' : 'text-ink-muted'
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-accent transition-transform duration-200 ${
          active ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </a>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(8);
  const active = useActiveSection(OBSERVED_IDS);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => event.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white transition-colors duration-200 ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <Container className="flex h-18 items-center justify-between">
        <Logo />

        <nav aria-label="Ana menü" className="hidden md:block">
          <ul className="flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink {...link} active={active === link.href.slice(1)} />
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
          className="grid size-10 place-items-center rounded-lg border border-line text-ink transition-colors hover:border-ink md:hidden"
        >
          <Icon name={open ? 'x' : 'menu'} className="size-5" />
        </button>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line md:hidden">
        <Container as="nav" aria-label="Mobil menü" className="py-3">
          <ul className="divide-y divide-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-4 text-base font-medium text-ink"
                >
                  {link.label}
                  <Icon name="arrow-right" className="size-4 text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </header>
  );
}
