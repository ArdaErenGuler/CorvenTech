import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import VentureCard from '../components/cards/VentureCard';
import { sections, ventures } from '../data/site';

export default function Ventures() {
  return (
    <Section id="girisimlerimiz" tone="band">
      <Reveal>
        <SectionHeader {...sections.ventures} />
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 md:gap-8">
        {ventures.map((venture, index) => (
          <Reveal key={venture.id} delay={index * 120} className="h-full">
            <VentureCard venture={venture} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
