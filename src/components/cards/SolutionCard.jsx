import Icon from '../ui/Icon';
import { CARD, ICON_BOX } from '../ui/Card';

/** Çözüm kartı: ikon, başlık ve kısa açıklama. */
export default function SolutionCard({ solution }) {
  const { icon, title, description } = solution;

  return (
    <article className={`group flex h-full flex-col p-7 ${CARD}`}>
      <span className={`size-12 ${ICON_BOX}`}>
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className="mt-6 font-display text-xl font-bold">{title}</h3>
      <p className="mt-3 leading-relaxed text-muted">{description}</p>
    </article>
  );
}
