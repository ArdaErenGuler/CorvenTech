import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import { sections, solutions } from '../data/site';

export default function Solutions() {
  const { tag, title, description } = sections.solutions;

  return (
    <Section id="cozumlerimiz">
      <Reveal>
        <SectionHeader index="02" tag={tag} title={title} description={description} />
      </Reveal>

      {/* Kart yok: iki sütunlu, çizgiyle ayrılmış liste */}
      <div className="mt-12 grid md:grid-cols-2 md:gap-x-16">
        {solutions.map((solution, index) => (
          <Reveal key={solution.title} delay={(index % 2) * 80}>
            <div className="flex gap-4 border-t border-line py-6">
              <Icon name={solution.icon} className="mt-0.5 size-5 shrink-0 text-accent" />
              <div>
                <h3 className="text-lg font-bold">{solution.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{solution.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
