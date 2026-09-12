import { useState } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import VentureRow from '../components/cards/VentureRow';
import { sections, ventureFilters, ventures } from '../data/site';

const countOf = (filterId) =>
  filterId === 'all' ? ventures.length : ventures.filter((venture) => venture.type === filterId).length;

export default function Ventures() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? ventures : ventures.filter((venture) => venture.type === filter);
  const { tag, title, description } = sections.ventures;

  return (
    <Section id="girisimlerimiz" divider={false}>
      <Reveal>
        <SectionHeader index="01" tag={tag} title={title} description={description} />
      </Reveal>

      {/* Sola dayalı, tek kapsül içinde bölmeli filtre */}
      <Reveal delay={80}>
        <div
          role="group"
          aria-label="Girişimleri filtrele"
          className="mt-10 inline-flex flex-wrap rounded-lg border border-line p-1"
        >
          {ventureFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`rounded px-3.5 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active ? 'bg-accent text-ink' : 'text-muted hover:text-heading'
                }`}
              >
                {item.label}
                <span className={`ml-2 tabular-nums ${active ? 'text-ink/60' : 'text-dim'}`}>{countOf(item.id)}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <ul className="mt-8 border-t border-line">
        {visible.map((venture, index) => (
          <Reveal as="li" key={venture.id} delay={index * 70}>
            <VentureRow venture={venture} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
