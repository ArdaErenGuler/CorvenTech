import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Reveal from '../components/ui/Reveal';
import ContactCard from '../components/cards/ContactCard';
import { contactChannels, sections } from '../data/site';

export default function Contact() {
  const { tag, title, description } = sections.contact;

  return (
    <Section id="iletisim">
      <Reveal>
        <SectionHeader index="05" tag={tag} title={title} description={description} />
      </Reveal>

      <div className="mt-12">
        {contactChannels.map((channel, index) => (
          <Reveal key={channel.id} delay={index * 90} className="border-t border-line last:border-b">
            <ContactCard channel={channel} primary={index === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
