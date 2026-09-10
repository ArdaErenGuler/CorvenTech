import Icon from './Icon';
import { useUI } from '../../context/UIContext';

/** Sağ altta beliren, kendiliğinden kapanan bildirim. */
export default function Toast() {
  const { toast } = useUI();

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-4 bottom-5 z-[110] flex justify-center sm:inset-x-auto sm:right-6 sm:justify-end"
    >
      {toast && (
        <div
          key={toast.id}
          className="animate-toast-in pointer-events-auto flex max-w-sm items-start gap-3 rounded-xl border border-line-strong border-l-4 border-l-accent bg-surface px-4 py-3 text-sm text-body shadow-lg"
        >
          <Icon name="check-circle" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
          <p className="leading-snug">{toast.message}</p>
        </div>
      )}
    </div>
  );
}
