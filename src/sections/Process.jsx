import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import { sections, process } from '../data/site';

export default function Process() {
  const { tag, title, description } = sections.process;

  return (
    <Section id="surec">
      <Reveal>
        <SectionHeader index="03" tag={tag} title={title} description={description} />
      </Reveal>

      {/* Kart yerine ızgara çizgileriyle bölünmüş dört alan (gap-px + zemin rengi) */}
      <ol className="mt-12 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {process.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 70} className="bg-ink">
            <div className="h-full px-6 py-7 lg:px-7">
              <span className="block text-3xl font-extrabold tabular-nums text-accent/35">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
