import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import VentureRow from '../components/cards/VentureRow';
import { sections, ventures } from '../data/site';

/**
 * Yalnızca kendi ürünlerimiz listelenir; müşteri siteleri Referanslar bölümünde.
 * Tek tür kaldığı için eskiden burada duran "Tümü / Ürünler / Web Siteleri" filtresi kaldırıldı.
 */
export default function Ventures() {
  const { tag, title, description } = sections.ventures;

  return (
    <Section id="girisimlerimiz" divider={false}>
      <Reveal>
        <SectionHeader index="01" tag={tag} title={title} description={description} />
      </Reveal>

      <ul className="mt-12 border-t border-line">
        {ventures.map((venture, index) => (
          <Reveal as="li" key={venture.id} delay={index * 70}>
            <VentureRow venture={venture} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
