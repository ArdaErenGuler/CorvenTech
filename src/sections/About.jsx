import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import FounderCard from '../components/cards/FounderCard';
import { founders, sections } from '../data/site';

export default function About() {
  const { tag, title, description } = sections.about;

  return (
    <Section id="hakkimizda">
      <Reveal>
        <SectionHeader index="04" tag={tag} title={title} description={description} />
      </Reveal>

      <div className="mt-12 grid sm:grid-cols-2">
        {founders.map((founder, index) => (
          <Reveal
            key={founder.id}
            delay={index * 90}
            className="h-full border-t border-line sm:odd:border-r"
          >
            <FounderCard founder={founder} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
