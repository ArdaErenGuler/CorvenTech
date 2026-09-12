import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Chip from '../ui/Chip';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { ventures } from '../../data/site';
import { useUI } from '../../context/UIContext';
import { hostOf } from '../../utils/url';

const SUBHEADING = 'text-sm font-semibold text-dim';

function InfoCell({ label, value }) {
  return (
    <div className="rounded-lg border border-line bg-ink-soft px-4 py-3">
      <p className={SUBHEADING}>{label}</p>
      <p className="mt-1 text-sm font-medium text-body">{value}</p>
    </div>
  );
}

/** Girişim detay penceresi: bilgi ızgarası, açıklama, özellikler, teknolojiler ve site bağlantısı. */
export default function VentureModal() {
  const { modal, closeModal } = useUI();
  const venture = modal?.type === 'venture' ? ventures.find((item) => item.id === modal.id) : null;

  return (
    <Modal open={Boolean(venture)} onClose={closeModal} labelledBy="venture-modal-title" size="lg">
      {venture && (
        <>
          <div className="pr-12">
            <Badge icon={venture.icon}>{venture.category}</Badge>
            <h2 id="venture-modal-title" className="mt-4 text-3xl font-extrabold">
              {venture.name}
            </h2>
          </div>
          <p className="mt-2 font-medium text-body">{venture.tagline}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <InfoCell label="Platform" value={venture.platform} />
            <InfoCell label="Durum" value={venture.status} />
            <InfoCell label="Web adresi" value={venture.url ? hostOf(venture.url) : 'Yakında'} />
          </div>

          <p className="mt-6 leading-relaxed text-muted">{venture.longDescription}</p>

          {venture.modules?.length > 0 && (
            <>
              <h3 className={`mt-8 ${SUBHEADING}`}>Öne çıkan özellikler</h3>
              <ul className="mt-3 divide-y divide-line rounded-lg border border-line bg-ink-soft">
                {venture.modules.map((module) => (
                  <li key={module.name} className="flex gap-3 px-4 py-3.5">
                    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.25} />
                    <div>
                      <p className="text-sm font-semibold text-heading">{module.name}</p>
                      <p className="mt-0.5 text-sm text-muted">{module.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}

          {venture.stack?.length > 0 && (
            <>
              <h3 className={`mt-6 ${SUBHEADING}`}>Teknolojiler</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {venture.stack.map((item) => (
                  <Chip key={item} as="li">
                    {item}
                  </Chip>
                ))}
              </ul>
            </>
          )}

          {venture.url && (
            <div className="mt-8 border-t border-line pt-6">
              <Button href={venture.url} target="_blank" rel="noopener noreferrer" icon="arrow-up-right">
                {venture.linkLabel ?? 'Siteyi Ziyaret Et'}
              </Button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
