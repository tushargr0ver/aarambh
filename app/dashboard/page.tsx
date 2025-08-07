"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  User,
  Settings,
  LogOut,
  Award,
  Users,
  Clock,
  TrendingUp,
  PieChartIcon,
  Eye,
  Calendar,
  Bookmark,
} from "lucide-react"
import Link from "next/link";

// Mock data
const dashboardData = {
  volunteer: {
    name: "John Doe",
    totalTasks: 15,
    ngosHelped: 8,
    hoursContributed: 42,
  },
  contributionTimeline: [
    { month: "Jan", tasks: 2 },
    { month: "Feb", tasks: 3 },
    { month: "Mar", tasks: 5 },
    { month: "Apr", tasks: 8 },
    { month: "May", tasks: 12 },
    { month: "Jun", tasks: 15 },
  ],
  skillBreakdown: [
    { skill: "Design", percentage: 40, color: "#FF9933" },
    { skill: "Translation", percentage: 30, color: "#38A169" },
    { skill: "Writing", percentage: 20, color: "#718096" },
    { skill: "Research", percentage: 10, color: "#E53E3E" },
  ],
  activeTasks: [
    { id: 1, title: "Create Marketing Flyer for Food Drive", ngo: "FoodBank Alliance", status: "In Progress" },
  ],
  applications: [
    { id: 1, title: "Design Social Media Graphics", ngo: "GreenEarth Foundation", status: "Pending" },
    { id: 2, title: "Translate Educational Content", ngo: "EduForAll Initiative", status: "Accepted" },
    { id: 3, title: "Write Blog Post on Mental Health", ngo: "HealthFirst Network", status: "Rejected" },
  ],
  savedTasks: [
    { id: 1, title: "Code Review for Nonprofit Website", ngo: "TechForGood", datePosted: "2024-01-10" },
    { id: 2, title: "Event Photography for Charity Run", ngo: "RunForCause", datePosted: "2024-01-09" },
  ],
}

// Animated Counter Component
function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return <span>{count}</span>
}

// Line Chart Component
function LineChart({ data }: { data: Array<{ month: string; tasks: number }> }) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const maxTasks = Math.max(...data.map((d) => d.tasks))
  const width = 400
  const height = 200
  const padding = 40

  const points = data.map((d, i) => ({
    x: padding + (i * (width - 2 * padding)) / (data.length - 1),
    y: height - padding - (d.tasks / maxTasks) * (height - 2 * padding),
  }))

  const pathData = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ")

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i * (height - 2 * padding)) / 4}
            x2={width - padding}
            y2={padding + (i * (height - 2 * padding)) / 4}
            stroke="#f0f0f0"
            strokeWidth="1"
          />
        ))}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke="#FF9933"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={isAnimated ? "none" : "1000"}
          strokeDashoffset={isAnimated ? "0" : "1000"}
          style={{
            transition: "stroke-dashoffset 2s ease-in-out",
          }}
        />

        {/* Points */}
        {points.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#FF9933"
            opacity={isAnimated ? 1 : 0}
            style={{
              transition: `opacity 0.5s ease-in-out ${i * 0.2}s`,
            }}
          />
        ))}

        {/* X-axis labels */}
        {data.map((d, i) => (
          <text key={i} x={points[i].x} y={height - 10} textAnchor="middle" className="text-xs fill-[#718096]">
            {d.month}
          </text>
        ))}
      </svg>
    </div>
  )
}

