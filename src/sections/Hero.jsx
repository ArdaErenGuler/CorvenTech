import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { hero } from '../data/site';

export default function Hero() {
  const { badge, title, description, primaryCta, secondaryCta, stats } = hero;

  return (
    <section id="top" className="pt-40 pb-24 md:pt-52 md:pb-32">
      <Container>
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-1.5 text-sm font-medium text-ink-muted">
            <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
            {badge}
          </span>

          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[4rem]">
            {title.lead}{' '}
            <span className="relative inline-block whitespace-nowrap">
              {/* Düz (flat) vurgu şeridi — gradient/gölge yok */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[0.08em] h-[0.3em] bg-accent/40"
              />
              <span className="relative">{title.highlight}</span>
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted">{description}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={primaryCta.href} size="lg" icon="arrow-right">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} size="lg" variant="outline">
              {secondaryCta.label}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <dl className="mx-auto mt-20 grid max-w-3xl grid-cols-3 divide-x divide-line border-t border-line pt-10">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse items-center gap-1 px-4 text-center">
                <dt className="text-sm text-ink-muted">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
