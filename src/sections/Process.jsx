import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import ProcessStep from '../components/cards/ProcessStep';
import { sections, process } from '../data/site';

export default function Process() {
  return (
    <Section id="surec" tone="band">
      <Reveal>
        <SectionHeader {...sections.process} />
      </Reveal>

      <ol className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {process.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 90} className="h-full list-none">
            <ProcessStep step={step} index={index} isLast={index === process.length - 1} />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
