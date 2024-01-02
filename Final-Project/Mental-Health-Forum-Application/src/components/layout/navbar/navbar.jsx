import { useState } from "react";
import ThemeBtn from "../../ui/theme-btn";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navVariants } from "../../../utils/animate-variants";
import DropdownNavItems from "./signin-items";
import SearchNavbar from "./search-bar";
import NavLinks from "./navlink-items";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavItems = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="sticky top-0 w-full z-50 bg-dark-navy text-white">
        <div className="flex max-w-7xl mx-auto items-center justify-between gap-10 py-2 px-1 lg:px-0">
          <div className="font-semibold">
            <h1>Health Haven </h1>
            <span className="">Forum</span>
          </div>
          <div className="hidden md:flex gap-5 grow">
            <NavLinks />
          </div>
          <div className="hidden md:flex">
            <SearchNavbar />
          </div>
          <div className="hidden md:flex gap-4">
            <ThemeBtn />
            <DropdownNavItems />
          </div>
          <motion.div className="flex md:hidden gap-4 pr-2">
            <DropdownNavItems />
            <button onClick={toggleNavItems}>{isOpen ? <X /> : <Menu />}</button>
          </motion.div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div variants={navVariants} initial="closed" animate="open" exit="closed" className="flex flex-col items-center pt-2 pb-4 gap-2 bg-light-navy text-white rounded-b-md ">
            <SearchNavbar />
            <NavLinks />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
