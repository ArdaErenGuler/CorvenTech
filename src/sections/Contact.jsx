import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { company, sections } from '../data/site';

export default function Contact() {
  const { tag, title, description, cta } = sections.contact;
  const mailto = `mailto:${company.email}`;

  return (
    <Section id="iletisim">
      <Reveal>
        {/* Düz camgöbeği blok: metinler kontrast için koyu arduvaz */}
        <div className="grid gap-10 rounded-3xl bg-accent px-8 py-14 text-ink md:px-14 md:py-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.12em]">{tag}</p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg">{description}</p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
            <Button href={mailto} variant="dark" size="lg" icon="arrow-right">
              {cta.label}
            </Button>
            <a
              href={mailto}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              {company.email}
            </a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
