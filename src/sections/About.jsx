import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import FounderCard from '../components/cards/FounderCard';
import { founders, sections } from '../data/site';

export default function About() {
  return (
    <Section id="hakkimizda">
      <Reveal>
        <SectionHeader {...sections.about} />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        {founders.map((founder, index) => (
          <Reveal key={founder.id} delay={index * 120} className="h-full">
            <FounderCard founder={founder} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
