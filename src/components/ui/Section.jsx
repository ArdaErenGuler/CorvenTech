import Container from './Container';

// `base`: gövde zemini (arka plandaki ışık lekeleri görünür). `band`: bir ton açık şerit, üst/alt ayraçlı.
const TONES = {
  base: '',
  band: 'border-y border-line bg-ink-soft',
};

const PADDINGS = {
  default: 'py-24 md:py-28',
  compact: 'py-20 md:py-24',
  // Üstünde CTA bloğu gibi kendi boşluğunu taşıyan bir öğe varken kullanılır.
  tightTop: 'pt-12 pb-24 md:pt-14 md:pb-28',
};

/** Standart bölüm kabuğu: dikey boşluk ve zemin tonu. */
export default function Section({ id, tone = 'base', padding = 'default', className = '', children }) {
  return (
    <section id={id} className={`relative ${PADDINGS[padding]} ${TONES[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
