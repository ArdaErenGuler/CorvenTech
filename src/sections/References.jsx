import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import Icon from '../components/ui/Icon';
import { references, sections } from '../data/site';

/**
 * Referans ızgarası: kart sayısı arttıkça satır eklenir, kartın boyu sabit kalır.
 * Ekran görüntüsü kullanılmaz; sayfanın geri kalanı gibi düz zemin, kenarlık ve boşlukla kurulur.
 */
export default function References() {
  const { tag, title, description } = sections.references;

  return (
    <Section id="referanslar">
      <Reveal>
        <SectionHeader index="02" tag={tag} title={title} description={description} />
      </Reveal>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {references.map((item, index) => (
          <Reveal as="li" key={item.id} delay={(index % 3) * 80}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-line bg-ink-soft px-6 py-6 transition-colors hover:border-line-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <h3 className="text-lg font-bold text-heading">{item.name}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {item.category}
                {item.location && ` · ${item.location}`}
              </p>

              <p className="mt-5 flex items-center gap-1.5 text-sm font-semibold text-accent">
                {/* Punycode adres okunur hâliyle yazılır; uzun adres dar kartta alt satıra taşabilsin */}
                <span className="min-w-0 break-words">{item.domain}</span>
                <Icon
                  name="arrow-up-right"
                  className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </p>
            </a>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
