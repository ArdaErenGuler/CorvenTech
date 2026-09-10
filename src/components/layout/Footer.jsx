import Container from '../ui/Container';
import Logo from '../ui/Logo';
import Icon from '../ui/Icon';
import { company, contactChannels, navLinks, ventures } from '../../data/site';
import { useUI } from '../../context/UIContext';

const COLUMN_TITLE = 'font-display text-sm font-bold text-heading';
const FOOTER_LINK = 'text-sm text-muted transition-colors hover:text-heading';

const externalProps = (channel) => (channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {});

export default function Footer() {
  const { openModal } = useUI();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-soft">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">{company.description}</p>
            <div className="mt-6 flex gap-3">
              {contactChannels.map((channel) => (
                <a
                  key={channel.id}
                  href={channel.url}
                  aria-label={channel.label}
                  title={channel.label}
                  className="grid size-10 place-items-center rounded-full border border-line bg-surface-2 text-muted transition-colors hover:border-line-accent hover:text-accent"
                  {...externalProps(channel)}
                >
                  <Icon name={channel.icon} className="size-4" strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className={COLUMN_TITLE}>Girişimler</h2>
            <ul className="mt-5 space-y-3">
              {ventures.map((venture) => (
                <li key={venture.id}>
                  <button
                    type="button"
                    onClick={() => openModal({ type: 'venture', id: venture.id })}
                    className={FOOTER_LINK}
                  >
                    {venture.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className={COLUMN_TITLE}>Hızlı Bağlantılar</h2>
            <ul className="mt-5 space-y-3">
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
            <ul className="mt-5 space-y-3">
              {contactChannels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.url}
                    className="inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-light"
                    {...externalProps(channel)}
                  >
                    <Icon name={channel.icon} className="size-4" strokeWidth={2} />
                    {channel.value}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => openModal({ type: 'contact' })}
                  className={`${FOOTER_LINK} inline-flex items-center gap-1.5 font-medium`}
                >
                  Bize ulaşın
                  <Icon name="arrow-right" className="size-3.5" strokeWidth={2} />
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-sm text-dim sm:flex-row sm:items-center sm:justify-between">
          <p className="font-medium text-muted">
            © {year} {company.name}. Tüm hakları saklıdır.
          </p>
          <p>{company.motto}</p>
        </div>
      </Container>
    </footer>
  );
}
