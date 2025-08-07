'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, ChevronDown, MapPin, Clock, User, Settings, LogOut, X } from 'lucide-react'
import Link from 'next/link'

// Mock data for tasks
const mockTasks = [
  {
    id: 1,
    ngoName: "GreenEarth Foundation",
    ngoLogo: "🌱",
    title: "Design Social Media Graphics for Earth Day Campaign",
    skills: ["Graphic Design", "Social Media"],
    location: "Remote",
    duration: "2-3 hours",
    category: "Environment",
    datePosted: "2024-01-15",
    type: "Remote"
  },
  {
    id: 2,
    ngoName: "EduForAll Initiative",
    ngoLogo: "📚",
    title: "Translate Educational Content to Spanish",
    skills: ["Translation", "Education"],
    location: "Remote",
    duration: "Under 30 mins",
    category: "Education",
    datePosted: "2024-01-14",
    type: "Remote"
  },
  {
    id: 3,
    ngoName: "HealthFirst Network",
    ngoLogo: "🏥",
    title: "Write Blog Post on Mental Health Awareness",
    skills: ["Content Writing", "Healthcare"],
    location: "Remote",
    duration: "1-2 hours",
    category: "Healthcare",
    datePosted: "2024-01-13",
    type: "Remote"
  },
  {
    id: 4,
    ngoName: "CleanWater Project",
    ngoLogo: "💧",
    title: "Create Infographic on Water Conservation",
    skills: ["Graphic Design", "Research"],
    location: "Remote",
    duration: "3-4 hours",
    category: "Environment",
    datePosted: "2024-01-12",
    type: "Remote"
  },
  {
    id: 5,
    ngoName: "FoodBank Alliance",
    ngoLogo: "🍎",
    title: "Volunteer Coordinator for Weekend Event",
    skills: ["Event Planning", "Communication"],
    location: "New York, NY",
    duration: "4+ hours",
    category: "Community",
    datePosted: "2024-01-11",
    type: "On-site"
  },
  {
    id: 6,
    ngoName: "TechForGood",
    ngoLogo: "💻",
    title: "Code Review for Nonprofit Website",
    skills: ["Web Development", "Code Review"],
    location: "Remote",
    duration: "1-2 hours",
    category: "Technology",
    datePosted: "2024-01-10",
    type: "Remote"
  }
]

