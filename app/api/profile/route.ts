import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const profile = await prisma.profile.findFirst()
    return NextResponse.json(profile || {})
  } catch (error) {
    console.error('Profile GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Find the first profile to determine if we should update or create
    const existingProfile = await prisma.profile.findFirst()
    
    let profile;
    if (existingProfile) {
      profile = await prisma.profile.update({
        where: { id: existingProfile.id },
        data: body,
      })
    } else {
      profile = await prisma.profile.create({
        data: body,
      })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Profile POST error:', error)
    return NextResponse.json({ error: 'Failed to save profile' }, { status: 500 })
  }
}
