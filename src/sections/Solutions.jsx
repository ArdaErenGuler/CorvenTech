import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import SolutionCard from '../components/cards/SolutionCard';
import { sections, solutions } from '../data/site';

export default function Solutions() {
  return (
    <Section id="cozumlerimiz">
      <Reveal>
        <SectionHeader {...sections.solutions} />
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {solutions.map((solution, index) => (
          <Reveal key={solution.title} delay={(index % 3) * 90} className="h-full">
            <SolutionCard solution={solution} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