// Pie Chart Component
function SkillPieChart({ data }: { data: Array<{ skill: string; percentage: number; color: string }> }) {
  const [isAnimated, setIsAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const size = 200
  const center = size / 2
  const radius = 70

  let cumulativePercentage = 0

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="mb-4">
        {data.map((item, index) => {
          const startAngle = (cumulativePercentage / 100) * 360 - 90
          const endAngle = ((cumulativePercentage + item.percentage) / 100) * 360 - 90

          const startAngleRad = (startAngle * Math.PI) / 180
          const endAngleRad = (endAngle * Math.PI) / 180

          const x1 = center + radius * Math.cos(startAngleRad)
          const y1 = center + radius * Math.sin(startAngleRad)
          const x2 = center + radius * Math.cos(endAngleRad)
          const y2 = center + radius * Math.sin(endAngleRad)

          const largeArc = item.percentage > 50 ? 1 : 0

          const pathData = [
            `M ${center} ${center}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
            "Z",
          ].join(" ")

          cumulativePercentage += item.percentage

          return (
            <path
              key={index}
              d={pathData}
              fill={item.color}
              opacity={isAnimated ? 0.8 : 0}
              style={{
                transition: `opacity 0.6s ease-in-out ${index * 0.2}s`,
              }}
            />
          )
        })}
      </svg>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center text-sm">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
            <span className="text-[#1A202C]">
              {item.skill} ({item.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function VolunteerDashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("active")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Accepted":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-sm shadow-sm">
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
                <a href="#how-it-works" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  How It Works
                </a>
                <Link href="/ngo/dashboard" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  For NGOs
                </Link>
                <Link href="/browse-tasks" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Browse Tasks
                </Link>
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
                  <Link href="/dashboard" className="flex items-center px-4 py-2 text-[#FF9933] bg-[#F7FAFC] font-medium">
                    <User size={16} className="mr-2" />
                    My Dashboard
                  </Link>
                  <Link
                    href="/profile/johndoe"
                    className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <hr className="my-2" />
                  <Link
                    href="/"
                    className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
                  >
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4 sm:mb-0">
            Welcome back, {dashboardData.volunteer.name}!
          </h1>
          <Link href="/browse-tasks" className="bg-[#FF9933] text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200">
            Find a New Task
          </Link>
        </div>

        {/* Impact Summary Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <Award className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={dashboardData.volunteer.totalTasks} />
            </div>
            <p className="text-[#718096] font-medium">Tasks Completed</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <Users className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={dashboardData.volunteer.ngosHelped} />
            </div>
            <p className="text-[#718096] font-medium">NGOs Helped</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <Clock className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={dashboardData.volunteer.hoursContributed} />
            </div>
            <p className="text-[#718096] font-medium">Hours Contributed</p>
          </div>
        </div>

        {/* Data Visualization Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Contribution Timeline */}
          <div className="lg:col-span-2 bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <TrendingUp className="w-6 h-6 text-[#FF9933] mr-2" />
              <h2 className="text-xl font-bold text-[#1A202C]">Your Impact Over Time</h2>
            </div>
            <LineChart data={dashboardData.contributionTimeline} />
          </div>

          {/* Skill Utilization */}
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <PieChartIcon className="w-6 h-6 text-[#FF9933] mr-2" />
              <h2 className="text-xl font-bold text-[#1A202C]">Your Top Skills</h2>
            </div>
            <SkillPieChart data={dashboardData.skillBreakdown} />
          </div>
        </div>

        {/* Activity Section */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#1A202C] mb-6">Your Activity</h2>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab("active")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "active"
                    ? "border-[#FF9933] text-[#FF9933]"
                    : "border-transparent text-[#718096] hover:text-[#1A202C] hover:border-gray-300"
                }`}
              >
                Active Tasks ({dashboardData.activeTasks.length})
              </button>
              <button
                onClick={() => setActiveTab("applications")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "applications"
                    ? "border-[#FF9933] text-[#FF9933]"
                    : "border-transparent text-[#718096] hover:text-[#1A202C] hover:border-gray-300"
                }`}
              >
                My Applications ({dashboardData.applications.length})
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === "saved"
                    ? "border-[#FF9933] text-[#FF9933]"
                    : "border-transparent text-[#718096] hover:text-[#1A202C] hover:border-gray-300"
                }`}
              >
                Saved Tasks
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === "active" && (
              <>
                {dashboardData.activeTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1A202C]">{task.title}</h3>
                      <p className="text-[#718096] text-sm">{task.ngo}</p>
                    </div>
                    <Link href={`/task/active/${task.id}`} className="border-2 border-[#FF9933] text-[#FF9933] px-4 py-2 rounded-lg font-medium hover:bg-[#FF9933] hover:text-white transition-colors duration-200 flex items-center">
                      <Eye size={16} className="mr-2" />
                      View Task
                    </Link>
                  </div>
                ))}
              </>
            )}

            {activeTab === "applications" && (
              <>
                {dashboardData.applications.map((application) => (
                  <div key={application.id} className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1A202C]">{application.title}</h3>
                      <p className="text-[#718096] text-sm">{application.ngo}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </div>
                ))}
              </>
            )}

            {activeTab === "saved" && (
              <>
                {dashboardData.savedTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 bg-[#F7FAFC] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1A202C]">{task.title}</h3>
                      <p className="text-[#718096] text-sm">{task.ngo}</p>
                      <div className="flex items-center text-xs text-[#718096] mt-1">
                        <Calendar size={12} className="mr-1" />
                        Posted {task.datePosted}
                      </div>
                    </div>
                    <button className="text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200">
                      <Bookmark size={20} />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
