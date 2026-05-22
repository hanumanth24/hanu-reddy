import { motion } from "framer-motion";
import { profile } from "../data/index.js";
import { openResume } from "../utils/resume.js";

const contactItems = [
  { icon: "✉", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: "📍", label: "Location", value: profile.location, href: null },
  { icon: "💼", label: "LinkedIn", value: "hanu-reddy", href: profile.linkedin },
];

export default function ContactPage() {
  return (
    <div className="contact-v2">
      {/* Page heading */}
      <div className="contact-v2-head">
        <motion.span
          className="contact-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          Let's build something great
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          Available for Senior AEM Developer, AEM Architect, AEP Engineer, AJO Developer
          and Adobe Experience Cloud roles.
        </motion.p>
      </div>

      {/* Two-column layout */}
      <div className="contact-v2-body">

        {/* ── Left: profile card + contact info ── */}
        <motion.div
          className="contact-profile-col"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
        >
          {/* Profile card */}
          <div className="contact-profile-card">
            <div className="contact-photo-wrap">
              <img src={profile.photo} alt={profile.shortName} className="contact-photo" />
              <div className="contact-photo-ring" aria-hidden="true" />
              <div className="contact-photo-glow" aria-hidden="true" />
            </div>
            <div className="contact-profile-info">
              <h2>{profile.shortName}</h2>
              <p>{profile.role}</p>
              <span>{profile.title}</span>
            </div>
          </div>

          {/* Contact detail rows */}
          <div className="contact-detail-list">
            {contactItems.map((item) => (
              <div className="contact-detail-row" key={item.label}>
                <div className="contact-detail-icon">{item.icon}</div>
                <div className="contact-detail-text">
                  <small>{item.label}</small>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {item.value}
                    </a>
                  ) : (
                    <strong>{item.value}</strong>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="contact-action-row">
            <a href={`mailto:${profile.email}`} className="primary-btn contact-cta">
              Email Me
            </a>
            <button type="button" onClick={openResume} className="secondary-btn button-reset contact-cta">
              Download Resume
            </button>
          </div>
        </motion.div>

        {/* ── Right: Calendly ── */}
        <motion.div
          className="contact-calendly-col"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="calendly-card">
            <div className="calendly-card-head">
              <div className="calendly-icon">📅</div>
              <div>
                <h3>Schedule a Call</h3>
                <p>Pick a time that works for you — 30-min intro call</p>
              </div>
            </div>
            <div className="calendly-embed-wrap">
              <iframe
                src={`${profile.calendly}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=ffffff&text_color=240909&primary_color=dc2626`}
                width="100%"
                height="100%"
                frameBorder="0"
                title="Schedule a call with Hanu Reddy"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
