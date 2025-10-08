import React from "react";
import { motion } from "framer-motion";
import { FaBell, FaCoins, FaUser, FaDoorOpen } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-yellow-300 shadow-lg">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="flex gap-8 text-yellow-800 text-lg md:text-xl"
      >
        <button className="flex items-center gap-2">
          <FaDoorOpen /> Room
        </button>
        <button className="flex items-center gap-2">
          <FaCoins /> Coins
        </button>
        <button className="flex items-center gap-2">
          <FaBell /> Notifications
        </button>
        <button className="flex items-center gap-2">
          <FaUser /> Profile
        </button>
      </motion.div>
    </header>
  );
};

export default Header;
