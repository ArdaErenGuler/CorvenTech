import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import { company, contactChannels, navLinks } from '../../data/site';

const externalProps = (channel) => (channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

/** Sade footer: sütun yığını yok; marka solda, bağlantılar tek sırada, altta telif satırı. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{company.description}</p>
          </div>

          <div className="flex flex-col gap-6 lg:items-end">
            <nav aria-label="Alt menü">
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="inline-block py-1 text-sm text-muted transition-colors hover:text-heading"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {contactChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.url}
                    className="inline-flex items-center gap-2 py-1 text-sm font-medium text-accent-light transition-colors hover:text-heading"
                    {...externalProps(channel)}
                  >
                    <Icon name={channel.icon} className="size-4" strokeWidth={2} />
                    {/* Footer'da kısa ad varsa o kullanılır (WhatsApp satırı uzun çağrı metni taşır). */}
                    {channel.shortLabel ?? channel.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. Tüm hakları saklıdır.
          </p>
          <p>{company.motto}</p>
        </div>
      </Container>
    </footer>
  );
}
