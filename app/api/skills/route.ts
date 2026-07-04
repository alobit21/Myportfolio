import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Skills GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Convert level to Int if it's passed as string
    if (typeof body.level === 'string') body.level = parseInt(body.level, 10)
    
    const skill = await prisma.skill.create({
      data: body,
    })
    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skills POST error:', error)
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 })
    if (typeof data.level === 'string') data.level = parseInt(data.level, 10)

    const skill = await prisma.skill.update({
      where: { id },
      data,
    })
    return NextResponse.json(skill)
  } catch (error) {
    console.error('Skills PUT error:', error)
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Skill ID is required' }, { status: 400 })

    await prisma.skill.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Skills DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 })
  }
}
