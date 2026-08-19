import React from 'react';
import { motion } from 'motion/react';

export default function Ticker() {
  const words = [
    "BESPOKE TAILORING",
    "MUSHANANA COLLECTION",
    "SCHOOL & CORPORATE UNIFORMS",
    "PREMIUM FABRICS",
    "HANDCRAFTED IN KIGALI",
    "ALTERATIONS & CONSULTATION",
  ];

  return (
    <div className="bg-transparent text-champagne py-4 overflow-hidden flex whitespace-nowrap border-t border-champagne/10 backdrop-blur-sm">
      <motion.div 
        className="flex space-x-12 px-6"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {/* Double the array for seamless loop */}
        {[...words, ...words, ...words].map((word, i) => (
          <div key={i} className="flex items-center space-x-12">
            <span className="font-sans text-[10px] uppercase tracking-[0.3em]">{word}</span>
            <span className="w-1.5 h-1.5 bg-champagne/40 rounded-full"></span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
