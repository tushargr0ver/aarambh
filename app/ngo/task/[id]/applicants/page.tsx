"use client"

import { useState } from "react"
import {
  ChevronDown,
  Building,
  Settings,
  LogOut,
  ArrowLeft,
  Download,
  FileText,
  ExternalLink,
  Check,
  X,
  ChevronLeft,
} from "lucide-react"

// Mock data for applicants
const mockApplicants = [
  {
    id: 1,
    name: "Sarah Chen",
    headline: "UX Designer passionate about creating accessible digital experiences",
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    submittedDocument: {
      filename: "sarah_chen_portfolio.pdf",
      size: "2.4 MB",
    },
    skills: ["UX/UI Design", "Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    responses: [
      {
        question: "What experience do you have with environmental campaigns?",
        answer:
          "I've worked on several sustainability projects including a mobile app for carbon footprint tracking and visual campaigns for local environmental groups. I'm passionate about using design to drive positive environmental change.",
      },
      {
        question: "Can you work with our brand guidelines?",
        answer:
          "I have extensive experience working within established brand guidelines and can adapt my design style to match your organization's visual identity while maintaining consistency across all materials.",
      },
    ],
    appliedDate: "2024-01-16",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    headline: "Graphic Designer specializing in social impact campaigns",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    submittedDocument: {
      filename: "marcus_rodriguez_resume.pdf",
      size: "1.8 MB",
    },
    skills: ["Graphic Design", "Adobe Creative Suite", "Social Media Design", "Branding", "Illustration"],
    responses: [
      {
        question: "What experience do you have with environmental campaigns?",
        answer:
          "I've designed materials for Earth Day campaigns, created infographics about climate change, and worked with three environmental nonprofits over the past two years. Environmental causes are close to my heart.",
      },
      {
        question: "Can you work with our brand guidelines?",
        answer:
          "Yes, I always ensure my work aligns perfectly with brand guidelines. I can provide examples of previous work where I've successfully maintained brand consistency across different media formats.",
      },
    ],
    appliedDate: "2024-01-15",
  },
  {
    id: 3,
    name: "Emily Watson",
    headline: "Creative Director with 8+ years in nonprofit marketing",
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    submittedDocument: {
      filename: "emily_watson_portfolio.pdf",
      size: "3.2 MB",
    },
    skills: ["Creative Direction", "Campaign Strategy", "Adobe Creative Suite", "Social Media", "Brand Development"],
    responses: [
      {
        question: "What experience do you have with environmental campaigns?",
        answer:
          "As Creative Director at EcoAction Alliance, I led campaigns that reached over 100K people and increased engagement by 300%. I understand how to create compelling visuals that drive environmental action.",
      },
      {
        question: "Can you work with our brand guidelines?",
        answer:
          "Brand consistency is crucial for nonprofit credibility. I have a proven track record of maintaining brand integrity while creating fresh, engaging content that resonates with target audiences.",
      },
    ],
    appliedDate: "2024-01-14",
  },
  {
    id: 4,
    name: "David Kim",
    headline: "Freelance designer focused on sustainability and social good",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    submittedDocument: {
      filename: "david_kim_work_samples.pdf",
      size: "4.1 MB",
    },
    skills: ["Graphic Design", "Sustainability Focus", "Print Design", "Digital Marketing", "Canva"],
    responses: [
      {
        question: "What experience do you have with environmental campaigns?",
        answer:
          "I've dedicated my freelance career to working exclusively with environmental and social impact organizations. Recent projects include designing for ocean cleanup initiatives and renewable energy campaigns.",
      },
      {
        question: "Can you work with our brand guidelines?",
        answer:
          "I always start every project by thoroughly reviewing brand guidelines and creating mood boards to ensure alignment. I believe consistency builds trust and recognition for important causes.",
      },
    ],
    appliedDate: "2024-01-13",
  },
]

const taskData = {
  title: "Design Social Media Graphics for Earth Day Campaign",
  id: 1,
}