export default function BrowseTasksPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Most Recent')
  const [filteredTasks, setFilteredTasks] = useState(mockTasks)
  const [isLoading, setIsLoading] = useState(false)

  // Filter states
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState('')
  const [selectedTaskType, setSelectedTaskType] = useState('')
  const [selectedDatePosted, setSelectedDatePosted] = useState('')

  const skillOptions = ['Writing', 'Design', 'Translation', 'Web Development', 'Event Planning', 'Research', 'Communication']
  const categoryOptions = ['Environment', 'Education', 'Healthcare', 'Technology', 'Community']

  // Apply filters and search
  useEffect(() => {
    setIsLoading(true)
    
    setTimeout(() => {
      let filtered = mockTasks.filter(task => {
        const matchesSearch = searchQuery === '' || 
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.ngoName.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesSkills = selectedSkills.length === 0 || 
          selectedSkills.some(skill => task.skills.some(taskSkill => taskSkill.includes(skill)))
        
        const matchesCategory = selectedCategories.length === 0 || 
          selectedCategories.includes(task.category)
        
        const matchesType = selectedTaskType === '' || task.type === selectedTaskType
        
        return matchesSearch && matchesSkills && matchesCategory && matchesType
      })

      // Sort results
      if (sortBy === 'Most Recent') {
        filtered.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      }

      setFilteredTasks(filtered)
      setIsLoading(false)
    }, 300)
  }, [searchQuery, selectedSkills, selectedCategories, selectedAvailability, selectedTaskType, selectedDatePosted, sortBy])

  const clearAllFilters = () => {
    setSelectedSkills([])
    setSelectedCategories([])
    setSelectedAvailability('')
    setSelectedTaskType('')
    setSelectedDatePosted('')
    setSearchQuery('')
  }

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const FilterSidebar = ({ isMobile = false }) => (
    <div className={`${isMobile ? 'p-6' : 'p-6'} space-y-6`}>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1A202C]">Filters</h2>
        {isMobile && (
          <button 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="text-[#718096] hover:text-[#1A202C]"
          >
            <X size={24} />
          </button>
        )}
      </div>

      {/* Skill Required */}
      <div>
        <h3 className="font-semibold text-[#1A202C] mb-3">Skill Required</h3>
        <div className="space-y-2">
          {skillOptions.map(skill => (
            <label key={skill} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={() => handleSkillToggle(skill)}
                className="mr-2 text-[#FF9933] focus:ring-[#FF9933]"
              />
              <span className="text-[#1A202C]">{skill}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Task Category */}
      <div>
        <h3 className="font-semibold text-[#1A202C] mb-3">Task Category</h3>
        <div className="space-y-2">
          {categoryOptions.map(category => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
                className="mr-2 text-[#FF9933] focus:ring-[#FF9933]"
              />
              <span className="text-[#1A202C]">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability Needed */}
      <div>
        <h3 className="font-semibold text-[#1A202C] mb-3">Availability Needed</h3>
        <div className="space-y-2">
          {['One-time', 'Short-term', 'Ongoing'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="availability"
                value={option}
                checked={selectedAvailability === option}
                onChange={(e) => setSelectedAvailability(e.target.value)}
                className="mr-2 text-[#FF9933] focus:ring-[#FF9933]"
              />
              <span className="text-[#1A202C]">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Task Type */}
      <div>
        <h3 className="font-semibold text-[#1A202C] mb-3">Task Type</h3>
        <div className="space-y-2">
          {['Remote', 'On-site'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="taskType"
                value={option}
                checked={selectedTaskType === option}
                onChange={(e) => setSelectedTaskType(e.target.value)}
                className="mr-2 text-[#FF9933] focus:ring-[#FF9933]"
              />
              <span className="text-[#1A202C]">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Posted */}
      <div>
        <h3 className="font-semibold text-[#1A202C] mb-3">Date Posted</h3>
        <div className="space-y-2">
          {['Last 7 days', 'Last 30 days'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="datePosted"
                value={option}
                checked={selectedDatePosted === option}
                onChange={(e) => setSelectedDatePosted(e.target.value)}
                className="mr-2 text-[#FF9933] focus:ring-[#FF9933]"
              />
              <span className="text-[#1A202C]">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter Actions */}
      <div className="pt-4 border-t border-gray-200">
        <button className="w-full bg-[#FF9933] text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 mb-3">
          Apply Filters
        </button>
        <button 
          onClick={clearAllFilters}
          className="w-full text-[#718096] hover:text-[#1A202C] transition-colors duration-200"
        >
          Clear All
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
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
                <Link href="/browse-tasks" className="text-[#FF9933] font-medium">Browse Tasks</Link>
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
                  <Link href="/dashboard" className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200">
                    <User size={16} className="mr-2" />
                    My Dashboard
                  </Link>
                  <Link href="/profile/johndoe" className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <Link href="/" className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200">
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-1/4">
            <div className="sticky top-24 bg-[#F7FAFC] rounded-lg">
              <FilterSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 lg:w-3/4">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center space-x-2 bg-[#F7FAFC] px-4 py-2 rounded-lg text-[#1A202C] hover:bg-gray-200 transition-colors duration-200"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#718096]" size={20} />
                <input
                  type="text"
                  placeholder="Search by keyword or NGO name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
                />
              </div>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-300 rounded-lg px-4 py-3 pr-8 focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
                >
                  <option>Most Recent</option>
                  <option>Most Relevant</option>
                  <option>Shortest Duration</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#718096]" size={20} />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-[#718096]">
                {isLoading ? 'Loading...' : `${filteredTasks.length} tasks found`}
              </p>
            </div>

            {/* Task Cards Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:-translate-y-1 transition-all duration-200 ${
                    isLoading ? 'opacity-0' : 'opacity-100 animate-fade-in'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* NGO Info */}
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-[#F7FAFC] rounded-full flex items-center justify-center mr-3 text-lg">
                      {task.ngoLogo}
                    </div>
                    <span className="text-sm font-medium text-[#718096]">{task.ngoName}</span>
                  </div>

                  {/* Task Title */}
                  <Link href={`/task/${task.id}`} className="text-lg font-bold text-[#1A202C] mb-4 hover:text-[#FF9933] cursor-pointer transition-colors duration-200 block">
                    {task.title}
                  </Link>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {task.skills.map(skill => (
                      <span key={skill} className="px-3 py-1 bg-gray-200 text-[#1A202C] text-sm rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Task Info */}
                  <div className="flex items-center justify-between mb-6 text-sm text-[#718096]">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      {task.location}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {task.duration}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link href={`/task/${task.id}`} className="w-full bg-[#FF9933] text-white py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 block text-center">
                    I'm Interested
                  </Link>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredTasks.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-[#1A202C] mb-2">No tasks found</h3>
                <p className="text-[#718096] mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearAllFilters}
                  className="text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileFiltersOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
            <FilterSidebar isMobile={true} />
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
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
