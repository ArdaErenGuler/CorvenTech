import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import ContactCard from '../cards/ContactCard';
import { contactChannels, sections } from '../../data/site';
import { useUI } from '../../context/UIContext';

const { contact } = sections;

/** "Bize Ulaşın" penceresi: e-posta ve Instagram kartları. */
export default function ContactModal() {
  const { modal, closeModal } = useUI();

  return (
    <Modal open={modal?.type === 'contact'} onClose={closeModal} labelledBy="contact-modal-title" size="lg">
      <Badge icon="message-circle">Hızlı İletişim</Badge>
      <h2 id="contact-modal-title" className="mt-4 pr-10 text-2xl font-extrabold">
        {contact.modalTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{contact.modalDescription}</p>

      <div className="mt-7 divide-y divide-line rounded-lg border border-line">
        {contactChannels.map((channel, index) => (
          <ContactCard key={channel.id} channel={channel} primary={index === 0} />
        ))}
      </div>
    </Modal>
  );
}
