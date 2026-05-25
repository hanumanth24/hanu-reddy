import { useState } from "react";
import { motion } from "motion/react";
import axios from "axios";
import { toast } from "sonner";
import { PROFILE } from "@/lib/data";
import { Mail, Phone, MapPin, Download, ArrowUpRight, Send, Calendar, Link2 } from "lucide-react";
import { events } from "@/lib/analytics";
import { openCalendly } from "@/lib/calendly";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("NAME, EMAIL & MESSAGE REQUIRED");
      events.contactSubmit(false, "missing-required");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        subject: form.subject || null,
        message: form.message,
      });
      toast.success("MESSAGE TRANSMITTED ✓");
      events.contactSubmit(true, "ok");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.response?.data?.[0]?.msg ||
        "Failed to send. Try again.";
      toast.error(typeof detail === "string" ? detail : "Failed to send");
      events.contactSubmit(false, typeof detail === "string" ? detail : "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative px-6 md:px-12 py-24 md:py-36 border-t border-zinc-900"
    >
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <span className="section-label">[ 08 / OPEN CHANNEL ]</span>
          <span className="flex-1 h-px bg-zinc-800" />
        </div>

        <h2
          className="font-display uppercase font-semibold text-white leading-[0.85] mb-16"
          style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)" }}
        >
          Let's <span className="text-[#E5FE40]">Build</span>
          <br />
          Something.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={onSubmit}
            noValidate
            data-testid="contact-form"
            className="lg:col-span-7 brutal-box p-6 md:p-10"
          >
            <div className="font-mono text-[10px] tracking-[0.3em] text-[#E5FE40] mb-8">
              → TRANSMIT A MESSAGE
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Field
                label="01 / NAME"
                value={form.name}
                onChange={update("name")}
                placeholder="Your name"
                testid="contact-name"
                required
              />
              <Field
                label="02 / EMAIL"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="you@domain.com"
                testid="contact-email"
                required
              />
            </div>
            <div className="mb-6">
              <Field
                label="03 / SUBJECT"
                value={form.subject}
                onChange={update("subject")}
                placeholder="What's this about?"
                testid="contact-subject"
              />
            </div>
            <div className="mb-8">
              <label className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 block mb-3">
                04 / MESSAGE *
              </label>
              <textarea
                data-testid="contact-message"
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me about the project, role, or idea..."
                rows={6}
                required
                className="w-full bg-transparent border border-zinc-800 focus:border-[#E5FE40] outline-none px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-700 resize-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              data-testid="contact-submit"
              className="btn-brutal disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={14} strokeWidth={2.5} />
              {submitting ? "TRANSMITTING…" : "SEND MESSAGE"}
            </button>
          </motion.form>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            <DirectItem
              icon={<Mail size={18} />}
              label="EMAIL"
              value={PROFILE.email}
              href={`mailto:${PROFILE.email}`}
              testid="contact-email-link"
            />
            <DirectItem
              icon={<Phone size={18} />}
              label="PHONE"
              value={PROFILE.phone}
              href={`tel:${PROFILE.phone.replace(/[^0-9+]/g, "")}`}
              testid="contact-phone-link"
            />
            <DirectItem
              icon={<Link2 size={18} />}
              label="LINKEDIN"
              value="hanu-reddy"
              href={PROFILE.linkedin}
              onClick={() => events.linkedinClick("contact")}
              testid="contact-linkedin-link"
            />
            <DirectItem
              icon={<MapPin size={18} />}
              label="LOCATION"
              value={PROFILE.location}
              testid="contact-location"
            />

            <button
              type="button"
              onClick={() => openCalendly("contact")}
              data-testid="contact-calendly-btn"
              className="brutal-box p-6 flex items-center justify-between group hover:bg-[#E5FE40] hover:border-[#E5FE40] transition-colors mt-2 text-left w-full"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 group-hover:text-[#050505]/70 mb-2">
                  SCHEDULING / CALENDLY
                </div>
                <div className="font-display uppercase font-semibold text-white text-2xl leading-tight group-hover:text-[#050505]">
                  Book a 30-min Call
                </div>
              </div>
              <div className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-[#E5FE40] group-hover:bg-[#050505] group-hover:border-[#050505] group-hover:text-[#E5FE40] transition-all">
                <Calendar size={18} />
              </div>
            </button>

            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => events.resumeClick("contact")}
              data-testid="contact-download-resume"
              className="brutal-box p-6 flex items-center justify-between group hover:border-[#E5FE40] transition-colors"
            >
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-2">
                  RESUME / 2026
                </div>
                <div className="font-display uppercase font-semibold text-white text-2xl leading-tight">
                  Download PDF
                </div>
              </div>
              <div className="w-12 h-12 border border-zinc-700 flex items-center justify-center text-[#E5FE40] group-hover:border-[#E5FE40] transition-all">
                <Download size={18} />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", testid, required }) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 block mb-3">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={testid}
        className="w-full bg-transparent border border-zinc-800 focus:border-[#E5FE40] outline-none px-4 py-3 font-mono text-sm text-white placeholder:text-zinc-700 transition-colors"
      />
    </div>
  );
}

function DirectItem({ icon, label, value, href, testid, onClick }) {
  const Wrapper = href ? "a" : "div";
  const props = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener noreferrer", onClick }
    : {};
  return (
    <Wrapper
      {...props}
      data-testid={testid}
      className="brutal-box p-6 flex items-center justify-between group hover:border-[#E5FE40] transition-colors"
    >
      <div className="flex items-center gap-5">
        <div className="w-11 h-11 border border-zinc-700 flex items-center justify-center text-[#E5FE40] group-hover:border-[#E5FE40] transition-colors">
          {icon}
        </div>
        <div>
          <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-500 mb-1">
            {label}
          </div>
          <div className="font-mono text-sm text-white">{value}</div>
        </div>
      </div>
      {href && (
        <ArrowUpRight
          size={18}
          className="text-zinc-600 group-hover:text-[#E5FE40] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        />
      )}
    </Wrapper>
  );
}
