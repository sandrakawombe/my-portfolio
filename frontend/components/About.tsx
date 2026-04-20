"use client";

import { motion } from "framer-motion";
import { Atom, Server, Cloud, Network } from "lucide-react";

const SKILLS = [
  {
    name: "Frontend",
    desc: "React, Next.js, TypeScript, Tailwind, Framer Motion",
    icon: <Atom size={20} />,
    bg: "bg-lavender-300",
    fg: "text-lavender-600",
  },
  {
    name: "Backend",
    desc: "Java, Spring Boot, Python, FastAPI, Node",
    icon: <Server size={20} />,
    bg: "bg-blush-200",
    fg: "text-blush-500",
  },
  {
    name: "Cloud & Infra",
    desc: "AWS, Docker, Kubernetes, Terraform, CI/CD",
    icon: <Cloud size={20} />,
    bg: "bg-nude-200",
    fg: "text-[#8B6E47]",
  },
  {
    name: "Architecture",
    desc: "Microservices, event-driven systems, design",
    icon: <Network size={20} />,
    bg: "bg-mint",
    fg: "text-[#3F8C5A]",
  },
];

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.2, 0.8, 0.2, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative z-10 py-32">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="section-label">About</div>
          <h2 className="display-h2 text-plum mt-6
                         text-[clamp(36px,5vw,60px)] max-w-3xl">
            A full-stack engineer who designs <em className="text-blush-500">with care</em>,{" "}
            ships with <em className="text-blush-500">conviction</em>.
          </h2>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-[1.1fr_1fr] gap-16 items-start">
          {/* prose */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-5 text-lg text-plum-soft leading-relaxed"
          >
            <p className="drop-cap">
              I build distributed systems and consumer products at the intersection
              of beautiful design and solid engineering. From APIs that scale to
              delight-driven React UIs, I care about both halves of the stack —
              the part that runs in the cloud and the part that someone holds in
              their hands.
            </p>
            <p>
              Outside the IDE, I&apos;m probably journaling, sketching ideas on
              paper, or chasing the perfect cup of coffee.
            </p>
          </motion.div>

          {/* skill cards */}
          <div className="grid grid-cols-2 gap-3.5">
            {SKILLS.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass rounded-3xl p-5 transition-shadow
                           hover:shadow-soft cursor-default"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center
                                 mb-3 ${s.bg} ${s.fg}`}>
                  {s.icon}
                </div>
                <p className="font-semibold text-plum">{s.name}</p>
                <p className="text-xs text-plum-soft mt-1">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
