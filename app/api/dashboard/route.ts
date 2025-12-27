import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(){
    const userID  = 1;

try{
    const dashboardData = {
      volunteer: {
        name: "John Doe (Real)", // Example: fetched from DB
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
      ],
      savedTasks: [
        { id: 1, title: "Code Review for Nonprofit Website", ngo: "TechForGood", datePosted: "2024-01-10" },
      ],
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}