import PageShell from "../components/PageShell.jsx";
import { profile } from "../data/index.js";
import { openResume } from "../utils/resume.js";

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title="Let's build scalable Adobe experiences"
      text="Available for Senior AEM Developer, AEM Full Stack Lead, AEM Architect, AEP Engineer, AJO Developer and Adobe Experience Cloud roles."
    >
      <div className="contact-card">
        <a href={`mailto:${profile.email}`} className="primary-btn">
          Email Me
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="secondary-btn">
          LinkedIn
        </a>
        <button type="button" onClick={openResume} className="secondary-btn button-reset">
          Download Resume
        </button>
        <p>{profile.phone} — {profile.location}</p>
      </div>
    </PageShell>
  );
}
