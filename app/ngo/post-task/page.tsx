"use client"

import type React from "react"

import { useState } from "react"
import {
  ChevronDown,
  Building,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  Bold,
  Italic,
  List,
  Eye,
} from "lucide-react"

// Form data interface
interface TaskFormData {
  title: string
  category: string
  taskType: "Remote" | "On-site" | "Hybrid" | ""
  location: string
  description: string
  responsibilities: string
  timeCommitment: string
  deadline: string
  skills: string[]
  screeningQuestions: string[]
  requestDocument: boolean
}

// Initial form state
const initialFormData: TaskFormData = {
  title: "",
  category: "",
  taskType: "",
  location: "",
  description: "",
  responsibilities: "",
  timeCommitment: "",
  deadline: "",
  skills: [],
  screeningQuestions: [],
  requestDocument: false,
}

// Categories and options
const categories = [
  "Education",
  "Environment",
  "Healthcare",
  "Technology",
  "Community",
  "Arts & Culture",
  "Human Rights",
  "Animal Welfare",
]

const timeCommitmentOptions = ["< 30 Minutes", "30 Minutes - 1 Hour", "1-2 Hours", "3-5 Hours", "5+ Hours"]

const skillSuggestions = [
  "Graphic Design",
  "Web Development",
  "Content Writing",
  "Translation",
  "Photography",
  "Video Editing",
  "Social Media",
  "Data Analysis",
  "Project Management",
  "Marketing",
  "Copywriting",
  "Adobe Creative Suite",
  "Canva",
  "WordPress",
  "Spanish",
  "French",
  "Research",
  "Event Planning",
]

// Rich Text Editor Component
function RichTextEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)

  const handleFormat = (command: string) => {
    document.execCommand(command, false)
    if (command === "bold") setIsBold(!isBold)
    if (command === "italic") setIsItalic(!isItalic)
  }

  return (
    <div className="border-2 border-gray-300 rounded-lg focus-within:border-[#FF9933] transition-colors duration-200">
      {/* Toolbar */}
      <div className="flex items-center space-x-2 p-3 border-b border-gray-200 bg-[#F7FAFC]">
        <button
          type="button"
          onClick={() => handleFormat("bold")}
          className={`p-2 rounded ${isBold ? "bg-[#FF9933] text-white" : "hover:bg-gray-200"} transition-colors duration-200`}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("italic")}
          className={`p-2 rounded ${isItalic ? "bg-[#FF9933] text-white" : "hover:bg-gray-200"} transition-colors duration-200`}
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => handleFormat("insertUnorderedList")}
          className="p-2 rounded hover:bg-gray-200 transition-colors duration-200"
        >
          <List size={16} />
        </button>
      </div>

      {/* Editor */}
      <div
        contentEditable
        className="p-4 min-h-[120px] focus:outline-none"
        placeholder={placeholder}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{
          color: value ? "#1A202C" : "#718096",
        }}
      />
    </div>
  )
}

