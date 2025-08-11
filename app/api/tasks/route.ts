import { NextResponse, NextRequest } from "next/server";

//later replace with actual database query
const allTasks = [
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

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    const skills = searchParams.get('skills')?.split(',') || [];
    const categories = searchParams.get('categories')?.split(',') || [];
    const taskType = searchParams.get('taskType') || '';
    const sortBy = searchParams.get('sortBy') || 'Most Recent';

    let filteredTasks = allTasks.filter(task => {
        const matchesQuery = query === '' ||
            task.title.toLowerCase().includes(query.toLowerCase()) ||
            task.ngoName.toLowerCase().includes(query.toLowerCase());

        const matchesSkills = skills.length === 0 || skills[0] === '' ||
            skills.some(skill => task.skills.includes(skill));

        const matchesCategories = categories.length === 0 || categories[0] === '' ||
            categories.includes(task.category);

        const matchesType = taskType === '' || task.type === taskType;

        return matchesQuery && matchesSkills && matchesCategories && matchesType;
    });

    if (sortBy === 'Most Recent') {
        filteredTasks.sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime());
    }
    // Add other sorting logic here if needed

    return NextResponse.json(filteredTasks);
}