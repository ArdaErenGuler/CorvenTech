import Container from '../ui/Container';
import Logo from '../ui/Logo';
import { company, navLinks } from '../../data/site';

const COLUMN_TITLE = 'text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted';
const FOOTER_LINK = 'text-ink transition-colors hover:text-ink-muted';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{company.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-20">
            <div>
              <h2 className={COLUMN_TITLE}>Menü</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={FOOTER_LINK}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={COLUMN_TITLE}>İletişim</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a href={`mailto:${company.email}`} className={FOOTER_LINK}>
                    {company.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Tüm hakları saklıdır.
          </p>
          <p>{company.motto}</p>
        </div>
      </Container>
    </footer>
  );
}
