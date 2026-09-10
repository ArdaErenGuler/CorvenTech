import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import ContactCard from '../components/cards/ContactCard';
import { contactChannels, sections } from '../data/site';

export default function Contact() {
  const { icon, tag, title, description } = sections.contact;

  return (
    <Section id="iletisim" tone="band">
      <Reveal>
        <SectionHeader icon={icon} tag={tag} title={title} description={description} />
      </Reveal>

      <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
        {contactChannels.map((channel, index) => (
          <Reveal key={channel.id} delay={index * 100} className="h-full">
            <ContactCard channel={channel} primary={index === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
