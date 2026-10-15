import { Footer } from '../components/Footer';
import { Nav } from '../components/Nav';
import { Contact } from '../sections/Contact';
import { SmalfHero } from '../sections/smalf/SmalfHero';
import { SmalfAmbition } from '../sections/smalf/SmalfAmbition';
import { SmalfApproach } from '../sections/smalf/SmalfApproach';
import { SmalfRiff } from '../sections/smalf/SmalfRiff';
import { SmalfInitiatives } from '../sections/smalf/SmalfInitiatives';

export function Smalf() {
  return (
    <>
      <a className="skip-link" href="#main">Aller au contenu</a>
      <Nav />
      <main id="main">
        <SmalfHero />
        <SmalfAmbition />
        <SmalfApproach />
        <SmalfRiff />
        <SmalfInitiatives />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
