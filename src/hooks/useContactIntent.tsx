import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type Profile = 'artiste' | 'pro';

interface Ctx { profile: Profile; setProfile: (p: Profile) => void; open: (p: Profile) => void }
const IntentCtx = createContext<Ctx | null>(null);

/** Mémorise le profil choisi (artiste / professionnel) et amène l'utilisateur au formulaire. */
export function ContactIntentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>('artiste');
  const open = useCallback((p: Profile) => {
    setProfile(p);
    history.replaceState(null, '', '#contact');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contact')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    window.setTimeout(() => document.getElementById('contact-first-field')?.focus({ preventScroll: true }), reduce ? 50 : 700);
  }, []);
  const value = useMemo(() => ({ profile, setProfile, open }), [profile, open]);
  return <IntentCtx.Provider value={value}>{children}</IntentCtx.Provider>;
}

export function useContactIntent() {
  const c = useContext(IntentCtx);
  if (!c) throw new Error('ContactIntentProvider manquant');
  return c;
}
