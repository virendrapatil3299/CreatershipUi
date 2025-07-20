"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Info,
  Phone,
  BarChart3,
  TrendingUp,
  Search,
} from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/icon.png" alt="Logo" className="w-8 h-8" />
          <span className="font-bold text-3xl text-orange-500">CREATOR</span>
          <span className="font-bold text-3xl text-black">SHIPS</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-md font-medium text-gray-800">
          <div className="group relative">
            <button className="flex items-center gap-1 hover:text-black transition">
              <BarChart3 className="w-4 h-4" />
              Features
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute top-full left-0 mt-4 w-[600px] bg-white rounded-2xl shadow-xl border border-gray-200 p-4 flex gap-4 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition duration-300">
              <div className="w-1/2 p-4 border rounded-xl hover:shadow-md transition">
                <div className="bg-orange-50 p-2 rounded-full w-10 h-10 flex justify-center items-center">
                  <Search className="text-orange-500" />
                </div>
                <h4 className="font-semibold text-md mt-2">Creator Discovery</h4>
                <p className="text-sm text-gray-600">
                  Discover undervalued creators using AI filters and insights.
                </p>
                <a
                  href="#creator-discovery"
                  className="text-orange-500 text-sm font-semibold hover:underline mt-2 inline-block"
                >
                  Explore →
                </a>
              </div>

              <div className="w-1/2 p-4 border rounded-xl hover:shadow-md transition">
                <div className="bg-orange-50 p-2 rounded-full w-10 h-10 flex justify-center items-center">
                  <TrendingUp className="text-orange-500" />
                </div>
                <h4 className="font-semibold text-md mt-2">Competitor Analysis</h4>
                <p className="text-sm text-gray-600">
                  Track competitors and analyze strategies & performance.
                </p>
                <a
                  href="#competitor-analysis"
                  className="text-orange-500 text-sm font-semibold hover:underline mt-2 inline-block"
                >
                  Explore →
                </a>
              </div>
            </div>
          </div>

          <a href="#about" className="flex items-center gap-1 hover:text-black transition">
            <Info className="w-4 h-4" />
            About
          </a>
          <a href="#contact" className="flex items-center gap-1 hover:text-black transition">
            <Phone className="w-4 h-4" />
            Contact
          </a>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/SignIn" className="text-md font-semibold text-black hover:underline">
            Log in
          </Link>
          <Link
            href="/SignUp"
            className="bg-gradient-to-r from-orange-500 to-red-400 hover:opacity-90 text-white px-5 py-2 rounded-full text-md font-semibold shadow"
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-8 h-8 text-orange-600 bg-white p-1 rounded-xl shadow" />
            ) : (
              <Menu className="w-6 h-6 text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-6 pt-2 space-y-4 text-base font-medium text-gray-800 bg-white border-t shadow">
          <div>
            <button
              onClick={() => setShowMobileDropdown(!showMobileDropdown)}
              className="flex items-center justify-between w-full hover:text-black"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-orange-600" />
                Features
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${showMobileDropdown ? "rotate-180" : ""}`} />
            </button>
            {showMobileDropdown && (
              <div className="ml-6 mt-3 space-y-3">
                <a href="#creator-discovery" className="flex items-center gap-2 text-sm hover:text-black">
                  <Search className="w-4 h-4 text-orange-600" />
                  Creator Discovery
                </a>
                <a href="#competitor-analysis" className="flex items-center gap-2 text-sm hover:text-black">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  Competitor Analysis
                </a>
              </div>
            )}
          </div>

          <a href="#about" className="flex items-center gap-2 hover:text-black">
            <Info className="w-4 h-4 text-orange-600" />
            About
          </a>
          <a href="#contact" className="flex items-center gap-2 hover:text-black">
            <Phone className="w-4 h-4 text-orange-600" />
            Contact
          </a>

          <div className="flex flex-col gap-3 pt-3">
            <Link href="/SignIn" className="w-full border border-orange-500 px-4 py-2 rounded-full text-center hover:bg-orange-50">
              Log in
            </Link>
            <Link
              href="/SignUp"
              className="w-full bg-gradient-to-r from-orange-500 to-red-400 text-white px-4 py-2 rounded-full text-center shadow font-semibold hover:opacity-90"
            >
              Sign up free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
