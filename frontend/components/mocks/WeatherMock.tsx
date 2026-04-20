"use client";

import { motion } from "framer-motion";

export default function WeatherMock() {
  return (
    <motion.div
      initial={{ rotate: -3 }}
      whileHover={{ rotate: -1, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="w-full max-w-[320px] rounded-3xl p-6 text-white
                 backdrop-blur-xl bg-white/18 border border-white/30
                 shadow-2xl"
    >
      <p className="text-xs opacity-85">Lisbon, Portugal</p>
      <p className="font-display font-light text-7xl leading-none my-1.5">23°</p>
      <p className="text-sm opacity-85">Partly cloudy · feels 22°</p>

      <div className="flex gap-2 mt-5 pt-4 border-t border-white/20">
        {[
          { v: "68%",     l: "humidity" },
          { v: "12 km/h", l: "wind" },
          { v: "7",       l: "UV" },
        ].map((c) => (
          <div key={c.l} className="flex-1 text-center text-xs">
            <p className="text-base font-medium">{c.v}</p>
            <p className="opacity-80">{c.l}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
