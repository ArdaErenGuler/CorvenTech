import Icon from '../ui/Icon';

/** Çözümler listesindeki tek satır: sıra numarası + ikon + başlık/açıklama. */
export default function SolutionItem({ solution, index }) {
  const { icon, title, description } = solution;

  return (
    <div className="group flex gap-5 py-8 sm:gap-6">
      <span className="hidden w-8 shrink-0 pt-3 font-display text-sm font-medium text-ink-muted sm:block">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line text-accent transition-colors duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
        <Icon name={icon} className="size-5" />
      </span>
      <div>
        <h3 className="font-display text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 leading-relaxed text-ink-muted">{description}</p>
      </div>
    </div>
  );
}