// Applicant Card Component
function ApplicantCard({
  applicant,
  isSelected,
  onClick,
}: {
  applicant: (typeof mockApplicants)[0]
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected ? "border-[#FF9933] bg-[#FF9933]/5 shadow-md" : "border-gray-200 hover:border-[#FF9933]/50"
      }`}
    >
      <div className="flex items-center space-x-3">
        <img
          src={applicant.profilePicture || "/placeholder.svg"}
          alt={applicant.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-[#1A202C] truncate">{applicant.name}</h3>
          <p className="text-sm text-[#718096] line-clamp-2">{applicant.headline}</p>
        </div>
      </div>
    </div>
  )
}

// Confirmation Modal Component
function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  volunteerName,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  volunteerName: string
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-modal-slide-in">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Confirm Your Decision</h2>
          <p className="text-[#718096] mb-6 leading-relaxed">
            Are you sure you want to accept <strong>{volunteerName}</strong> for this task? This will notify the
            volunteer and automatically inform other applicants that the position has been filled.
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border-2 border-gray-300 text-[#1A202C] rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
            >
              Confirm & Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile Detail View Component
function MobileDetailView({
  applicant,
  onBack,
  onAccept,
  onDecline,
}: {
  applicant: (typeof mockApplicants)[0]
  onBack: () => void
  onAccept: () => void
  onDecline: () => void
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
        <button
          onClick={onBack}
          className="flex items-center text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200 mb-2"
        >
          <ChevronLeft size={20} className="mr-1" />
          Back to Applicants
        </button>
        <h1 className="text-xl font-bold text-[#1A202C]">{applicant.name}</h1>
      </div>

      {/* Mobile Content */}
      <div className="p-4 space-y-6">
        <div className="flex items-center space-x-4">
          <img
            src={applicant.profilePicture || "/placeholder.svg"}
            alt={applicant.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-lg font-bold text-[#1A202C]">{applicant.name}</h2>
            <p className="text-[#718096]">{applicant.headline}</p>
            <button className="mt-2 text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200 flex items-center text-sm">
              <ExternalLink size={14} className="mr-1" />
              View Public Portfolio
            </button>
          </div>
        </div>

        {/* Submitted Document */}
        <div>
          <h3 className="text-lg font-bold text-[#1A202C] mb-3">Submitted Document</h3>
          <div className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-lg border border-gray-200">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-[#FF9933] mr-3" />
              <div>
                <p className="font-medium text-[#1A202C]">{applicant.submittedDocument.filename}</p>
                <p className="text-sm text-[#718096]">{applicant.submittedDocument.size}</p>
              </div>
            </div>
            <button className="bg-[#FF9933] text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform duration-200 flex items-center">
              <Download size={16} className="mr-2" />
              Download
            </button>
          </div>
        </div>

        {/* Responses */}
        <div>
          <h3 className="text-lg font-bold text-[#1A202C] mb-4">Their Responses</h3>
          <div className="space-y-4">
            {applicant.responses.map((response, index) => (
              <div key={index}>
                <p className="font-medium text-[#1A202C] mb-2">{response.question}</p>
                <blockquote className="border-l-4 border-[#FF9933] pl-4 italic text-[#718096] bg-[#F7FAFC] p-3 rounded-r-lg">
                  "{response.answer}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-lg font-bold text-[#1A202C] mb-3">Volunteer's Skills</h3>
          <div className="flex flex-wrap gap-2">
            {applicant.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full border border-[#FF9933]/20 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-3 pt-6">
          <button
            onClick={onAccept}
            className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Check size={18} className="mr-2" />
            Accept Volunteer
          </button>
          <button
            onClick={onDecline}
            className="w-full border-2 border-gray-300 text-[#1A202C] py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
          >
            <X size={18} className="mr-2" />
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ReviewApplicantsPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState(mockApplicants[0])
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [isMobileDetailView, setIsMobileDetailView] = useState(false)
  const [fadeKey, setFadeKey] = useState(0)

  const handleApplicantSelect = (applicant: (typeof mockApplicants)[0]) => {
    if (window.innerWidth < 768) {
      setSelectedApplicant(applicant)
      setIsMobileDetailView(true)
    } else {
      setSelectedApplicant(applicant)
      setFadeKey((prev) => prev + 1) // Trigger fade transition
    }
  }

  const handleAccept = () => {
    setShowConfirmModal(true)
  }

  const handleConfirmAccept = () => {
    console.log("Accepting applicant:", selectedApplicant.name)
    setShowConfirmModal(false)
    // Handle acceptance logic here
  }

  const handleDecline = () => {
    console.log("Declining applicant:", selectedApplicant.name)
    // Handle decline logic here
  }

  // Mobile detail view
  if (isMobileDetailView) {
    return (
      <MobileDetailView
        applicant={selectedApplicant}
        onBack={() => setIsMobileDetailView(false)}
        onAccept={handleAccept}
        onDecline={handleDecline}
      />
    )
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
                <a href="/ngo/dashboard" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Dashboard
                </a>
                <a href="#post-task" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Post a Task
                </a>
                <a href="#volunteers" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Find Volunteers
                </a>
              </div>
            </div>

            {/* NGO Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-[#FF9933] rounded-full flex items-center justify-center text-white font-medium">
                  🌱
                </div>
                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <a
                    href="#organization-profile"
                    className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
                  >
                    <Building size={16} className="mr-2" />
                    Organization Profile
                  </a>
                  <a
                    href="#settings"
                    className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </a>
                  <hr className="my-2" />
                  <a
                    href="#logout"
                    className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
                  >
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
        {/* Header */}
        <div className="mb-8">
          <a
            href="/ngo/dashboard"
            className="inline-flex items-center text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </a>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C]">Applicants for: {taskData.title}</h1>
          <p className="text-[#718096] mt-2">{mockApplicants.length} applications received</p>
        </div>

        {/* Two-Panel Layout */}
        <div className="grid lg:grid-cols-10 gap-8">
          {/* Left Panel - Applicant List (30%) */}
          <div className="lg:col-span-3">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold text-[#1A202C] mb-4">All Applicants</h2>
              <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto">
                {mockApplicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    isSelected={selectedApplicant.id === applicant.id}
                    onClick={() => handleApplicantSelect(applicant)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Selected Applicant Details (70%) */}
          <div className="lg:col-span-7">
            <div key={fadeKey} className="animate-fade-in">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1A202C]">{selectedApplicant.name}</h2>
                <button className="border-2 border-[#FF9933] text-[#FF9933] px-4 py-2 rounded-lg font-medium hover:bg-[#FF9933] hover:text-white transition-colors duration-200 flex items-center">
                  <ExternalLink size={16} className="mr-2" />
                  View Public Portfolio
                </button>
              </div>

              {/* Profile Summary */}
              <div className="flex items-center space-x-4 mb-8 p-4 bg-[#F7FAFC] rounded-lg">
                <img
                  src={selectedApplicant.profilePicture || "/placeholder.svg"}
                  alt={selectedApplicant.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-bold text-[#1A202C]">{selectedApplicant.name}</h3>
                  <p className="text-[#718096]">{selectedApplicant.headline}</p>
                  <p className="text-sm text-[#718096] mt-1">
                    Applied on {new Date(selectedApplicant.appliedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Submitted Document */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#1A202C] mb-4">Submitted Document</h3>
                <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-10 h-10 text-[#FF9933] mr-4" />
                    <div>
                      <p className="font-medium text-[#1A202C]">{selectedApplicant.submittedDocument.filename}</p>
                      <p className="text-sm text-[#718096]">{selectedApplicant.submittedDocument.size}</p>
                    </div>
                  </div>
                  <button className="bg-[#FF9933] text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 flex items-center">
                    <Download size={16} className="mr-2" />
                    Download
                  </button>
                </div>
              </div>

              {/* Screening Questions */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#1A202C] mb-4">Their Responses</h3>
                <div className="space-y-6">
                  {selectedApplicant.responses.map((response, index) => (
                    <div key={index}>
                      <p className="font-medium text-[#1A202C] mb-3">{response.question}</p>
                      <blockquote className="border-l-4 border-[#FF9933] pl-6 italic text-[#718096] bg-[#F7FAFC] p-4 rounded-r-lg">
                        "{response.answer}"
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#1A202C] mb-4">Volunteer's Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedApplicant.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-[#FF9933]/10 text-[#FF9933] rounded-full border border-[#FF9933]/20 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleAccept}
                  className="flex-1 bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <Check size={18} className="mr-2" />
                  Accept Volunteer
                </button>
                <button
                  onClick={handleDecline}
                  className="flex-1 border-2 border-gray-300 text-[#1A202C] py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <X size={18} className="mr-2" />
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmAccept}
        volunteerName={selectedApplicant.name}
      />

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-modal-slide-in {
          animation: modalSlideIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
