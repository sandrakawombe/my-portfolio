"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";

const links = [
  { href: "#about",   label: "About" },
  { href: "#work",    label: "Work" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      className="sticky top-0 z-50 backdrop-blur-xl bg-cream/65
                 border-b border-lavender-600/10"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-4
                      flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5
                                  font-display text-[22px] font-medium text-plum">
          <span className="w-2.5 h-2.5 rounded-full
                           bg-gradient-to-br from-magenta to-lavender-600" />
          Sandra<em className="not-italic italic text-blush-500">.</em>
        </Link>

        {/* desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
                  className="text-sm font-medium text-plum-soft
                             transition-colors hover:text-magenta">
              {l.label}
            </Link>
          ))}
          <Link href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full
                           bg-plum-ink text-cream text-sm font-medium shadow-ink
                           transition-all hover:-translate-y-0.5 hover:shadow-lg">
            Let&apos;s talk <ArrowRight size={14} />
          </Link>
        </div>

        {/* mobile trigger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden w-10 h-10 rounded-full bg-plum-ink text-cream
                     flex items-center justify-center transition-transform active:scale-95"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="md:hidden overflow-hidden border-t border-lavender-600/10"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
                      className="px-4 py-3 rounded-2xl text-base font-medium text-plum
                                 hover:bg-lavender-100 transition-colors">
                  {l.label}
                </Link>
              ))}
              <Link href="#contact" onClick={() => setOpen(false)}
                    className="mt-2 px-4 py-3 rounded-2xl text-base font-medium
                               bg-plum-ink text-cream text-center">
                Let&apos;s talk →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
