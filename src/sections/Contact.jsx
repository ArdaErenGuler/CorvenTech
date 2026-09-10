import Section from '../components/ui/Section';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import { company, sections } from '../data/site';
import { useUI } from '../context/UIContext';

function InfoTag({ icon, children }) {
  return (
    <li className="inline-flex items-center gap-2 rounded-lg border border-accent-border bg-accent-subtle px-3 py-1.5 text-sm text-accent-light">
      <Icon name={icon} className="size-4 text-accent" strokeWidth={2} />
      {children}
    </li>
  );
}

/** İletişim kartı: sol tarafta bilgi ve etiketler, sağda eylem düğmeleri. */
export default function Contact() {
  const { tag, title, description } = sections.contact;
  const { openModal } = useUI();
  const github = company.social.find((item) => item.id === 'github');

  return (
    <Section id="iletisim" padding="tightTop">
      <Reveal>
        <div className="grid gap-10 rounded-2xl border border-line-strong bg-surface p-8 shadow-md inset-shadow-highlight md:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <Badge icon="mail">{tag}</Badge>
            <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{title}</h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">{description}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              <InfoTag icon="mail">{company.email}</InfoTag>
              <InfoTag icon="map-pin">{company.location}</InfoTag>
              {github && <InfoTag icon="github">{github.url.replace('https://', '')}</InfoTag>}
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
            <Button href={`mailto:${company.email}`} variant="secondary" icon="mail" className="sm:flex-1 lg:flex-none">
              E-posta Gönder
            </Button>
            <Button onClick={() => openModal({ type: 'contact' })} icon="arrow-right" className="sm:flex-1 lg:flex-none">
              İletişim Formu
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
