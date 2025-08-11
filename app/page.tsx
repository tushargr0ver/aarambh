'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Search, Puzzle, Star, ChevronRight, Linkedin, Twitter } from 'lucide-react'

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isScrolled to true if user has scrolled more than 10px
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-section');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                Aarambh
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#how-it-works" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">How It Works</a>
                <Link href="/ngo/dashboard" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">For NGOs</Link>
                <Link href="/browse-tasks" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">Browse Tasks</Link>
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">Log In</Link>
              <Link href="/dashboard" className="bg-[#FF9933] text-white px-6 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200">
                Sign Up
              </Link>
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
                <a href="#how-it-works" className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">How It Works</a>
                <Link href="/ngo/dashboard" className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">For NGOs</Link>
                <Link href="/browse-tasks" className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">Browse Tasks</Link>
                <Link href="/dashboard" className="block px-3 py-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">Log In</Link>
                <Link href="/dashboard" className="w-full mt-2 bg-[#FF9933] text-white px-6 py-2 rounded-lg font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 fade-in-section opacity-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#1A202C] leading-tight mb-6">
                Your Skills, Their Mission. Impact in Minutes.
              </h1>
              <p className="text-xl text-[#718096] mb-8 leading-relaxed">
                Aarambh connects you with non-profits for short, skill-based volunteering tasks. Make a real difference, one micro-task at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/browse-tasks" className="bg-[#FF9933] text-white px-8 py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform duration-200 text-center">
                  Explore Opportunities
                </Link>
                <Link href="/ngo/dashboard" className="border-2 border-[#FF9933] text-[#FF9933] px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#FF9933] hover:text-white transition-colors duration-200 text-center">
                  I'm an NGO
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-96 h-96 bg-gradient-to-br from-[#FF9933]/20 to-[#FF9933]/5 rounded-full flex items-center justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-[#FF9933]/30 to-[#FF9933]/10 rounded-full flex items-center justify-center">
                  <div className="w-32 h-32 bg-[#FF9933]/20 rounded-full flex items-center justify-center">
                    <div className="text-6xl">🤝</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 fade-in-section opacity-0">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-[#718096] font-medium tracking-wider mb-8">TRUSTED BY LEADING SOCIAL ORGANIZATIONS</p>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-2xl font-bold text-[#718096]">GreenEarth</div>
            <div className="text-2xl font-bold text-[#718096]">EduForAll</div>
            <div className="text-2xl font-bold text-[#718096]">HealthFirst</div>
            <div className="text-2xl font-bold text-[#718096]">CleanWater</div>
            <div className="text-2xl font-bold text-[#718096]">FoodBank</div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 fade-in-section opacity-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A202C] text-center mb-16">Make an Impact in Three Easy Steps</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-[#FF9933]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A202C] mb-4">1. Find a Task</h3>
              <p className="text-[#718096]">Browse through meaningful micro-tasks that match your skills and interests.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Puzzle className="w-8 h-8 text-[#FF9933]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A202C] mb-4">2. Complete the Gig</h3>
              <p className="text-[#718096]">Use your expertise to complete short, impactful tasks for non-profits.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF9933]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-[#FF9933]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A202C] mb-4">3. Track Your Impact</h3>
              <p className="text-[#718096]">See the real difference you're making in communities around the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tasks Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] fade-in-section opacity-0">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-[#1A202C] text-center mb-16">See Where You Can Help Right Now</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-sm font-medium text-[#718096] mb-2">GreenEarth Foundation</h3>
              <h4 className="text-xl font-bold text-[#1A202C] mb-4">Design Social Media Graphics for Earth Day Campaign</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Graphic Design</span>
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Social Media</span>
              </div>
              <Link href="/task/1" className="text-[#FF9933] font-medium hover:text-[#1A202C] transition-colors duration-200 flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-sm font-medium text-[#718096] mb-2">EduForAll Initiative</h3>
              <h4 className="text-xl font-bold text-[#1A202C] mb-4">Translate Educational Content to Spanish</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Translation</span>
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Education</span>
              </div>
              <Link href="/task/2" className="text-[#FF9933] font-medium hover:text-[#1A202C] transition-colors duration-200 flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-sm font-medium text-[#718096] mb-2">HealthFirst Network</h3>
              <h4 className="text-xl font-bold text-[#1A202C] mb-4">Write Blog Post on Mental Health Awareness</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Content Writing</span>
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Healthcare</span>
              </div>
              <Link href="/task/3" className="text-[#FF9933] font-medium hover:text-[#1A202C] transition-colors duration-200 flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
          <div className="text-center">
            <Link href="/browse-tasks" className="bg-[#FF9933] text-white px-8 py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform duration-200">
              Browse All Tasks
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] fade-in-section opacity-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#1A202C] mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-[#718096] mb-8">Join a community of changemakers today. Your skills are needed.</p>
          <Link href="/dashboard" className="bg-[#FF9933] text-white px-12 py-4 rounded-lg font-medium text-xl hover:scale-105 transition-transform duration-200">
            Sign Up for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A202C] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold mb-4 hover:text-[#FF9933] transition-colors duration-200">Aarambh</Link>
              <p className="text-gray-400">Connecting skills with social impact, one task at a time.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Volunteers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/browse-tasks" className="hover:text-white transition-colors duration-200">Browse Tasks</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors duration-200">How it Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For NGOs</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/ngo/post-task" className="hover:text-white transition-colors duration-200">Post a Task</Link></li>
              </ul>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Linkedin size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Aarambh. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}