import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import HeroCanvas from '../components/hero/HeroCanvas';
import { hero } from '../data/site';
import { useUI } from '../context/UIContext';

export default function Hero() {
  const { badge, title, description, primaryCta, secondaryCta, stats } = hero;
  const { openModal } = useUI();

  return (
    <section
      id="top"
      className="hero-glow relative flex min-h-[88vh] items-center overflow-hidden pt-40 pb-24 md:pt-48 md:pb-28"
    >
      <HeroCanvas />

      <Container className="relative">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent-border bg-surface/85 px-5 py-2 font-badge text-sm font-semibold text-accent backdrop-blur-md">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {badge}
          </span>

          <h1 className="mt-8 font-display text-4xl font-extrabold leading-[1.12] text-balance text-heading sm:text-5xl lg:text-[4.1rem]">
            {title.lead} <span className="inline-block text-accent-light">{title.highlight}</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryCta.href} size="lg" icon="arrow-right">
              {primaryCta.label}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => openModal({ type: 'contact' })}>
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-3 divide-x divide-line border-t border-line pt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center gap-1 px-3 text-center">
                <dt className="text-xs text-muted sm:text-sm">{stat.label}</dt>
                <dd className="font-display text-3xl font-extrabold text-heading sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
