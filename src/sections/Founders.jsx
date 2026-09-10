import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import FounderCard from '../components/cards/FounderCard';
import { CARD_STATIC } from '../components/ui/Card';
import { sections, founders } from '../data/site';
import { useUI } from '../context/UIContext';

export default function Founders() {
  const { openModal } = useUI();

  return (
    <Section id="kurucular" tone="band">
      <Reveal>
        <SectionHeader {...sections.founders} />
      </Reveal>

      <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-2">
        {founders.map((founder, index) => (
          <Reveal key={founder.id} delay={index * 120} className="h-full">
            <FounderCard founder={founder} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className={`mx-auto mt-8 flex max-w-4xl flex-col gap-5 p-8 md:flex-row md:items-center md:justify-between ${CARD_STATIC}`}>
          <div>
            <h3 className="font-display text-xl font-bold">Birlikte çalışmak ister misiniz?</h3>
            <p className="mt-1.5 text-sm text-muted">
              Yeni bir ürün fikri, ortak girişim ya da teknik iş birliği için bize yazın.
            </p>
          </div>
          <Button onClick={() => openModal({ type: 'contact', subject: 'İş birliği' })} icon="arrow-right" className="shrink-0">
            İş Birliği Teklif Et
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
