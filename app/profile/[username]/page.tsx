"use client"

import { useState, useEffect } from "react"
import { MapPin, Share2, Star, Award, Users, Clock, Calendar } from "lucide-react"

// Define a type for the profile data for type safety
interface ProfileData {
  name: string;
  headline: string;
  location: string;
  profilePicture: string;
  stats: {
    tasksCompleted: number;
    ngosHelped: number;
    hoursContributed: number;
  };
  badges: { id: number; name: string; icon: string; description: string }[];
  topSkills: string[];
  completedTasks: {
    id: number;
    ngoName: string;
    taskTitle: string;
    completionDate: string;
    feedback: string;
    rating: number;
    ngoLogo: string;
  }[];
}

// Badge Component with Tooltip
function Badge({ badge }: { badge: ProfileData['badges'][0] }) {
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
function PortfolioCard({ task }: { task: ProfileData['completedTasks'][0] }) {
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

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  const { username } = params; // Destructure username here
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchProfileData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/profile/${username}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to load profile.");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]); // Use the destructured variable in the dependency array

  const handleShare = async () => {
    if (!profileData) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileData.name}'s Impact Portfolio`,
          text: `Check out ${profileData.name}'s volunteer contributions on Aarambh`,
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl font-medium text-[#718096]">Loading Profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-2xl font-bold text-red-500 mb-2">Oops! Something went wrong.</h2>
          <p className="text-lg text-[#718096]">{error}</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return null; // Or a more specific "not found" component
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <img
              src={profileData.profilePicture || "/placeholder.svg"}
              alt={profileData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#1A202C] mb-4">{profileData.name}</h1>

          <h2 className="text-xl text-[#718096] mb-6 max-w-2xl mx-auto leading-relaxed">{profileData.headline}</h2>

          <div className="flex items-center justify-center text-[#718096] mb-8">
            <MapPin size={18} className="mr-2" />
            {profileData.location}
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
              <div className="text-3xl font-bold text-[#1A202C] mb-2">{profileData.stats.tasksCompleted}</div>
              <p className="text-[#718096] font-medium">Tasks Completed</p>
            </div>

            <div className="text-center">
              <Users className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#1A202C] mb-2">{profileData.stats.ngosHelped}</div>
              <p className="text-[#718096] font-medium">NGOs Helped</p>
            </div>

            <div className="text-center">
              <Clock className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#1A202C] mb-2">{profileData.stats.hoursContributed}</div>
              <p className="text-[#718096] font-medium">Hours Contributed</p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Badges & Achievements</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
            {profileData.badges.map((badge) => (
              <Badge key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        {/* Top Skills Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#1A202C] mb-8 text-center">Top Skills</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {profileData.topSkills.map((skill, index) => (
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
            {profileData.completedTasks.map((task) => (
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
