'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, User, Settings, LogOut, Upload, Clock, MessageCircle, Calendar, FileText, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'

// Mock task data
const activeTaskData = {
  id: 1,
  title: "Design Social Media Graphics for Earth Day Campaign",
  status: "In Progress",
  ngoName: "GreenEarth Foundation",
  ngoLogo: "🌱",
  contactName: "Sarah Johnson",
  deadline: new Date('2024-02-15T23:59:59'),
  description: "Create compelling visual content for our Earth Day campaign that will reach over 50,000 followers across our social platforms. The graphics should educate communities about sustainable practices and environmental conservation.",
  deliverables: [
    "3-5 Instagram post graphics with provided content and brand guidelines",
    "Graphics in multiple formats (square 1080x1080, story 1080x1920, carousel)",
    "All designs must align with brand colors (Green: #2D5A27, Blue: #1E40AF)",
    "Final files delivered in PNG and JPG formats",
    "Source files (PSD/AI) for future edits"
  ],
  activityLog: [
    {
      id: 1,
      type: "event",
      message: "Your application was accepted on August 4.",
      timestamp: "2024-08-04T10:30:00",
      isNew: false
    },
    {
      id: 2,
      type: "message",
      sender: "NGO",
      message: "Thanks for taking this on! Let us know if you have questions. We've attached our brand guidelines in the resources section.",
      timestamp: "2024-08-04T14:20:00",
      isNew: false
    },
    {
      id: 3,
      type: "event",
      message: "You started this task on August 5.",
      timestamp: "2024-08-05T09:15:00",
      isNew: false
    }
  ]
}

// Countdown Timer Component
function CountdownTimer({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 })
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = deadline.getTime() - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

        setTimeLeft({ days, hours, minutes })
        setIsUrgent(days < 2) // Mark as urgent if less than 2 days
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        setIsUrgent(true)
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [deadline])

  return (
    <div className={`text-center ${isUrgent ? 'text-orange-600' : 'text-[#1A202C]'}`}>
      <div className="text-2xl font-bold mb-1">
        {timeLeft.days > 0 && `${timeLeft.days} Days, `}
        {timeLeft.hours} Hours
      </div>
      {isUrgent && timeLeft.days < 1 && (
        <div className="flex items-center justify-center text-sm text-orange-600">
          <AlertTriangle size={16} className="mr-1" />
          Deadline approaching!
        </div>
      )}
    </div>
  )
}

