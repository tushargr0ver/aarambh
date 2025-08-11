import { NextResponse } from 'next/server'

// In a real app, you would query your database (e.g., using Prisma)
// For now, we'll use a mock data object to simulate a database.
const profiles = {
  "sarah-chen": {
    name: "Sarah Chen",
    username: "sarah-chen",
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
    ],
    topSkills: ["UX/UI Design", "Graphic Design", "Prototyping", "User Research", "Figma"],
    completedTasks: [
      {
        id: 1,
        ngoName: "GreenEarth Foundation",
        taskTitle: "Redesign Mobile App Interface for Environmental Tracking",
        completionDate: "January 2024",
        feedback: "Sarah's redesign completely transformed our user experience. The new interface is intuitive, beautiful, and has increased user engagement by 40%.",
        rating: 5,
        ngoLogo: "🌱",
      },
    ],
  },
  // Add another profile to test dynamic routing
  "john-doe": {
    name: "John Doe",
    username: "john-doe",
    headline: "Full-stack developer helping non-profits build better tools.",
    location: "New York, NY",
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    stats: { tasksCompleted: 15, ngosHelped: 8, hoursContributed: 42 },
    badges: [{ id: 1, name: "Impact Maker", icon: "🌟", description: "Completed 10+ tasks" }],
    topSkills: ["React", "Node.js", "PostgreSQL"],
    completedTasks: [
      {
        id: 1,
        ngoName: "TechForGood",
        taskTitle: "Code Review for Nonprofit Website",
        completionDate: "February 2024",
        feedback: "John's code review was incredibly thorough and helpful.",
        rating: 5,
        ngoLogo: "💻",
      },
    ],
  }
};

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  const { username } = params; // Destructure username here

  // In a real app, you would query your database:
  // const userProfile = await prisma.user.findUnique({ where: { username: username.toLowerCase() } });
  
  // Find the profile by comparing keys in a case-insensitive way
  const profileKey = Object.keys(profiles).find(key => key.toLowerCase() === username.toLowerCase());
  const userProfile = profileKey ? profiles[profileKey as keyof typeof profiles] : undefined;

  if (!userProfile) {
    return NextResponse.json({ error: `Profile for "${username}" not found` }, { status: 404 });
  }

  return NextResponse.json(userProfile);
}