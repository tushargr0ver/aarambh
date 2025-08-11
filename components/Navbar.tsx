"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react"; // You can use any icon lib like Lucide or HeroIcons
import LoginOverlay from "./LoginOverlay";
import SignupOverlay from "./SignupOverlay";

type NavbarProps = {
  setLoginOverlay: (value: boolean) => void;
  setSignupOverlay: (value: boolean) => void;
};

const Navbar = ({ setLoginOverlay, setSignupOverlay }: NavbarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? "bg-white/95 backdrop-blur-sm shadow-sm"
                    : "bg-white/90 backdrop-blur-sm"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <h1 className="text-2xl font-bold text-[#1A202C]">Aarambh</h1>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <a
                                href="#how-it-works"
                                className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                How It Works
                            </a>
                            <a
                                href="#for-ngos"
                                className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                For NGOs
                            </a>
                            <a
                                href="#browse-tasks"
                                className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                Browse Tasks
                            </a>
                        </div>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button
                            onClick={() => setLoginOverlay(true)}
                            className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                        >
                            Log In
                        </button>

                        <button
                            onClick={() => setSignupOverlay(true)}
                            className="bg-[#FF9933] text-white px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200"
                        >
                            Sign Up
                        </button>

                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
                            <a
                                href="#how-it-works"
                                className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                How It Works
                            </a>
                            <a
                                href="#for-ngos"
                                className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                For NGOs
                            </a>
                            <a
                                href="#browse-tasks"
                                className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                Browse Tasks
                            </a>
                            <a
                                href="#login"
                                className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
                            >
                                Log In
                            </a>
                            <button className="w-full mt-2 bg-[#FF9933] text-white px-6 py-2 rounded-lg font-medium">
                                Sign Up
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
