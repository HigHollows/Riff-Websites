import { ContactForm } from '../components/ContactForm';
import { site } from '../config/site';
import styles from './Contact.module.css';

export function Contact() {
  const { email, phone, city } = site.contact;
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className="mono" data-reveal>04 — Contact</p>
            <h2 id="contact-title" className={`display ${styles.title}`} data-reveal style={{ ['--i' as string]: 1 }}>
              La suite<br />se joue<br />sur scène<span>.</span>
            </h2>
            <ul className={styles.coords} data-reveal style={{ ['--i' as string]: 2 }}>
              {email && <li><span className="mono">Email</span><a href={`mailto:${email}`}>{email}</a></li>}
              {phone && <li><span className="mono">Téléphone</span><a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>}
              <li><span className="mono">Zone</span>{city ? `${city} · ` : ''}{site.region}</li>
            </ul>
          </div>
          <div className={styles.right} data-reveal style={{ ['--i' as string]: 2 }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
