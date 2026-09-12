import Icon from '../ui/Icon';
import Button from '../ui/Button';
import { CARD, ICON_BOX } from '../ui/Card';
import { useUI } from '../../context/UIContext';

/** İletişim kanalı kartı (e-posta, Instagram): ikon, değer, eylem düğmesi ve gerekiyorsa kopyala düğmesi. */
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
    <div className={`group flex h-full flex-col items-center p-7 text-center ${CARD}`}>
      <span className={`size-14 ${ICON_BOX}`}>
        <Icon name={icon} className="size-6" />
      </span>
      <h3 className="mt-5 font-display text-lg font-bold">{label}</h3>
      <p className="mt-1 break-all text-accent-light">{value}</p>

      <div className="mt-6 flex w-full items-center gap-2">
        <Button
          href={url}
          variant={primary ? 'primary' : 'secondary'}
          icon={external ? 'arrow-up-right' : 'arrow-right'}
          className="flex-1"
          {...linkProps}
        >
          {action}
        </Button>
        {copyable && (
          <button
            type="button"
            onClick={copy}
            aria-label={`${label} adresini kopyala`}
            title="Kopyala"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-surface-2 text-muted transition-colors hover:border-line-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Icon name="copy" className="size-4" strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
}
