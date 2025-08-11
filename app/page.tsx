"use client";
import { useEffect } from 'react';
import { Search, Puzzle, Star, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  useEffect(() => {
    const handleScroll = () => {
      // You could implement scroll behavior if needed
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
                <button className="bg-[#FF9933] text-white px-8 py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform duration-200">
                  Explore Opportunities
                </button>
                <button className="border-2 border-[#FF9933] text-[#FF9933] px-8 py-4 rounded-lg font-medium text-lg hover:bg-[#FF9933] hover:text-white transition-colors duration-200">
                  I'm an NGO
                </button>
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
              <a href="#" className="text-[#FF9933] font-medium hover:text-[#1A202C] transition-colors duration-200 flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-sm font-medium text-[#718096] mb-2">EduForAll Initiative</h3>
              <h4 className="text-xl font-bold text-[#1A202C] mb-4">Translate Educational Content to Spanish</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Translation</span>
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Education</span>
              </div>
              <a href="#" className="text-[#FF9933] font-medium hover:text-[#1A202C] transition-colors duration-200 flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-sm font-medium text-[#718096] mb-2">HealthFirst Network</h3>
              <h4 className="text-xl font-bold text-[#1A202C] mb-4">Write Blog Post on Mental Health Awareness</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Content Writing</span>
                <span className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">Healthcare</span>
              </div>
              <a href="#" className="text-[#FF9933] font-medium hover:text-[#1A202C] transition-colors duration-200 flex items-center">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-[#FF9933] text-white px-8 py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform duration-200">
              Browse All Tasks
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F7FAFC] fade-in-section opacity-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#1A202C] mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-[#718096] mb-8">Join a community of changemakers today. Your skills are needed.</p>
          <button className="bg-[#FF9933] text-white px-12 py-4 rounded-lg font-medium text-xl hover:scale-105 transition-transform duration-200">
            Sign Up for Free
          </button>
        </div>
      </section>

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
