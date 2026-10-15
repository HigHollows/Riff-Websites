import { useState, type FormEvent } from 'react';
import { site, isContactConfigured } from '../config/site';
import { useContactIntent, type Profile } from '../hooks/useContactIntent';
import { Button } from './Button';
import styles from './ContactForm.module.css';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error' | 'unconfigured';

const profiles: { id: Profile; label: string }[] = [
  { id: 'artiste', label: 'Je suis un artiste' },
  { id: 'pro', label: 'Je suis un professionnel' },
];

export function ContactForm() {
  const { profile, setProfile } = useContactIntent();
  const [status, setStatus] = useState<Status>('idle');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return; // champ piège anti-robots
    delete data.website;
    const payload = { profil: profile === 'artiste' ? 'Artiste' : 'Professionnel', ...data };

    if (site.contact.formEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(site.contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
        form.reset();
      } catch {
        setStatus('error');
      }
      return;
    }

    if (site.contact.email) {
      const subject = profile === 'artiste' ? `Présentation de projet — ${data.nom ?? ''}` : `Prise de contact — ${data.structure ?? data.nom ?? ''}`;
      const body = Object.entries(payload).map(([k, v]) => `${k} : ${v}`).join('\n');
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    // Aucun canal configuré : on le dit clairement plutôt que de simuler un envoi.
    console.warn('[RIFF] Formulaire non relié : renseigner site.contact.email ou VITE_FORM_ENDPOINT (voir README).');
    setStatus('unconfigured');
  }

  const isArtist = profile === 'artiste';

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-describedby="form-status">
      <div className={styles.tabs} role="group" aria-label="Type de demande">
        {profiles.map((p) => (
          <button key={p.id} type="button" className={styles.tab} aria-pressed={profile === p.id} onClick={() => { setProfile(p.id); setStatus('idle'); }}>
            {p.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        <label className={styles.field}>
          <span>{isArtist ? 'Nom du groupe' : 'Votre nom'}</span>
          <input id="contact-first-field" name="nom" type="text" required autoComplete={isArtist ? 'off' : 'name'} />
        </label>
        {isArtist ? (
          <label className={styles.field}>
            <span>Style / genre</span>
            <input name="genre" type="text" required placeholder="Ex. : heavy, stoner, hardcore…" />
          </label>
        ) : (
          <label className={styles.field}>
            <span>Structure et fonction</span>
            <input name="structure" type="text" required placeholder="Salle, festival, association…" autoComplete="organization" />
          </label>
        )}
        <label className={styles.field}>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className={styles.field}>
          <span>{isArtist ? 'Écoute (lien)' : 'Ville / région'}</span>
          {isArtist
            ? <input name="ecoute" type="url" placeholder="https://" />
            : <input name="ville" type="text" autoComplete="address-level2" />}
        </label>
        <label className={`${styles.field} ${styles.full}`}>
          <span>{isArtist ? 'Votre projet en quelques lignes' : 'Votre message'}</span>
          <textarea name="message" rows={5} required />
        </label>
        {/* Champ piège : invisible pour les humains */}
        <label className={styles.trap} aria-hidden="true">Ne pas remplir <input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className={styles.consent}>
        <input type="checkbox" name="consentement" value="oui" required />
        <span>J’accepte que ces informations soient utilisées pour répondre à ma demande. Elles ne sont ni revendues ni utilisées à d’autres fins.</span>
      </label>

      <div className={styles.actions}>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Envoi…' : isArtist ? 'Présenter mon projet' : 'Contacter l’agence'}
        </Button>
        <p id="form-status" className={styles.status} role="status" aria-live="polite">
          {status === 'sent' && 'Message envoyé. Merci, nous revenons vers vous.'}
          {status === 'mailto' && 'Votre messagerie s’ouvre avec le message prérempli. Il ne reste qu’à l’envoyer.'}
          {status === 'error' && 'L’envoi a échoué. Merci de réessayer dans un instant.'}
          {status === 'unconfigured' && 'Le formulaire n’est pas encore relié à une boîte de réception. Merci de revenir très bientôt.'}
          {status === 'idle' && !isContactConfigured && ''}
        </p>
      </div>
    </form>
  );
}
