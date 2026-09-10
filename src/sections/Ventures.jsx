import { useState } from 'react';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import VentureCard from '../components/cards/VentureCard';
import { sections, ventureFilters, ventures } from '../data/site';

const countOf = (filterId) =>
  filterId === 'all' ? ventures.length : ventures.filter((venture) => venture.type === filterId).length;

export default function Ventures() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? ventures : ventures.filter((venture) => venture.type === filter);

  return (
    <Section id="girisimlerimiz" tone="band">
      <Reveal>
        <SectionHeader {...sections.ventures} />
      </Reveal>

      <Reveal delay={80}>
        <div role="group" aria-label="Girişimleri filtrele" className="mt-10 flex flex-wrap justify-center gap-2">
          {ventureFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(item.id)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  active
                    ? 'border-accent bg-accent text-ink'
                    : 'border-line-strong bg-surface-2 text-muted hover:border-line-accent hover:text-heading'
                }`}
              >
                {item.label}
                <span
                  className={`rounded-full px-1.5 text-xs font-semibold ${active ? 'bg-ink/15 text-ink' : 'bg-ink-soft text-dim'}`}
                >
                  {countOf(item.id)}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Satırı tamamlamayan son kartlar ortalanır (ör. 5 kart → 3 + 2). */}
      <div className="mt-10 flex flex-wrap justify-center gap-6">
        {visible.map((venture, index) => (
          <Reveal
            key={venture.id}
            delay={(index % 3) * 100}
            className="w-full md:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_3rem)/3)]"
          >
            <VentureCard venture={venture} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
