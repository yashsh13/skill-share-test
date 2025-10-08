import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center h-20 bg-yellow-200 shadow-inner relative">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-yellow-700 text-lg md:text-xl"
      >
        👾 SolveMeet – Connect. Solve. Play. 🎉
      </motion.div>
    </footer>
  );
};

export default Footer;
