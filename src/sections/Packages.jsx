import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { packages, sections } from '../data/site';
import { useUI } from '../context/UIContext';

/**
 * Ayraçlar hücre kenarlığıyla kurulur (ebeveyn zemini + gap-px hilesiyle değil):
 * hücre giriş animasyonunda saydamken arkada açık renkli bir zemin kalmaz.
 */
const CELL = 'flex h-full flex-col border-t border-line px-6 py-8 lg:border-r lg:px-7 lg:last:border-r-0';

export default function Packages() {
  const { tag, title, description, note } = sections.packages;
  const { openModal } = useUI();

  return (
    <Section id="paketler">
      <Reveal>
        <SectionHeader index="04" tag={tag} title={title} description={description} />
      </Reveal>

      <div className="mt-12 grid lg:grid-cols-3">
        {packages.map((pack, index) => (
          <Reveal key={pack.id} delay={index * 80} className={CELL}>
            <div className="flex items-center gap-3">
              <Icon name={pack.icon} className="size-5 shrink-0 text-accent" />
              <h3 className="text-lg font-bold">{pack.name}</h3>
              {pack.featured && (
                <Badge size="sm" className="ml-auto shrink-0">
                  Önerilen
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm text-muted">{pack.tagline}</p>

            <ul className="mt-6 mb-8 flex flex-col gap-3">
              {pack.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.5} />
                  <span className="text-sm leading-relaxed text-body">{item}</span>
                </li>
              ))}
            </ul>

            <p className="mt-auto border-t border-line pt-4 text-xs leading-relaxed text-dim">{pack.footnote}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-sm leading-relaxed text-muted">{note}</p>
        <Button onClick={() => openModal({ type: 'contact' })} icon="arrow-right" className="self-start sm:self-auto">
          Teklif Alın
        </Button>
      </Reveal>
    </Section>
  );
}
