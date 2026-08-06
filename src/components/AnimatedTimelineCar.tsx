"use client";

import { motion } from "framer-motion";
import { Car } from "lucide-react";

export function AnimatedTimelineCar() {
  return (
    <motion.div 
      className="absolute -left-[14px] top-0 text-secondary z-10 bg-background rounded-full p-1 border border-secondary"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 5, ease: "linear", repeat: Infinity }}
    >
      <Car size={16} />
    </motion.div>
  );
}
