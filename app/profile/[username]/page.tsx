"use client"

import { useState } from "react"
import { MapPin, Share2, Star, Award, Users, Clock, Calendar } from "lucide-react"

// Mock volunteer data
const volunteerData = {
  name: "Sarah Chen",
  headline: "UX Designer passionate about creating accessible digital experiences for social good",
  location: "San Francisco, CA",
  profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
  stats: {
    tasksCompleted: 23,
    ngosHelped: 12,
    hoursContributed: 67,
  },
  badges: [
    { id: 1, name: "Impact Maker", icon: "🌟", description: "Completed 20+ tasks" },
    { id: 2, name: "Community Star", icon: "⭐", description: "Helped 10+ NGOs" },
    { id: 3, name: "Skill Hero", icon: "🎯", description: "Expert in multiple skills" },
    { id: 4, name: "Speed Demon", icon: "⚡", description: "Consistently meets deadlines" },
    { id: 5, name: "Team Player", icon: "🤝", description: "Excellent collaboration" },
    { id: 6, name: "Quality Champion", icon: "💎", description: "High-quality deliverables" },
  ],
  topSkills: [
    "UX/UI Design",
    "Graphic Design",
    "Prototyping",
    "User Research",
    "Adobe Creative Suite",
    "Figma",
    "Spanish Translation",
    "Content Writing",
  ],
  completedTasks: [
    {
      id: 1,
      ngoName: "GreenEarth Foundation",
      taskTitle: "Redesign Mobile App Interface for Environmental Tracking",
      completionDate: "January 2024",
      feedback:
        "Sarah's redesign completely transformed our user experience. The new interface is intuitive, beautiful, and has increased user engagement by 40%. Her attention to accessibility made our app usable for everyone.",
      rating: 5,
      ngoLogo: "🌱",
    },
    {
      id: 2,
      ngoName: "EduForAll Initiative",
      taskTitle: "Create Visual Learning Materials for Adult Literacy Program",
      completionDate: "December 2023",
      feedback:
        "The infographics and visual aids Sarah created have been game-changing for our adult learners. Her ability to simplify complex concepts into clear, engaging visuals is remarkable.",
      rating: 5,
      ngoLogo: "📚",
    },
    {
      id: 3,
      ngoName: "HealthFirst Network",
      taskTitle: "Design Patient Information Brochures in English and Spanish",
      completionDate: "November 2023",
      feedback:
        "Sarah delivered beautiful, culturally sensitive materials that our patients love. Her bilingual skills and design expertise made this project a huge success.",
      rating: 5,
      ngoLogo: "🏥",
    },
    {
      id: 4,
      ngoName: "TechForGood",
      taskTitle: "User Experience Audit for Nonprofit Management Platform",
      completionDate: "October 2023",
      feedback:
        "Sarah's UX audit was thorough and insightful. Her recommendations led to a 60% improvement in user satisfaction scores. Professional and detail-oriented work.",
      rating: 5,
      ngoLogo: "💻",
    },
    {
      id: 5,
      ngoName: "CleanWater Project",
      taskTitle: "Design Interactive Dashboard for Water Quality Monitoring",
      completionDate: "September 2023",
      feedback:
        "The dashboard Sarah designed helps us visualize water quality data in ways we never could before. It's both beautiful and functional - exactly what we needed.",
      rating: 4,
      ngoLogo: "💧",
    },
  ],
}

// Badge Component with Tooltip
function Badge({ badge }: { badge: (typeof volunteerData.badges)[0] }) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center text-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
        {badge.icon}
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-[#1A202C] text-white text-sm rounded-lg whitespace-nowrap z-10 animate-fade-in">
          <div className="font-medium">{badge.name}</div>
          <div className="text-xs opacity-90">{badge.description}</div>
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A202C]"></div>
        </div>
      )}
    </div>
  )
}

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className={`${star <= rating ? "text-[#FF9933] fill-current" : "text-gray-300"}`} />
      ))}
      <span className="text-sm text-[#718096] ml-2">({rating}/5)</span>
    </div>
  )
}

// Portfolio Card Component
function PortfolioCard({ task }: { task: (typeof volunteerData.completedTasks)[0] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-[#F7FAFC] rounded-full flex items-center justify-center mr-3 text-lg">
            {task.ngoLogo}
          </div>
          <div>
            <h3 className="font-semibold text-[#1A202C]">{task.ngoName}</h3>
            <div className="flex items-center text-sm text-[#718096]">
              <Calendar size={14} className="mr-1" />
              {task.completionDate}
            </div>
          </div>
        </div>
        <StarRating rating={task.rating} />
      </div>

      {/* Task Title */}
      <h4 className="text-lg font-bold text-[#1A202C] mb-4">{task.taskTitle}</h4>

      {/* Feedback */}
      <blockquote className="italic text-[#718096] border-l-4 border-[#FF9933] pl-4">"{task.feedback}"</blockquote>
    </div>
  )
}

export default function PublicProfilePage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${volunteerData.name}'s Impact Portfolio`,
          text: `Check out ${volunteerData.name}'s volunteer contributions on Aarambh`,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Profile link copied to clipboard!")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <img
              src={volunteerData.profilePicture || "/placeholder.svg"}
              alt={volunteerData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">{volunteerData.name}</h1>

          <h2 className="text-xl text-[#718096] mb-6 max-w-2xl mx-auto leading-relaxed">{volunteerData.headline}</h2>

          <div className="flex items-center justify-center text-[#718096] mb-8">
            <MapPin size={18} className="mr-2" />
            {volunteerData.location}
          </div>

          <button
            onClick={handleShare}
            className="bg-[#FF9933] text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 flex items-center mx-auto"
          >
            <Share2 size={18} className="mr-2" />
            Share Profile
          </button>
        </div>

        {/* Impact Stats Section */}
        <div className="bg-[#F7FAFC] rounded-lg p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <Award className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#1A202C] mb-2">{volunteerData.stats.tasksCompleted}</div>
              <p className="text-[#718096] font-medium">Tasks Completed</p>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#1A202C] mb-2">{volunteerData.stats.ngosHelped}</div>
              <p className="text-[#718096] font-medium">NGOs Helped</p>
            </div>

            <div className="text-center">
              <Clock className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#1A202C] mb-2">{volunteerData.stats.hoursContributed}</div>
              <p className="text-[#718096] font-medium">Hours Contributed</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Badges & Achievements</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {volunteerData.badges.map((badge) => (
              <Badge key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        {/* Top Skills Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Top Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {volunteerData.topSkills.map((skill, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#FF9933]/10 text-[#FF9933] font-medium rounded-full border border-[#FF9933]/20 hover:bg-[#FF9933]/20 transition-colors duration-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Impact Portfolio Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Completed Contributions</h2>
          <div className="space-y-6">
            {volunteerData.completedTasks.map((task) => (
              <PortfolioCard key={task.id} task={task} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-gray-200">
          <div className="flex items-center justify-center text-[#718096]">
            <span className="mr-2">Profile powered by</span>
            <span className="font-bold text-[#FF9933]">Aarambh</span>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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
