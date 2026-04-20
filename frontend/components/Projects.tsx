"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="work" className="relative z-10 py-24">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* head */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="section-label">Selected work</div>
            <h2 className="display-h2 text-plum mt-6
                           text-[clamp(36px,5vw,60px)]">
              Three projects, three <em className="text-blush-500">worlds</em>.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 0.4, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="font-display italic text-blush-500
                       text-[80px] leading-none"
          >
            03
          </motion.div>
        </div>

        {/* card list */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
