import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLang } from '../../context/LanguageContext';
import Reveal from '../reveal/Reveal';
import './contact.scss';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_94y20xo';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_v10u2oh';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'pX_2hasGmGcuvjXIW';

const Contact = () => {
  const { t } = useLang();
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY,
      });
      formRef.current.reset();
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

          <form ref={formRef} className="contactForm" onSubmit={handleSubmit} onFocus={handleFocus}>
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
