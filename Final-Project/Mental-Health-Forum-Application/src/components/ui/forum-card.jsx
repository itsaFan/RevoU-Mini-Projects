/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LOCAL_STORAGE_PREFIX } from "../../utils/ls-prefixes";
import { forumCardVariants } from "../../utils/animate-variants";

export default function ForumCard({ title, children, id, icon }) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const storedState = localStorage.getItem(LOCAL_STORAGE_PREFIX + id);
    if (storedState !== null) {
      setIsOpen(storedState === "open");
    }
  }, [id]);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem(LOCAL_STORAGE_PREFIX + id, newState ? "open" : "closed");
  };

  return (
    <motion.div layout className="border border-gray-200 rounded-t-lg md:rounded-tl-lg shadow mb-2 p dark:border-transparent">
      <div className="bg-dark-navy rounded-t-lg md:rounded-none md:rounded-tl-lg">
        <motion.h2 layout="position" onClick={handleToggle} className="flex text-white text-lg font-semibold gap-2 py-3 px-4 ">
          {icon}
          {title}
        </motion.h2>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            variants={forumCardVariants} 
            transition={{ duration: 0.50 }} 
            initial="closed" 
            animate="open" 
            exit="closed" 
            className="bg-white">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
