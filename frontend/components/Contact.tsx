"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Loader2, CheckCircle2 } from "lucide-react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "Could not send message.");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="relative z-10 py-24">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[40px] p-10 lg:p-16
                     grid lg:grid-cols-2 gap-12
                     bg-[image:var(--gradient-warm)]
                     shadow-[0_40px_80px_-40px_rgba(123,95,207,0.4)]"
        >
          {/* left — heading + info */}
          <div>
            <div className="section-label">Contact</div>
            <h2 className="display-h2 text-plum mt-6
                           text-[clamp(36px,5vw,60px)]">
              Let&apos;s build something{" "}
              <em className="text-blush-500">beautiful</em>.
            </h2>
            <p className="mt-5 text-base text-plum-soft max-w-sm leading-relaxed">
              Open to senior engineering roles, contracts, and the occasional
              friendly coffee chat. I usually reply within a day.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <Row icon={<Mail size={18} />}     label="kawombe60@gmail.com"             href="mailto:kawombe60@gmail.com" />
              <Row icon={<Linkedin size={18} />} label="linkedin.com/in/sandra-nakayima" href="https://www.linkedin.com/in/sandra-nakayima/" />
              <Row icon={<Github size={18} />}   label="github.com/sandrakawombe"        href="https://github.com/sandrakawombe" />
            </div>
          </div>

          {/* right — form */}
          <form
            onSubmit={submit}
            className="glass-soft rounded-[28px] p-8 flex flex-col gap-4"
          >
            <Field label="Your name">
              <input
                required type="text" placeholder="Maya Chen"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Email">
              <input
                required type="email" placeholder="maya@studio.io"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label="Tell me about your project">
              <textarea
                required placeholder="A few sentences about what you're building, timeline, etc."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} min-h-[120px] resize-y`}
              />
            </Field>

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 inline-flex items-center justify-center gap-2.5
                         px-6 py-4 rounded-full bg-plum-ink text-cream
                         text-sm font-medium shadow-ink
                         transition-all hover:-translate-y-0.5 hover:shadow-2xl
                         disabled:opacity-60 disabled:cursor-not-allowed
                         disabled:hover:translate-y-0"
            >
              {status === "loading" ? (
                <><Loader2 size={16} className="animate-spin" /> Sending…</>
              ) : status === "success" ? (
                <><CheckCircle2 size={16} /> Sent — talk soon!</>
              ) : (
                <>Send message <Send size={16} /></>
              )}
            </button>

            {status === "error" && (
              <p className="text-xs text-blush-500">{errMsg}</p>
            )}
            {status === "success" && (
              <p className="text-xs text-blush-500">
                ✦ message received — I&apos;ll be in touch soon.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}

const inputCls = `
  w-full px-4 py-3.5 rounded-2xl text-[15px] text-plum
  bg-white/85 border border-lavender-600/18
  outline-none transition-all
  focus:bg-white focus:border-magenta
  focus:shadow-[0_0_0_4px_rgba(232,80,141,0.12)]
  placeholder:text-plum-soft/60
`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-plum-soft mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function Row({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  return (
    <a
      href={href} target="_blank" rel="noopener"
      className="flex items-center gap-3.5 text-plum text-[15px]
                 transition-colors hover:text-magenta group"
    >
      <span className="w-9 h-9 rounded-xl bg-white/60 flex items-center justify-center
                       text-blush-500 transition-transform group-hover:scale-110">
        {icon}
      </span>
      {label}
    </a>
  );
}
