import React from 'react';
import { ClipLoader } from 'react-spinners';
import { motion, AnimatePresence } from 'framer-motion';
function Loader({ variants }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="fixed top-[28rem] right-[60rem]"
      variants={variants}
    >
      <ClipLoader color="#4D5B9E" />
    </motion.div>
  );
}

export default Loader;
