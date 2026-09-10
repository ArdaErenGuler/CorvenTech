import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import Ventures from './sections/Ventures';
import Solutions from './sections/Solutions';
import Contact from './sections/Contact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Ventures />
        <Solutions />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
