import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Reveal from '../components/ui/Reveal';
import { sections } from '../data/site';
import { useUI } from '../context/UIContext';

/** Koyu radyal zeminli, camgöbeği kenarlıklı çağrı kutusu. */
export default function CtaBanner() {
  const { title, description, button } = sections.cta;
  const { openModal } = useUI();

  return (
    <section className="py-8 md:py-12">
      <Container>
        <Reveal>
          <div className="cta-surface relative overflow-hidden rounded-3xl border border-accent-border px-8 py-16 text-center shadow-lg inset-shadow-highlight md:px-14 md:py-20">
            <span aria-hidden="true" className="cta-halo pointer-events-none absolute -inset-1/2" />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl font-display text-3xl font-extrabold leading-tight text-balance text-heading sm:text-4xl lg:text-5xl">
                {title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{description}</p>
              <Button
                size="lg"
                icon="arrow-right"
                onClick={() => openModal({ type: 'contact', subject: 'Yeni proje talebi' })}
                className="mt-9"
              >
                {button}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
