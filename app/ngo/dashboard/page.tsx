"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ChevronDown,
  Building,
  Settings,
  LogOut,
  Plus,
  MoreHorizontal,
  Users,
  Clock,
  CheckCircle,
  Eye,
  Edit,
  X,
  Calendar,
} from "lucide-react"

// Mock NGO data
const ngoData = {
  name: "GreenEarth Foundation",
  stats: {
    activeTasks: 4,
    pendingApplications: 12,
    tasksCompleted: 25,
    volunteersEngaged: 50,
  },
  tasks: [
    {
      id: 1,
      title: "Design Social Media Graphics for Earth Day Campaign",
      postedDate: "2024-01-15",
      applicants: 8,
      hasNewApplications: true,
      status: "Live",
      statusColor: "green",
    },
    {
      id: 2,
      title: "Translate Educational Content to Spanish",
      postedDate: "2024-01-12",
      applicants: 3,
      hasNewApplications: false,
      status: "In Progress",
      statusColor: "blue",
    },
    {
      id: 3,
      title: "Write Blog Post on Climate Change Impact",
      postedDate: "2024-01-10",
      applicants: 12,
      hasNewApplications: true,
      status: "Live",
      statusColor: "green",
    },
    {
      id: 4,
      title: "Create Infographic on Water Conservation",
      postedDate: "2024-01-08",
      applicants: 0,
      hasNewApplications: false,
      status: "Live",
      statusColor: "green",
    },
    {
      id: 5,
      title: "Develop Volunteer Training Materials",
      postedDate: "2024-01-05",
      applicants: 5,
      hasNewApplications: false,
      status: "Closed",
      statusColor: "gray",
    },
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

  return (
    <span>
      {count}
      {end >= 50 ? "+" : ""}
    </span>
  )
}

// Status Badge Component
function StatusBadge({ status, color }: { status: string; color: string }) {
  const colorClasses = {
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    gray: "bg-gray-100 text-gray-800",
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color as keyof typeof colorClasses]}`}
    >
      {status}
    </span>
  )
}

// Actions Dropdown Component
function ActionsDropdown({ taskId }: { taskId: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-[#718096] hover:text-[#1A202C] hover:bg-gray-100 rounded-lg transition-colors duration-200"
      >
        <MoreHorizontal size={16} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <Link
              href={`/ngo/task/${taskId}/applicants`}
              className="flex items-center w-full px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
            >
              <Eye size={16} className="mr-2" />
              View Applicants
            </Link>
            <Link
              href={`/ngo/task/${taskId}/edit`}
              className="flex items-center w-full px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
            >
              <Edit size={16} className="mr-2" />
              Edit Task
            </Link>
            <hr className="my-2" />
            <button className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200">
              <X size={16} className="mr-2" />
              Close Task
            </button>
          </div>
        </>
      )}
    </div>
  )
}

// Mobile Task Card Component
function MobileTaskCard({ task }: { task: (typeof ngoData.tasks)[0] }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <h3 className="font-bold text-[#1A202C] flex-1 pr-2">{task.title}</h3>
        <ActionsDropdown taskId={task.id} />
      </div>

      <div className="flex items-center justify-between">
        <StatusBadge status={task.status} color={task.statusColor} />
        <div className="flex items-center text-sm text-[#718096]">
          <Calendar size={14} className="mr-1" />
          {new Date(task.postedDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <Link
          href={`/ngo/task/${task.id}/applicants`}
          className={`text-sm font-medium ${
            task.hasNewApplications ? "text-[#FF9933] hover:text-[#1A202C]" : "text-[#718096] hover:text-[#1A202C]"
          } transition-colors duration-200`}
        >
          {task.applicants} Applicant{task.applicants !== 1 ? "s" : ""}
          {task.hasNewApplications && <span className="ml-1 w-2 h-2 bg-[#FF9933] rounded-full inline-block"></span>}
        </Link>
      </div>
    </div>
  )
}

export default function NGODashboard() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
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
                <Link href="/ngo/dashboard" className="text-[#FF9933] font-medium">
                  Dashboard
                </Link>
                <Link href="/ngo/post-task" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Post a Task
                </Link>
                <Link href="/ngo/post-task" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Find Volunteers
                </Link>
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
                  <Link
                    href="/ngo/dashboard"
                    className="flex items-center px-4 py-2 text-[#1A202C] hover:bg-[#F7FAFC] transition-colors duration-200"
                  >
                    <Building size={16} className="mr-2" />
                    Organization Profile
                  </Link>
                  <Link
                    href="/profile/greenearth"
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4 sm:mb-0">Welcome, {ngoData.name}!</h1>
          <Link href="/ngo/post-task" className="bg-[#FF9933] text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 flex items-center">
            <Plus size={18} className="mr-2" />
            Post a New Task
          </Link>
        </div>

        {/* Stats Overview Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <Clock className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={ngoData.stats.activeTasks} />
            </div>
            <p className="text-[#718096] font-medium">Active Tasks</p>
          </div>

          <div className="bg-white border-2 border-[#FF9933] rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <Users className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={ngoData.stats.pendingApplications} />
            </div>
            <p className="text-[#718096] font-medium">Pending Applications</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <CheckCircle className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={ngoData.stats.tasksCompleted} />
            </div>
            <p className="text-[#718096] font-medium">Tasks Completed</p>
          </div>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-200">
            <Users className="w-8 h-8 text-[#FF9933] mx-auto mb-4" />
            <div className="text-3xl font-bold text-[#1A202C] mb-2">
              <AnimatedCounter end={ngoData.stats.volunteersEngaged} />
            </div>
            <p className="text-[#718096] font-medium">Volunteers Engaged</p>
          </div>
        </div>

        {/* Main Content: Manage Tasks */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-[#1A202C]">Your Posted Tasks</h2>
          </div>

          {ngoData.tasks.length === 0 ? (
            /* Empty State */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-[#1A202C] mb-2">You haven't posted any tasks yet.</h3>
              <p className="text-[#718096] mb-6">Start connecting with volunteers by posting your first task.</p>
              <Link href="/ngo/post-task" className="bg-[#FF9933] text-white px-8 py-4 rounded-lg font-medium text-lg hover:scale-105 transition-transform duration-200 flex items-center mx-auto">
                <Plus size={20} className="mr-2" />
                Post a New Task
              </Link>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F7FAFC]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                        Task Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                        Posted Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                        Applicants
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#718096] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {ngoData.tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-[#F7FAFC] transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-[#1A202C]">{task.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[#718096]">{formatDate(task.postedDate)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/ngo/task/${task.id}/applicants`}
                            className={`font-medium ${
                              task.hasNewApplications
                                ? "text-[#FF9933] hover:text-[#1A202C]"
                                : "text-[#718096] hover:text-[#1A202C]"
                            } transition-colors duration-200 flex items-center`}
                          >
                            {task.applicants} Applicant{task.applicants !== 1 ? "s" : ""}
                            {task.hasNewApplications && (
                              <span className="ml-2 w-2 h-2 bg-[#FF9933] rounded-full"></span>
                            )}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <StatusBadge status={task.status} color={task.statusColor} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ActionsDropdown taskId={task.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
                {ngoData.tasks.map((task) => (
                  <MobileTaskCard key={task.id} task={task} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
