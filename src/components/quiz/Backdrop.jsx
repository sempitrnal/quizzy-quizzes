import React from 'react';
import { motion } from 'framer-motion';
function Backdrop({ children, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      className="fixed top-0 left-0 w-full h-full bg-[#00000073] flex justify-center items-center z-20"
    >
      {children}
    </motion.div>
  );
}

export default Backdrop;
