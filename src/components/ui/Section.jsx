import Container from './Container';

/** Standart bölüm kabuğu: ortak dikey boşluk + opsiyonel üst ayraç çizgisi. */
export default function Section({ id, bordered = false, className = '', children }) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${bordered ? 'border-t border-line' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
