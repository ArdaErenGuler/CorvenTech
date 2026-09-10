import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import { Field, Input, Select, Textarea } from '../ui/FormField';
import { company, sections } from '../../data/site';
import { useUI } from '../../context/UIContext';

const { contact } = sections;

/** Formu, yapılandırılmış Formspree endpoint'ine gönderir; endpoint yoksa hazır bir e-posta olarak açar. */
export default function ContactModal() {
  const { modal, closeModal, showToast } = useUI();
  const open = modal?.type === 'contact';
  const [status, setStatus] = useState('idle'); // idle | sending | success | mailto | error
  const [error, setError] = useState('');

  useEffect(() => {
    if (!open) {
      setStatus('idle');
      setError('');
    }
  }, [open]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setError('');

    if (!company.formspreeEndpoint) {
      const subject = encodeURIComponent(`[${company.name}] ${data.konu} — ${data.ad_soyad}`);
      const body = encodeURIComponent(`${data.mesaj}\n\n— ${data.ad_soyad} (${data.email})`);
      window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
      setStatus('mailto');
      showToast('E-posta uygulamanız açılıyor; mesajınız hazır.');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(company.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        showToast('Mesajınız iletildi. En kısa sürede dönüş yapacağız.');
        return;
      }

      const payload = await response.json().catch(() => ({}));
      setError(
        payload.errors?.map((item) => item.message).join(', ') ||
          'Mesaj gönderilemedi. Lütfen bilgilerinizi kontrol edip tekrar deneyin.',
      );
      setStatus('error');
    } catch {
      setError('Bağlantı hatası oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.');
      setStatus('error');
    }
  }

  return (
    <Modal open={open} onClose={closeModal} labelledBy="contact-modal-title">
      <Badge icon="message-circle">Hızlı İletişim</Badge>
      <h2 id="contact-modal-title" className="mt-4 pr-10 font-display text-2xl font-bold">
        {contact.modalTitle}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{contact.modalDescription}</p>

      {status === 'success' ? (
        <div className="mt-8 rounded-xl border border-line bg-ink-soft px-6 py-8 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-ink">
            <Icon name="check" className="size-6" strokeWidth={2.5} />
          </span>
          <h3 className="mt-5 font-display text-xl font-bold">Mesajınız iletildi</h3>
          <p className="mt-2 text-sm text-muted">En kısa sürede size dönüş yapacağız.</p>
          <Button variant="secondary" onClick={closeModal} className="mt-6">
            Pencereyi Kapat
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="contact-name" label="Ad Soyad" required>
              <Input id="contact-name" name="ad_soyad" type="text" autoComplete="name" placeholder="Adınız Soyadınız" required />
            </Field>
            <Field id="contact-email" label="E-posta" required>
              <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="ornek@sirket.com" required />
            </Field>
          </div>

          <Field id="contact-subject" label="Konu" required>
            <Select id="contact-subject" name="konu" defaultValue={modal?.subject ?? contact.subjects[0]} required>
              {contact.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
              {modal?.subject && !contact.subjects.includes(modal.subject) && (
                <option value={modal.subject}>{modal.subject}</option>
              )}
            </Select>
          </Field>

          <Field id="contact-message" label="Mesajınız" required>
            <Textarea
              id="contact-message"
              name="mesaj"
              placeholder="Projenizi, ihtiyacınızı veya sorunuzu kısaca anlatın…"
              required
            />
          </Field>

          {status === 'error' && (
            <p role="alert" className="flex gap-2 rounded-lg border border-red-500/35 bg-red-500/15 px-4 py-3 text-sm text-red-200">
              <Icon name="alert-circle" className="mt-0.5 size-4 shrink-0" strokeWidth={2} />
              {error}
            </p>
          )}

          {status === 'mailto' && (
            <p className="rounded-lg border border-accent-border bg-accent-subtle px-4 py-3 text-sm text-body">
              E-posta uygulamanız açıldı. Açılmadıysa mesajınızı doğrudan{' '}
              <a href={`mailto:${company.email}`} className="font-semibold text-accent underline underline-offset-4">
                {company.email}
              </a>{' '}
              adresine gönderebilirsiniz.
            </p>
          )}

          <Button type="submit" size="lg" icon="send" disabled={status === 'sending'} className="w-full">
            {status === 'sending' ? 'Gönderiliyor…' : 'Mesajı Gönder'}
          </Button>
        </form>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm">
        <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent">
          <Icon name="mail" className="size-4" strokeWidth={2} />
          {company.email}
        </a>
        {company.social.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted transition-colors hover:text-accent"
          >
            <Icon name={item.icon} className="size-4" strokeWidth={2} />
            {item.label}
          </a>
        ))}
      </div>
    </Modal>
  );
}
