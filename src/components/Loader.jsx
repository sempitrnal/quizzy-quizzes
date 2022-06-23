import React from "react";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";
function Loader({ variants }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate="visible"
      exit={{ opacity: 0 }}
      className="fixed flex justify-center  bottom-[50%] w-screen  "
      variants={variants}
    >
      <ClipLoader color="#4D5B9E" />
    </motion.div>
  );
}

export default Loader;
