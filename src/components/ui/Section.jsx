import Container from './Container';

const PADDINGS = {
  default: 'py-20 md:py-28',
  compact: 'py-16 md:py-20',
};

/**
 * Bölüm kabuğu. Tüm sayfa tek zemin üzerinde durur; bölümler dönüşümlü şeritlerle değil,
 * üstlerindeki tek bir saç teli çizgi ve dikey boşlukla ayrılır.
 */
export default function Section({ id, divider = true, padding = 'default', className = '', children }) {
  return (
    <section
      id={id}
      className={`relative ${PADDINGS[padding]} ${divider ? 'border-t border-line' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
