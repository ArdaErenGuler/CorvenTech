import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import { CARD_STATIC } from '../components/ui/Card';
import { sections, techStack } from '../data/site';

export default function TechStack() {
  return (
    <Section id="teknolojiler" padding="compact">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <SectionHeader {...sections.techStack} align="left" />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
          {techStack.map((group, index) => (
            <Reveal key={group.group} delay={index * 90} className="h-full">
              <div className={`flex h-full flex-col p-6 ${CARD_STATIC}`}>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-lg border border-accent-border bg-accent-subtle text-accent">
                    <Icon name={group.icon} className="size-4" strokeWidth={2} />
                  </span>
                  <h3 className="font-display text-base font-bold">{group.group}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-ink-soft px-3 py-1.5 text-sm font-medium text-body"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
