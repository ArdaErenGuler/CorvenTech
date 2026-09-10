import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import VentureCard from '../components/cards/VentureCard';
import { sections, ventures } from '../data/site';

export default function Ventures() {
  return (
    <Section id="girisimlerimiz" bordered>
      <Reveal>
        <SectionHeader {...sections.ventures} />
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ventures.map((venture, index) => (
          <Reveal
            key={venture.id}
            delay={index * 100}
            // Tablet görünümünde tek kalan son kart tam genişliğe yayılır.
            className="h-full md:last:odd:col-span-2 lg:last:odd:col-span-1"
          >
            <VentureCard venture={venture} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
