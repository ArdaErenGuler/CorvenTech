import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import SolutionItem from '../components/cards/SolutionItem';
import { sections, solutions } from '../data/site';

export default function Solutions() {
  const { cta, ...header } = sections.solutions;

  return (
    <Section id="cozumlerimiz" bordered>
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <SectionHeader {...header} align="left" />
            <Button href={cta.href} variant="outline" icon="arrow-right" className="mt-8">
              {cta.label}
            </Button>
          </Reveal>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:col-span-7">
          {solutions.map((solution, index) => (
            <Reveal as="li" key={solution.title} delay={index * 80}>
              <SolutionItem solution={solution} index={index} />
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
