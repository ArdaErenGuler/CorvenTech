import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { useUI } from '../../context/UIContext';

/** İletişim kanalı satırı: ikon, kanal adı, adres ve eylem düğmesi; e-posta için kopyala. */
export default function ContactCard({ channel, primary = false }) {
  const { label, value, url, icon, action, copyable, external } = channel;
  const { showToast } = useUI();
  const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  /** Pano API'si engelliyse (eski tarayıcı, güvensiz bağlam) geçici bir alanla kopyalamayı dener. */
  function copyFallback() {
    const field = document.createElement('textarea');
    field.value = value;
    field.setAttribute('readonly', '');
    field.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
    document.body.append(field);
    field.select();
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    } finally {
      field.remove();
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      showToast(`${label} adresi kopyalandı.`);
    } catch {
      showToast(
        copyFallback()
          ? `${label} adresi kopyalandı.`
          : 'Kopyalanamadı; adresi seçip elle kopyalayabilirsiniz.',
      );
    }
  }

  return (
    <div className="flex h-full flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <Icon name={icon} className="size-5 shrink-0 text-accent" />
        <div className="min-w-0">
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-0.5 truncate text-lg font-bold text-heading">{value}</p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button href={url} variant={primary ? 'primary' : 'secondary'} size="sm" icon={external ? 'arrow-up-right' : 'arrow-right'} {...linkProps}>
          {action}
        </Button>
        {copyable && (
          <button
            type="button"
            onClick={copy}
            aria-label={`${label} adresini kopyala`}
            title="Kopyala"
            className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-line-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name="copy" className="size-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
