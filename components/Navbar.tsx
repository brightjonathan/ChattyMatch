"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down → hide
      } else {
        setShowNavbar(true); // scrolling up → show
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const authLinks = [
    { href: "/matches", label: "Discover", color: "hover:text-pink-600 dark:hover:text-pink-400" },
    { href: "/matches/list", label: "Matches", color: "hover:text-blue-600 dark:hover:text-blue-400" },
    { href: "/chat", label: "Messages", color: "hover:text-green-600 dark:hover:text-green-400" },
    { href: "/profile", label: "Profile", color: "hover:text-purple-600 dark:hover:text-purple-400" },
  ];

  const guestLinks = [
    { href: "/about", label: "About", color: "hover:text-purple-600 dark:hover:text-purple-400" },
    { href: "/contact", label: "Contact", color: "hover:text-pink-600 dark:hover:text-pink-400" },
    { href: "/policies", label: "Policies", color: "hover:text-blue-600 dark:hover:text-blue-400" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: showNavbar ? 0 : -80 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-900 border-b border-gray-200/50 dark:border-gray-700/50 shadow-md"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center space-x-3">
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
              ChattyMatch
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center space-x-8">
            {(user ? authLinks : guestLinks).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-300 font-medium transition-colors duration-200 ${link.color}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* DESKTOP BUTTON */}
          {user ? (
            <button
              onClick={signOut}
              className="hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth"
              className="hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Sign In
            </Link>
          )}

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden text-gray-300 focus:outline-none"
          >
            <FaBarsStaggered size={26} />
          </button>
        </div>
      </div>

      {/* MOBILE SLIDE-IN MENU */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Blurred Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar with spring animation */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="fixed top-0 right-0 w-72 h-full bg-slate-800/70 backdrop-blur-md z-50 shadow-lg flex flex-col"
            >
              {/* Header with Logo + Close */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <span className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-200 bg-clip-text text-transparent">
                    ChattyMatch
                  </span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="text-gray-300">
                  <IoClose size={28} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-4 p-6">
                {(user ? authLinks : guestLinks).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-gray-200 text-lg font-medium transition-colors duration-200 ${link.color}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Auth Buttons */}
              <div className="mt-auto p-6">
                {user ? (
                  <button
                    onClick={() => {
                      signOut();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    href="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm font-medium rounded-lg hover:from-pink-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg text-center"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
