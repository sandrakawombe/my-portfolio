"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock, Sparkles } from "lucide-react";

const skills = [
  "React", "TypeScript", "Next.js", "Java", "Spring Boot",
  "Python", "FastAPI", "AWS", "Microservices", "PostgreSQL",
  "Docker", "System Design",
];

export default function Hero() {
  /* mouse parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx2 = useTransform(mx, [-0.5, 0.5], [60 - 14, 60 + 14]);
  const ty2 = useTransform(my, [-0.5, 0.5], [50 - 14, 50 + 14]);
  const tx1 = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const ty1 = useTransform(my, [-0.5, 0.5], [-8, 8]);
  const txM = useTransform(mx, [-0.5, 0.5], [6, -6]);
  const tyM = useTransform(my, [-0.5, 0.5], [6, -6]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section className="relative z-10 pt-14 pb-24">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* layered card stage */}
        <div
          className="relative min-h-[460px] md:min-h-[560px]"
          onMouseMove={handleMove}
          onMouseLeave={() => { mx.set(0); my.set(0); }}
        >
          {/* back-back lavender */}
          <motion.div
            style={{ x: tx2, y: ty2 }}
            className="absolute right-0 bottom-0 w-[60%] h-[86%] rounded-[36px]
                       overflow-hidden hidden md:block"
          >
            <div className="absolute inset-0
                            bg-gradient-to-br from-lavender-300 to-lavender-400" />
            <Wave variant="back2" />
          </motion.div>

          {/* back blush */}
          <motion.div
            style={{ x: tx1, y: ty1 }}
            className="absolute right-[4%] bottom-[6%] w-[55%] h-[82%] rounded-[36px]
                       overflow-hidden hidden md:block"
          >
            <div className="absolute inset-0
                            bg-gradient-to-br from-blush-200 to-blush-300" />
            <Wave variant="back1" />
          </motion.div>

          {/* main lavender card */}
          <motion.div
            style={{ x: txM, y: tyM }}
            className="relative md:absolute left-0 top-0 w-full md:w-[78%] md:h-[92%]
                       rounded-[36px] overflow-hidden
                       bg-[image:var(--gradient-lavender)] text-cream"
          >
            <Wave variant="main" />

            <div className="relative z-10 p-7 sm:p-10 md:p-14 h-full
                            flex flex-col justify-between min-h-[440px] md:min-h-[480px]">
              {/* tag row */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="pill border-white/70 text-white">
                  Full-stack engineering
                </span>
                <span className="pill bg-white border-white text-plum">
                  Open to work
                </span>
                <span className="text-sm text-white/85 underline underline-offset-4
                                 decoration-1 ml-1">
                  Available worldwide
                </span>
              </div>

              {/* headline */}
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                  className="display-h1 text-white text-[clamp(40px,7vw,92px)] mt-6 sm:mt-7"
                >
                  Building<br />
                  software with <em className="text-blush-100">soul</em>.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="mt-7 max-w-[520px] text-lg text-white/90 leading-relaxed"
                >
                  I&apos;m{" "}
                  <span className="font-semibold text-white">Sandra Kawombe</span>{" "}
                  — a software engineer crafting elegant, full-stack
                  products in React, Python &amp; modern cloud infrastructure.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3 }}
                  className="mt-10 flex flex-wrap gap-3.5"
                >
                  <Link
                    href="#work"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full
                               bg-white text-plum font-medium shadow-lg
                               transition-all hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    View projects <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full
                               border border-white/50 text-white font-medium
                               transition-all hover:bg-white/10 hover:-translate-y-0.5"
                  >
                    Contact me
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* side meta — like the inspiration's right column */}
          <div className="hidden md:flex absolute right-14 top-[30%] z-20
                          flex-col gap-4 text-plum">
            <Meta icon={<BarChart3 size={18} />} label="Full-stack" />
            <Meta icon={<Clock size={18} />} label="React + Python" />
            <Meta icon={<Sparkles size={18} />} label="Open to work" />
          </div>

          {/* mascot */}
          <Mascot />
        </div>

        {/* skill marquee */}
        <div className="mt-20 py-5 border-y border-lavender-600/15 overflow-hidden no-scrollbar">
          <div className="flex gap-12 whitespace-nowrap animate-scroll
                          font-display italic text-2xl text-plum-soft">
            {[...skills, ...skills].map((s, i) => (
              <span key={i} className="inline-flex items-center gap-12">
                {s}
                <span className="not-italic text-magenta text-sm">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* —— small subcomponents —— */

function Wave({ variant }: { variant: "main" | "back1" | "back2" }) {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
    >
      {variant === "main" && (
        <>
          <path
            d="M0,260 C150,200 350,340 520,260 C660,200 800,300 800,300 L800,0 L0,0 Z"
            fill="rgba(255,255,255,0.15)"
          />
          <path
            d="M0,400 C200,360 380,500 580,420 C720,370 800,440 800,440 L800,600 L0,600 Z"
            fill="rgba(255,255,255,0.10)"
          />
          <circle cx="640" cy="120" r="40" fill="rgba(255,255,255,0.18)" />
          <circle cx="700" cy="80" r="14" fill="rgba(255,255,255,0.3)" />
        </>
      )}
      {variant === "back1" && (
        <path
          d="M0,200 C180,260 360,140 540,220 C660,270 800,180 800,180 L800,0 L0,0 Z"
          fill="rgba(255,255,255,0.2)"
        />
      )}
      {variant === "back2" && (
        <>
          <path
            d="M0,480 C200,420 350,560 600,460 C720,420 800,500 800,500 L800,600 L0,600 Z"
            fill="rgba(255,255,255,0.18)"
          />
          <path
            d="M0,520 C150,470 300,580 580,500 C720,470 800,540 800,540 L800,600 L0,600 Z"
            fill="rgba(255,255,255,0.12)"
          />
        </>
      )}
    </svg>
  );
}

function Meta({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 font-medium">
      {icon}
      <span>{label}</span>
    </div>
  );
}

function Mascot() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="hidden md:block absolute right-[30%] -bottom-7 w-[84px] h-[84px]
                 z-30 animate-float"
    >
      <defs>
        <linearGradient id="m1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#F7C8D9" />
          <stop offset="100%" stopColor="#E8508D" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="42" fill="url(#m1)" />
      <ellipse cx="38" cy="46" rx="6" ry="8" fill="#fff" />
      <ellipse cx="62" cy="46" rx="6" ry="8" fill="#fff" />
      <circle cx="38" cy="48" r="3" fill="#1B0F2B" />
      <circle cx="62" cy="48" r="3" fill="#1B0F2B" />
      <path d="M40 64 Q50 72 60 64"
            stroke="#1B0F2B" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="30" cy="58" r="3" fill="#FFE6F1" opacity="0.9" />
      <circle cx="70" cy="58" r="3" fill="#FFE6F1" opacity="0.9" />
    </svg>
  );
}
