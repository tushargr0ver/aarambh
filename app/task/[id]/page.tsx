'use client'

import { useState } from 'react'
import { ChevronDown, User, Settings, LogOut, MapPin, Clock, Calendar, Tag, CheckCircle, Share2, Facebook, Twitter, Linkedin, Upload, X } from 'lucide-react'

// Mock task data
const taskData = {
  id: 1,
  title: "Design Social Media Graphics for Earth Day Campaign",
  ngoName: "GreenEarth Foundation",
  ngoLogo: "🌱",
  isVerified: true,
  location: "Remote",
  duration: "Approx. 30 minutes",
  applyBy: "March 15, 2024",
  category: "Environment",
  skills: ["Graphic Design", "Social Media", "Adobe Creative Suite"],
  description: "Join us in creating impactful visual content for our Earth Day campaign! We're looking for a talented graphic designer to help us spread awareness about environmental conservation through compelling social media graphics. This campaign will reach over 50,000 followers across our social platforms and help educate communities about sustainable practices.",
  responsibilities: [
    "Create 3-5 Instagram post graphics with provided content and brand guidelines",
    "Design graphics in multiple formats (square, story, carousel)",
    "Ensure all designs align with our brand colors and messaging",
    "Provide final files in PNG and JPG formats",
    "Collaborate with our social media team for feedback and revisions"
  ],
  ngoMission: "GreenEarth Foundation is dedicated to environmental conservation and sustainability education. Since 2015, we've planted over 100,000 trees, educated 50,000+ students about climate change, and supported 200+ community gardens worldwide. Our mission is to create a sustainable future through grassroots environmental action and education."
}

export default function TaskDetailsPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false)
  const [applicationMessage, setApplicationMessage] = useState('')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setUploadedFile(file)
    } else {
      alert('File size must be under 5MB')
    }
  }

  const handleSubmitApplication = () => {
    // Handle application submission
    console.log('Application submitted:', { message: applicationMessage, file: uploadedFile })
    setIsApplicationModalOpen(false)
    // Show success message or redirect
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#1A202C]">Aarambh</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#how-it-works" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">How It Works</a>
                <a href="#for-ngos" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">For NGOs</a>
                <a href="/browse-tasks" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">Browse Tasks</a>
              </div>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center text-white font-medium">
                  J
                </div>
                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <a href="#dashboard" className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200">
                    <User size={16} className="mr-2" />
                    My Dashboard
                  </a>
                  <a href="#settings" className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </a>
                  <hr className="my-2" />
                  <a href="#logout" className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200">
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4">{taskData.title}</h1>
          <div className="flex items-center">
            <a href="#ngo-profile" className="text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200 font-medium">
              {taskData.ngoName}
            </a>
            {taskData.isVerified && (
              <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-10 gap-8">
          {/* Left Column - Task Details (70%) */}
          <div className="lg:col-span-7 space-y-8">
            {/* About the Task */}
            <section>
              <h2 className="text-2xl font-bold text-[#1A202C] mb-4">About the Task</h2>
              <p className="text-[#1A202C] leading-relaxed text-lg">
                {taskData.description}
              </p>
            </section>

            {/* Your Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Your Responsibilities</h2>
              <ul className="space-y-3">
                {taskData.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-[#FF9933] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-[#1A202C]">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Skills You'll Use */}
            <section>
              <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Skills You'll Use</h2>
              <div className="flex flex-wrap gap-3">
                {taskData.skills.map(skill => (
                  <span key={skill} className="px-4 py-2 bg-[#FF9933]/10 text-[#FF9933] font-medium rounded-full border border-[#FF9933]/20">
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* About the NGO */}
            <section className="bg-[#F7FAFC] rounded-lg p-6">
              <h2 className="text-2xl font-bold text-[#1A202C] mb-4">About {taskData.ngoName}</h2>
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 text-2xl">
                  {taskData.ngoLogo}
                </div>
                <p className="text-[#1A202C] leading-relaxed flex-1">
                  {taskData.ngoMission}
                </p>
              </div>
              <button className="border-2 border-[#FF9933] text-[#FF9933] px-6 py-3 rounded-lg font-medium hover:bg-[#FF9933] hover:text-white transition-colors duration-200">
                View NGO Profile
              </button>
            </section>
          </div>

          {/* Right Column - Summary & Action Box (30%) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#1A202C] mb-6">Task Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-[#718096] mr-3" />
                    <span className="text-[#1A202C]">{taskData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-[#718096] mr-3" />
                    <span className="text-[#1A202C]">{taskData.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-[#718096] mr-3" />
                    <span className="text-[#1A202C]">Apply by {taskData.applyBy}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-[#718096] mr-3" />
                    <span className="text-[#1A202C]">{taskData.category}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsApplicationModalOpen(true)}
                  className="w-full bg-[#FF9933] text-white py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform duration-200 mb-4"
                >
                  I'm Interested
                </button>

                <div className="text-center">
                  <p className="text-sm text-[#718096] mb-3">Share this opportunity</p>
                  <div className="flex justify-center space-x-3">
                    <button className="w-8 h-8 bg-[#F7FAFC] rounded-full flex items-center justify-center text-[#718096] hover:text-[#FF9933] transition-colors duration-200">
                      <Facebook size={16} />
                    </button>
                    <button className="w-8 h-8 bg-[#F7FAFC] rounded-full flex items-center justify-center text-[#718096] hover:text-[#FF9933] transition-colors duration-200">
                      <Twitter size={16} />
                    </button>
                    <button className="w-8 h-8 bg-[#F7FAFC] rounded-full flex items-center justify-center text-[#718096] hover:text-[#FF9933] transition-colors duration-200">
                      <Linkedin size={16} />
                    </button>
                    <button className="w-8 h-8 bg-[#F7FAFC] rounded-full flex items-center justify-center text-[#718096] hover:text-[#FF9933] transition-colors duration-200">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {isApplicationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
            onClick={() => setIsApplicationModalOpen(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-modal-slide-in">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A202C]">Apply for: {taskData.title}</h2>
                <button
                  onClick={() => setIsApplicationModalOpen(false)}
                  className="text-[#718096] hover:text-[#1A202C] transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#1A202C] mb-2">
                    Why are you a good fit for this task? (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Tell us about your relevant experience and why you're excited about this opportunity..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#1A202C] mb-2">
                    Upload your Resume or a Work Sample (PDF, max 5MB)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#FF9933] transition-colors duration-200">
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-[#718096] mx-auto mb-2" />
                      {uploadedFile ? (
                        <p className="text-[#1A202C] font-medium">{uploadedFile.name}</p>
                      ) : (
                        <>
                          <p className="text-[#1A202C] font-medium">Click to upload a file</p>
                          <p className="text-sm text-[#718096]">PDF files only, max 5MB</p>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    onClick={() => setIsApplicationModalOpen(false)}
                    className="px-6 py-3 border-2 border-gray-300 text-[#1A202C] rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitApplication}
                    className="px-8 py-3 bg-[#FF9933] text-white rounded-lg font-medium hover:scale-105 transition-transform duration-200"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-modal-slide-in {
          animation: modalSlideIn 0.3s ease-out forwards;
        }
        
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}
