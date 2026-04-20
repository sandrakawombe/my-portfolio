"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const bars = [30, 70, 50, 90, 60, 80, 40, 65, 50, 75, 35, 55];

export default function ToTextMock() {
  return (
    <motion.div
      initial={{ rotate: -2 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="w-full max-w-[320px] bg-white/96 rounded-3xl p-5
                 shadow-2xl"
    >
      {/* mic + label */}
      <div className="flex items-center gap-3 pb-4 border-b border-plum/8">
        <div className="w-11 h-11 rounded-full
                        bg-gradient-to-br from-magenta to-blush-500
                        flex items-center justify-center text-white
                        animate-pulseRing">
          <Mic size={20} />
        </div>
        <div className="text-xs text-plum-soft">
          <p className="text-plum text-sm font-semibold">Recording…</p>
          en-US · auto-punctuate
        </div>
      </div>

      {/* transcript */}
      <p className="mt-3.5 font-display text-[13.5px] leading-relaxed text-plum">
        &quot;I think we should ship the new dashboard first, then layer in the
        analytics view.{" "}
        <span className="bg-gradient-to-b from-transparent from-[60%] to-magenta/25 to-[60%]">
          Let&apos;s review on Friday.
        </span>
        &quot;
      </p>

      {/* waveform */}
      <div className="mt-4 pt-3.5 border-t border-plum/8
                      flex items-end gap-[3px] h-8">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 bg-magenta rounded-sm origin-bottom"
            style={{ height: `${h}%` }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
