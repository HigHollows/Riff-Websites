import { ContactIntentProvider } from './hooks/useContactIntent';
import { Home } from './pages/Home';

/**
 * Point d'entrée. Pour ajouter de vraies pages (Artistes, Services, À propos, Contact) :
 * installer react-router-dom, router ici vers src/pages/*, et faire pointer navItems vers les routes.
 * Les sections de Home restent réutilisables telles quelles.
 */
export function App() {
  return (
    <ContactIntentProvider>
      <Home />
    </ContactIntentProvider>
  );
}
