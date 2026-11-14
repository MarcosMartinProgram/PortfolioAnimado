import { useState } from 'react';
import { useLang } from '../../context/LanguageContext';
import Reveal from '../reveal/Reveal';
import './contact.scss';

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://uwvkziopxclbampbmrwi.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_d5KiM0dCZe6ZW2fDI6aUkA_6YD454Kk';
const CONTACT_ENDPOINT = `${SUPABASE_URL}/functions/v1/send-contact-email`;

const Contact = () => {
  const { t } = useLang();
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get('website')) {
      setStatus('success');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          name: String(data.get('name') ?? ''),
          email: String(data.get('email') ?? ''),
          message: String(data.get('message') ?? ''),
        }),
      });

      if (!response.ok) throw new Error('contact failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleFocus = () => {
    if (status === 'success' || status === 'error') setStatus('idle');
  };

  return (
    <section className="contact section" id="contacto">
      <div className="sectionInner contactGrid">
        <Reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2>{t.contact.title}</h2>
          <p className="contactLead">{t.contact.lead}</p>

          <div className="contactChannels">
            <a className="contactEmail" href="mailto:martinmarcospablo@gmail.com">
              martinmarcospablo@gmail.com
            </a>
            <div className="contactSocials">
              <a
                href="https://www.linkedin.com/in/marcosmartinprogram/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="https://github.com/MarcosMartinProgram" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>

          <p className="availability">
            <span className="dot" aria-hidden="true" />
            {t.contact.availability}
          </p>
        </Reveal>

        <Reveal delay={0.08} className="formWrap">
          <svg className="phoneSvg" viewBox="0 0 220 320" fill="none" aria-hidden="true">
            <rect x="26" y="12" width="168" height="296" rx="32" stroke="currentColor" strokeWidth="2" />
            <rect
              x="39"
              y="27"
              width="142"
              height="266"
              rx="20"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
            <path d="M92 20h36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="110" cy="283" r="8" stroke="currentColor" strokeWidth="2" />
            <path
              d="M62 96h96M62 116h64M62 150h96M62 170h80M62 190h52"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>

          <form className="contactForm" onSubmit={handleSubmit} onFocus={handleFocus}>
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              hidden
            />

            <div className="field">
              <label htmlFor="name">{t.contact.form.name}</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t.contact.form.namePlaceholder}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">{t.contact.form.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t.contact.form.emailPlaceholder}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="message">{t.contact.form.message}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder={t.contact.form.messagePlaceholder}
                required
              />
            </div>

            <button className="btn btnPrimary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? t.contact.form.sending : t.contact.form.send}
            </button>

            <p className={`formStatus formStatus--${status}`} role="status" aria-live="polite">
              {status === 'success'
                ? t.contact.form.success
                : status === 'error'
                  ? t.contact.form.error
                  : t.contact.form.note}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
