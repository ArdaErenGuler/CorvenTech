import { UIProvider } from './context/UIContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/ui/Toast';
import VentureModal from './components/modals/VentureModal';
import ContactModal from './components/modals/ContactModal';
import Hero from './sections/Hero';
import Ventures from './sections/Ventures';
import References from './sections/References';
import Solutions from './sections/Solutions';
import Packages from './sections/Packages';
import Process from './sections/Process';
import About from './sections/About';
import Contact from './sections/Contact';

export default function App() {
  return (
    <UIProvider>
      <Navbar />
      <main>
        <Hero />
        <Ventures />
        <References />
        <Solutions />
        <Packages />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />

      <VentureModal />
      <ContactModal />
      <Toast />
    </UIProvider>
  );
}
