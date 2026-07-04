import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(education)
  } catch (error) {
    console.error('Education GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const education = await prisma.education.create({
      data: body,
    })
    return NextResponse.json(education)
  } catch (error) {
    console.error('Education POST error:', error)
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...data } = body

    if (!id) return NextResponse.json({ error: 'Education ID is required' }, { status: 400 })

    const education = await prisma.education.update({
      where: { id },
      data,
    })
    return NextResponse.json(education)
  } catch (error) {
    console.error('Education PUT error:', error)
    return NextResponse.json({ error: 'Failed to update education' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Education ID is required' }, { status: 400 })

    await prisma.education.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Education DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete education' }, { status: 500 })
  }
}
