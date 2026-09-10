import { UIProvider } from './context/UIContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import VentureModal from './components/modals/VentureModal';
import ContactModal from './components/modals/ContactModal';
import Hero from './sections/Hero';
import Ventures from './sections/Ventures';
import Solutions from './sections/Solutions';
import Process from './sections/Process';
import TechStack from './sections/TechStack';
import Founders from './sections/Founders';
import CtaBanner from './sections/CtaBanner';
import Contact from './sections/Contact';

export default function App() {
  return (
    <UIProvider>
      <Navbar />
      <main>
        <Hero />
        <Ventures />
        <Solutions />
        <Process />
        <TechStack />
        <Founders />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />

      <VentureModal />
      <ContactModal />
      <Toast />
    </UIProvider>
  );
}
