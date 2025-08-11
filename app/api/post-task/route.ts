import { NextResponse, NextRequest } from 'next/server'
// In the future, you'll import your Prisma client here
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  try {
    const taskData = await req.json();

    // --- Server-side validation ---
    if (!taskData.title || !taskData.category || !taskData.description) {
      return NextResponse.json({ error: "Missing required fields: title, category, and description are required." }, { status: 400 });
    }

    // --- Simulate Database Operation ---
    // In a real application, you would use Prisma to create a new task in your database:
    // const newTask = await prisma.task.create({ data: taskData });
    
    console.log("New task data received:", taskData);
    
    // Add a unique ID to simulate a database record
    const newTask = { ...taskData, id: Date.now() };

    return NextResponse.json({ message: "Task created successfully!", task: newTask }, { status: 201 });

  } catch (error) {
    console.error("Failed to create task:", error);
    return NextResponse.json({ error: "An unexpected error occurred." }, { status: 500 });
  }
}
