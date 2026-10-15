import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { Hero } from '../sections/Hero';
import { Band } from '../sections/Band';
import { Artists } from '../sections/Artists';
import { Services } from '../sections/Services';
import { Manifesto } from '../sections/Manifesto';
import { SmalfTeaser } from '../sections/SmalfTeaser';
import { Paths } from '../sections/Paths';
import { Contact } from '../sections/Contact';

export function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <Nav />
      <main id="main">
        <Hero />
        <Band />
        <Artists />
        <Services />
        <Manifesto />
        <SmalfTeaser />
        <Paths />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
