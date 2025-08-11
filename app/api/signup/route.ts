import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { PrismaClient, Role } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
const { name, email, password, role } = await request.json();

    if (!name || !email || !password || !role) {
        return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const normalizedRole = role.toLowerCase();
    if (!["ngo", "volunteer"].includes(normalizedRole)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const passwordHash = await hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            role: normalizedRole as Role, // ✅ Cast safely
        },
    });


    return NextResponse.json({ message: 'Signup successful', userId: newUser.id }, { status: 200 })
}
