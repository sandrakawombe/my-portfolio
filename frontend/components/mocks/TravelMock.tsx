"use client";

import { motion } from "framer-motion";

const trips = [
  { place: "Kyoto, Japan",      sub: "5 nights · spring bloom", price: "$1.2k", stars: "★★★★★ 4.9", grad: "from-lavender-300 to-blush-200" },
  { place: "Marrakesh, MA",     sub: "4 nights · medina stay",  price: "$890",  stars: "★★★★☆ 4.7", grad: "from-nude-200 to-nude-300" },
  { place: "Tulum, MX",         sub: "7 nights · cenote tour",  price: "$1.5k", stars: "★★★★★ 4.8", grad: "from-mint to-[#7FCBA3]" },
];

export default function TravelMock() {
  return (
    <motion.div
      initial={{ rotate: 2 }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="w-full max-w-[340px] flex flex-col gap-3"
    >
      {trips.map((t, i) => (
        <motion.div
          key={t.place}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
          className="bg-white/95 rounded-3xl p-4 flex items-center gap-3.5
                     shadow-xl"
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.grad} shrink-0`} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-plum text-sm">{t.place}</p>
            <p className="text-xs text-plum-soft mt-0.5">{t.sub}</p>
            <p className="text-[11px] text-magenta mt-0.5">{t.stars}</p>
          </div>
          <p className="font-display text-2xl text-plum">{t.price}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