// File Upload Component
function FileUploadArea({ onFileUpload, uploadedFile }: { 
  onFileUpload: (file: File) => void
  uploadedFile: File | null 
}) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onFileUpload(files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onFileUpload(files[0])
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
        isDragOver 
          ? 'border-[#FF9933] bg-[#FF9933]/5' 
          : uploadedFile 
            ? 'border-green-300 bg-green-50' 
            : 'border-gray-300 hover:border-[#FF9933]/50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        className="hidden"
        accept=".pdf,.doc,.docx,.zip,.png,.jpg,.jpeg,.psd,.ai"
      />
      
      {uploadedFile ? (
        <div className="space-y-3">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
          <div>
            <p className="font-medium text-[#1A202C]">File uploaded successfully!</p>
            <p className="text-sm text-[#718096]">{uploadedFile.name}</p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200"
          >
            Upload a different file
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <Upload className={`w-12 h-12 mx-auto ${isDragOver ? 'text-[#FF9933]' : 'text-[#718096]'}`} />
          <div>
            <p className="font-medium text-[#1A202C] mb-1">
              Drag and drop your completed files here
            </p>
            <p className="text-sm text-[#718096] mb-3">
              or{' '}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-[#FF9933] hover:text-[#1A202C] transition-colors duration-200"
              >
                browse to upload
              </button>
            </p>
            <p className="text-xs text-[#718096]">
              Supports: PDF, DOC, ZIP, PNG, JPG, PSD, AI (Max 10MB)
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function ActiveTaskPage() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('brief')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [submissionNote, setSubmissionNote] = useState('')
  const [activityLog, setActivityLog] = useState(activeTaskData.activityLog)

  const handleFileUpload = (file: File) => {
    if (file.size <= 10 * 1024 * 1024) { // 10MB limit
      setUploadedFile(file)
    } else {
      alert('File size must be under 10MB')
    }
  }

  const handleSubmitTask = () => {
    if (!uploadedFile) return
    
    // Add submission event to activity log
    const newActivity = {
      id: activityLog.length + 1,
      type: "event" as const,
      message: "Task submitted for review.",
      timestamp: new Date().toISOString(),
      isNew: true
    }
    
    setActivityLog(prev => [...prev, newActivity])
    
    // Handle task submission
    console.log('Task submitted:', { file: uploadedFile, note: submissionNote })
    alert('Task submitted successfully! The NGO will review your work.')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href='/'><h1 className="text-2xl font-bold text-[#1A202C]">Aarambh</h1></Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#how-it-works" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">How It Works</a>
                <Link href="/ngo/dashboard" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">For NGOs</Link>
                <Link href="/browse-tasks" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">Browse Tasks</Link>
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A202C] mb-4">{activeTaskData.title}</h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            In Progress
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Right Column - Mobile First (Status & Communication) */}
          <div className="lg:col-span-1 lg:order-2">
            <div className="sticky top-24 bg-[#F7FAFC] border border-gray-200 rounded-lg p-6 space-y-6">
              {/* Deadline Tracker */}
              <div>
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-[#FF9933] mr-2" />
                  <h2 className="text-lg font-bold text-[#1A202C]">Time Remaining</h2>
                </div>
                <CountdownTimer deadline={activeTaskData.deadline} />
              </div>

              <hr className="border-gray-300" />

              {/* NGO Contact */}
              <div>
                <h2 className="text-lg font-bold text-[#1A202C] mb-4">NGO Contact</h2>
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 text-lg">
                    {activeTaskData.ngoLogo}
                  </div>
                  <div>
                    <p className="font-medium text-[#1A202C]">{activeTaskData.ngoName}</p>
                    <p className="text-sm text-[#718096]">{activeTaskData.contactName}</p>
                  </div>
                </div>
                <button className="w-full border-2 border-[#FF9933] text-[#FF9933] py-2 rounded-lg font-medium hover:bg-[#FF9933] hover:text-white transition-colors duration-200 flex items-center justify-center">
                  <MessageCircle size={16} className="mr-2" />
                  Send a Message
                </button>
              </div>

              <hr className="border-gray-300" />

              {/* Activity Log */}
              <div>
                <h2 className="text-lg font-bold text-[#1A202C] mb-4">Recent Activity</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {activityLog.map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`p-3 rounded-lg text-sm ${
                        activity.isNew ? 'animate-fade-in bg-[#FF9933]/10' : 'bg-white'
                      }`}
                    >
                      {activity.type === 'event' ? (
                        <div className="flex items-start">
                          <Calendar size={14} className="text-[#718096] mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-[#1A202C]">{activity.message}</p>
                        </div>
                      ) : (
                        <div className="flex items-start">
                          <MessageCircle size={14} className="text-[#FF9933] mr-2 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs text-[#718096] mb-1">Message from NGO:</p>
                            <p className="text-[#1A202C]">"{activity.message}"</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Left Column - Task Details & Submission */}
          <div className="lg:col-span-2 lg:order-1">
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('brief')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                    activeTab === 'brief'
                      ? 'border-[#FF9933] text-[#FF9933]'
                      : 'border-transparent text-[#718096] hover:text-[#1A202C] hover:border-gray-300'
                  }`}
                >
                  <FileText size={16} className="mr-2" />
                  Brief & Deliverables
                </button>
                <button
                  onClick={() => setActiveTab('submit')}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center ${
                    activeTab === 'submit'
                      ? 'border-[#FF9933] text-[#FF9933]'
                      : 'border-transparent text-[#718096] hover:text-[#1A202C] hover:border-gray-300'
                  }`}
                >
                  <Upload size={16} className="mr-2" />
                  Submit Your Work
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'brief' && (
              <div className="space-y-8">
                {/* Full Task Description */}
                <section>
                  <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Full Task Description</h2>
                  <p className="text-[#1A202C] leading-relaxed text-lg">
                    {activeTaskData.description}
                  </p>
                </section>

                {/* Final Deliverables */}
                <section>
                  <h2 className="text-2xl font-bold text-[#1A202C] mb-4">Final Deliverables</h2>
                  <ul className="space-y-3">
                    {activeTaskData.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-[#FF9933] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-[#1A202C]">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {activeTab === 'submit' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1A202C]">Ready to Submit?</h2>
                
                {/* File Upload Area */}
                <FileUploadArea 
                  onFileUpload={handleFileUpload}
                  uploadedFile={uploadedFile}
                />

                {/* Optional Note */}
                <div>
                  <label htmlFor="submission-note" className="block text-sm font-medium text-[#1A202C] mb-2">
                    Add a note for the NGO (optional)
                  </label>
                  <textarea
                    id="submission-note"
                    rows={4}
                    value={submissionNote}
                    onChange={(e) => setSubmissionNote(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Share any additional context about your work, challenges you faced, or questions for the NGO..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmitTask}
                  disabled={!uploadedFile}
                  className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-200 ${
                    uploadedFile
                      ? 'bg-[#FF9933] text-white hover:scale-105 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Mark as Complete & Submit for Review
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
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
      `}</style>
    </div>
  )
}
