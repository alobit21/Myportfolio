import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    // Group them like the hardcoded structure if needed, 
    // or just return all and let the frontend filter.
    // For now, let's return all.
    return NextResponse.json(experiences)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const experience = await prisma.experience.create({
      data: body,
    })
    return NextResponse.json(experience)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 })
  }
}