// Multi-select Skills Component
function SkillsSelector({ skills, onChange }: { skills: string[]; onChange: (skills: string[]) => void }) {
  const [inputValue, setInputValue] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleInputChange = (value: string) => {
    setInputValue(value)
    if (value.length > 0) {
      const filtered = skillSuggestions.filter(
        (skill) => skill.toLowerCase().includes(value.toLowerCase()) && !skills.includes(skill),
      )
      setSuggestions(filtered.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }

  const addSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      onChange([...skills, skill])
    }
    setInputValue("")
    setSuggestions([])
  }

  const removeSkill = (skillToRemove: string) => {
    onChange(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addSkill(inputValue.trim())
    }
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type to search skills..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
        />

        {suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10">
            {suggestions.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="w-full text-left px-4 py-2 hover:bg-[#F7FAFC] transition-colors duration-200"
              >
                {skill}
              </button>
            ))}
          </div>
        )}
      </div>

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-3 py-1 bg-[#FF9933]/10 text-[#FF9933] rounded-full border border-[#FF9933]/20"
            >
              {skill}
              <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-600">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PostTaskWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<TaskFormData>(initialFormData)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [newQuestion, setNewQuestion] = useState("")

  const steps = [
    { number: 1, title: "The Basics" },
    { number: 2, title: "The Details" },
    { number: 3, title: "Skills & Questions" },
  ]

  const updateFormData = (field: keyof TaskFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addScreeningQuestion = () => {
    if (newQuestion.trim()) {
      updateFormData("screeningQuestions", [...formData.screeningQuestions, newQuestion.trim()])
      setNewQuestion("")
    }
  }

  const removeScreeningQuestion = (index: number) => {
    const updated = formData.screeningQuestions.filter((_, i) => i !== index)
    updateFormData("screeningQuestions", updated)
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to preview
      console.log("Navigate to preview with data:", formData)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.title &&
          formData.category &&
          formData.taskType &&
          (formData.taskType === "Remote" || formData.location)
        )
      case 2:
        return formData.description && formData.responsibilities && formData.timeCommitment && formData.deadline
      case 3:
        return formData.skills.length > 0
      default:
        return false
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
              <h1 className="text-2xl font-bold text-[#1A202C]">Aarambh</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="/ngo/dashboard" className="text-[#1A202C] hover:text-[#FF9933] transition-colors duration-200">
                  Dashboard
                </a>
                <a href="#post-task" className="text-[#FF9933] font-medium">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-200 ${
                      currentStep >= step.number ? "bg-[#FF9933] text-white" : "bg-gray-200 text-[#718096]"
                    }`}
                  >
                    {step.number}
                  </div>
                  <span
                    className={`ml-3 font-medium ${currentStep >= step.number ? "text-[#FF9933]" : "text-[#718096]"}`}
                  >
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-1 mx-4 transition-colors duration-200 ${
                      currentStep > step.number ? "bg-[#FF9933]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {/* Step 1: The Basics */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Let's Start with the Basics</h1>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#1A202C] mb-2">
                  Task Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => updateFormData("title", e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
                  placeholder="e.g., Design Social Media Graphics for Earth Day Campaign"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-[#1A202C] mb-2">
                  Task Category *
                </label>
                <div className="relative">
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => updateFormData("category", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200 appearance-none"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096]"
                    size={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-3">Task Type *</label>
                <div className="space-y-3">
                  {["Remote", "On-site", "Hybrid"].map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="taskType"
                        value={type}
                        checked={formData.taskType === type}
                        onChange={(e) => updateFormData("taskType", e.target.value)}
                        className="mr-3 text-[#FF9933] focus:ring-[#FF9933]"
                      />
                      <span className="text-[#1A202C]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {(formData.taskType === "On-site" || formData.taskType === "Hybrid") && (
                <div className="animate-fade-in">
                  <label htmlFor="location" className="block text-sm font-medium text-[#1A202C] mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    id="location"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
                    placeholder="e.g., San Francisco, CA or 123 Main St, New York, NY"
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: The Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-3xl font-bold text-[#1A202C] mb-8">Describe the Task</h1>

              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Full Task Description *</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(value) => updateFormData("description", value)}
                  placeholder="Describe the project's background and what this task will accomplish..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">
                  Responsibilities / Deliverables *
                </label>
                <RichTextEditor
                  value={formData.responsibilities}
                  onChange={(value) => updateFormData("responsibilities", value)}
                  placeholder="List what the volunteer will do and what they need to provide upon completion..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="timeCommitment" className="block text-sm font-medium text-[#1A202C] mb-2">
                    Estimated Time Commitment *
                  </label>
                  <div className="relative">
                    <select
                      id="timeCommitment"
                      value={formData.timeCommitment}
                      onChange={(e) => updateFormData("timeCommitment", e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200 appearance-none"
                    >
                      <option value="">Select time commitment</option>
                      {timeCommitmentOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#718096]"
                      size={20}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deadline" className="block text-sm font-medium text-[#1A202C] mb-2">
                    Application Deadline *
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    value={formData.deadline}
                    onChange={(e) => updateFormData("deadline", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Questions */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-slide-in">
              <h1 className="text-3xl font-bold text-[#1A202C] mb-8">What Are You Looking For?</h1>

              <div>
                <label className="block text-sm font-medium text-[#1A202C] mb-2">Required Skills *</label>
                <SkillsSelector skills={formData.skills} onChange={(skills) => updateFormData("skills", skills)} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1A202C] mb-4">Screening Questions (Optional)</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="Add a question..."
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#FF9933] focus:outline-none transition-colors duration-200"
                      onKeyPress={(e) => e.key === "Enter" && addScreeningQuestion()}
                    />
                    <button
                      type="button"
                      onClick={addScreeningQuestion}
                      className="bg-[#FF9933] text-white px-6 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-200 flex items-center"
                    >
                      <Plus size={16} className="mr-2" />
                      Add Question
                    </button>
                  </div>

                  {formData.screeningQuestions.length > 0 && (
                    <div className="space-y-2">
                      {formData.screeningQuestions.map((question, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-[#F7FAFC] rounded-lg">
                          <span className="text-[#1A202C]">{question}</span>
                          <button
                            type="button"
                            onClick={() => removeScreeningQuestion(index)}
                            className="text-red-600 hover:text-red-800 transition-colors duration-200"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.requestDocument}
                    onChange={(e) => updateFormData("requestDocument", e.target.checked)}
                    className="mr-3 text-[#FF9933] focus:ring-[#FF9933]"
                  />
                  <span className="text-[#1A202C]">Ask volunteers to upload a Resume or Work Sample (PDF)</span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#1A202C] hover:bg-[#F7FAFC] border-2 border-gray-300"
              }`}
            >
              <ChevronLeft size={16} className="mr-2" />
              Back
            </button>

            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                canProceed()
                  ? "bg-[#FF9933] text-white hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {currentStep === 3 ? (
                <>
                  <Eye size={16} className="mr-2" />
                  Preview Task
                </>
              ) : (
                <>
                  Next: {steps[currentStep]?.title}
                  <ChevronRight size={16} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
