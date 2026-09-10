import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Chip from '../ui/Chip';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { ventures } from '../../data/site';
import { useUI } from '../../context/UIContext';

const SUBHEADING = 'font-badge text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-dim';

function InfoCell({ label, value }) {
  return (
    <div className="rounded-xl border border-line bg-ink-soft px-4 py-3">
      <p className={SUBHEADING}>{label}</p>
      <p className="mt-1 text-sm font-medium text-body">{value}</p>
    </div>
  );
}

/** Girişim detay diyaloğu: bilgi ızgarası, uzun açıklama, modüller, öne çıkanlar ve bağlantılar. */
export default function VentureModal() {
  const { modal, closeModal, openModal } = useUI();
  const venture = modal?.type === 'venture' ? ventures.find((item) => item.id === modal.id) : null;

  return (
    <Modal open={Boolean(venture)} onClose={closeModal} labelledBy="venture-modal-title" size="lg">
      {venture && (
        <>
          <Badge icon={venture.icon}>{venture.category}</Badge>
          <h2 id="venture-modal-title" className="mt-4 pr-10 font-display text-3xl font-bold">
            {venture.name}
          </h2>
          <p className="mt-2 font-medium text-body">{venture.tagline}</p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <InfoCell label="Platform" value={venture.platform} />
            <InfoCell label="Durum" value={venture.status} />
            <InfoCell label="Modül" value={`${venture.modules.length} ana modül`} />
          </div>

          <p className="mt-6 leading-relaxed text-muted">{venture.longDescription}</p>

          <h3 className={`mt-8 ${SUBHEADING}`}>Modüller</h3>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-ink-soft">
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

          <h3 className={`mt-8 ${SUBHEADING}`}>Öne çıkanlar</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {venture.features.map((feature) => (
              <Chip key={feature} as="li" variant="soft">
                {feature}
              </Chip>
            ))}
          </ul>

          <h3 className={`mt-6 ${SUBHEADING}`}>Teknoloji yığını</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {venture.stack.map((item) => (
              <Chip key={item} as="li">
                {item}
              </Chip>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
            {venture.links.website && (
              <Button href={venture.links.website} target="_blank" rel="noopener noreferrer" icon="external-link">
                Siteye Git
              </Button>
            )}
            {venture.links.github && (
              <Button href={venture.links.github} target="_blank" rel="noopener noreferrer" variant="secondary" icon="github">
                Kaynak Kod
              </Button>
            )}
            {venture.links.mobile && (
              <Button href={venture.links.mobile} target="_blank" rel="noopener noreferrer" variant="secondary" icon="smartphone">
                Mobil İstemci
              </Button>
            )}
            <Button
              variant={venture.links.website ? 'secondary' : 'primary'}
              icon="arrow-right"
              onClick={() => openModal({ type: 'contact', subject: `${venture.name} hakkında` })}
            >
              İletişime Geç
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
}
