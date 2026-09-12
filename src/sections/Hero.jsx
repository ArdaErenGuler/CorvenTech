import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import HeroCanvas from '../components/hero/HeroCanvas';
import { company, hero } from '../data/site';
import { useUI } from '../context/UIContext';

export default function Hero() {
  const { title, description, primaryCta, secondaryCta } = hero;
  const { openModal } = useUI();

  return (
    <section
      id="top"
      className="relative flex min-h-[88vh] items-center overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28"
    >
      <HeroCanvas />

      <Container className="relative">
        {/* Sola dayalı tek sütun: yörünge animasyonu sağ tarafta nefes alır */}
        <Reveal className="max-w-3xl">
          <p className="flex items-center gap-3 text-sm font-semibold text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            {company.brandSub}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] text-balance sm:text-5xl lg:text-[4.2rem]">
            {title.lead} <span className="text-accent-light">{title.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
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
