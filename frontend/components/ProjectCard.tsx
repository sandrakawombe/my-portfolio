"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import WeatherMock from "./mocks/WeatherMock";
import TravelMock from "./mocks/TravelMock";
import ToTextMock from "./mocks/ToTextMock";

const themeBg = {
  p1: "bg-gradient-to-br from-lavender-400 to-[#8E76E0]",
  p2: "bg-gradient-to-br from-blush-300 to-blush-400",
  p3: "bg-gradient-to-br from-nude-200 to-nude-300",
} as const;

export default function ProjectCard({
  project, index,
}: { project: Project; index: number }) {
  const isLight = project.theme === "p3"; // nude card uses dark text

  const Mock =
    project.slug === "weather" ? <WeatherMock />
    : project.slug === "travel" ? <TravelMock />
    : <ToTextMock />;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ y: -6 }}
      className={`relative overflow-hidden rounded-[36px] min-h-[420px]
                  grid lg:grid-cols-[1.2fr_1fr]
                  transition-shadow hover:shadow-soft ${themeBg[project.theme]}`}
    >
      <DecoLines light={isLight} />

      {/* content */}
      <div className={`relative z-10 p-7 sm:p-10 lg:p-12 flex flex-col justify-between
                       ${isLight ? "text-plum" : "text-white"}`}>
        <span className={`pill ${
          isLight
            ? "bg-plum/5 border-plum/15 text-plum"
            : "bg-white/20 border-white/30 text-white backdrop-blur-md"
        }`}>
          {project.index} — {project.badge}
        </span>

        <div className="mt-5">
          <h3
            className="font-display font-normal text-[46px] leading-none
                       tracking-tight"
            dangerouslySetInnerHTML={{ __html: project.title }}
          />
          <p className={`mt-4 max-w-md text-base leading-relaxed
                        ${isLight ? "text-plum-soft" : "text-white/90"}`}>
            {project.blurb}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className={`font-mono text-xs px-3 py-1 rounded-full border
                            ${isLight
                              ? "bg-plum/5 border-plum/12 text-plum-soft"
                              : "bg-white/15 border-white/25"}`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={project.liveUrl}
            target="_blank"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full
                        text-sm font-medium transition-all hover:-translate-y-0.5
                        ${isLight
                          ? "bg-plum-ink text-cream"
                          : "bg-white text-plum"}`}
          >
            Live demo <ArrowUpRight size={16} />
          </Link>
          <Link
            href={project.repoUrl}
            target="_blank"
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-full
                        text-sm font-medium border transition-all
                        hover:-translate-y-0.5
                        ${isLight
                          ? "border-plum/30 text-plum hover:bg-plum/5"
                          : "border-white/50 text-white hover:bg-white/10"}`}
          >
            <Github size={16} /> GitHub
          </Link>
          <Link
            href={`/projects/${project.slug}`}
            className={`inline-flex items-center gap-1 px-3 py-3 text-sm font-medium
                        underline underline-offset-4 decoration-1
                        ${isLight ? "text-plum-soft" : "text-white/80"}`}
          >
            Case study →
          </Link>
        </div>
      </div>

      {/* visual mock */}
      <div className="relative p-6 sm:p-8 flex items-center justify-center pb-10 lg:pb-8">
        {Mock}
      </div>
    </motion.article>
  );
}

/* —— decorative wavy lines layered behind content —— */
function DecoLines({ light }: { light: boolean }) {
  const stroke = light ? "rgba(42,27,61,0.18)" : "rgba(255,255,255,0.25)";
  const stroke2 = light ? "rgba(42,27,61,0.12)" : "rgba(255,255,255,0.18)";
  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
    >
      <path
        d="M0,100 C200,40 400,180 600,90 C780,15 1000,80 1000,80"
        stroke={stroke} strokeWidth="2" fill="none"
      />
      <path
        d="M0,420 C200,360 400,500 600,410 C780,335 1000,400 1000,400"
        stroke={stroke2} strokeWidth="2" fill="none"
      />
    </svg>
  );
}
