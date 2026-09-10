import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import HeroCanvas from '../components/hero/HeroCanvas';
import { hero } from '../data/site';
import { useUI } from '../context/UIContext';

export default function Hero() {
  const { title, description, primaryCta, secondaryCta } = hero;
  const { openModal } = useUI();

  return (
    <section
      id="top"
      className="hero-glow relative flex min-h-[88vh] items-center overflow-hidden pt-40 pb-24 md:pt-48 md:pb-28"
    >
      <HeroCanvas />

      <Container className="relative">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <h1 className="font-display text-4xl font-extrabold leading-[1.12] text-balance text-heading sm:text-5xl lg:text-[4.1rem]">
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
      </Container>
    </section>
  );
}
