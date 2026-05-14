import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()


const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  // Clean existing data
  await prisma.project.deleteMany()
  await prisma.experience.deleteMany()
  await prisma.education.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.technology.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.admin.deleteMany()

  // Seed Admin
  const admins = [
    {
      username: 'admin',
      password: await bcrypt.hash('MacAdmin@2026!', 10)
    },
    {
      username: 'admin2',
      password: await bcrypt.hash('MacDeveloper#2026!', 10)
    }
  ]

  for (const admin of admins) {
    await prisma.admin.create({
      data: admin
    })
  }


  // Seed Projects
  const projects = [
    {
      title: "Expenses Tracking System",
      description: "The Expense Tracker System is a full-stack web application built with React and NestJS, designed to help users efficiently record, categorize, and analyze their personal expenses. It features a responsive user interface, secure JWT-based authentication, and data visualization for insightful financial tracking. The system is fully containerized with Docker and integrated with a CI/CD pipeline for automated builds and deployments to AWS, ensuring scalability, reliability, and smooth continuous delivery in a modern cloud environment.",
      image: "/images/projects/expenses.png",
      tags: ["All", "Web"],
      gitUrl: "https://github.com/alobit21/EXPENSES-TRACKING-SYSTEM",
      previewUrl: "https://expenses.seranise.co.tz/",
    },
    {
      title: "Gates of Zanzibar Safaris",
      description: "A dynamic tourism platform for Zanzibar, built with React and Django. Users can explore destinations, book safaris, and access tour information with a responsive interface.",
      image: "/images/projects/goz2.png",
      tags: ["All", "Web"],
      gitUrl: "https://github.com/tarxemo/gates_safaris_web",
      previewUrl: "https://www.gatesofzanzibarsafaris.com/",
    },
    {
      title: "Next.js Portfolio",
      description: "A personal portfolio built with Next.js, showcasing projects and skills with a responsive design, optimized for performance and SEO.",
      image: "/images/projects/portifolio.png",
      tags: ["All", "Web"],
      gitUrl: "https://github.com/alobit21/Myportfolio",
      previewUrl: "/",
    },
    {
      title: "Blog Application",
      description: "The Blog Application is a modern, full-stack platform built with Next.js and PostgreSQL, allowing users to create, edit, and share blog posts with a clean and responsive interface. It features dynamic routing, SEO optimization, and a secure backend for managing posts and user data efficiently. Deployed on Vercel for high performance and scalability, the application delivers a seamless publishing experience with fast load times, server-side rendering, and automatic deployment from version control.",
      image: "/images/projects/blog.png",
      tags: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "https://macblog.tarxemo.com/",
    },
    {
      title: "Django-React Jwt Application",
      description: "A full-stack app with Django and React for note management and QR code generation, featuring a modern and dynamic interface.",
      image: "/images/projects/djreact.png",
      tags: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "https://github.com/alobit21/Django-React-Jwt",
    },
    {
      title: "Mobile Application",
      description: "A cross-platform mobile app built with React Native or Flutter, optimized for iOS and Android with a seamless user experience.",
      image: "/images/projects/mobile-project-1.jpg",
      tags: ["All", "Mobile"],
      gitUrl: "/",
      previewUrl: "/",
    },
  ]

  for (const project of projects) {
    await prisma.project.create({ data: project })
  }

  // Seed Experiences
  const experiences = [
    {
      title: 'Backend / Full Stack Developer',
      company: 'Personal Project',
      location: 'Remote',
      date: '2023',
      type: 'Personal',
      description: [
        'Built a full-featured e-commerce platform using Django MVT architecture',
        'Implemented product catalog, cart, and secure checkout functionality',
        'Designed relational database models for orders, users, and inventory',
        'Integrated authentication system for user accounts and order tracking',
        'Optimized backend queries to improve page load performance'
      ],
      technologies: ['Django', 'Python', 'PostgreSQL', 'HTML', 'CSS'],
      achievements: ['Completed end-to-end system with real-world features']
    },
    {
      title: 'Frontend Developer',
      company: 'Personal Project',
      location: 'Remote',
      date: '2024 - Present',
      type: 'Personal',
      description: [
        'Designed and developed a responsive portfolio website to showcase projects',
        'Implemented modern UI/UX principles for improved user engagement',
        'Integrated project sections with dynamic content and navigation',
        'Optimized site performance and mobile responsiveness'
      ],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      achievements: ['Central hub for showcasing work and skills']
    },
    {
      title: 'Open Source Developer',
      company: 'Personal Project',
      location: 'Remote',
      date: '2024',
      type: 'Personal',
      description: [
        'Developed and published an npm package to track and visualize GitHub activity',
        'Integrated with GitHub API to fetch user contribution data',
        'Designed reusable and configurable package for developers',
        'Documented usage and setup for open-source community'
      ],
      technologies: ['Node.js', 'JavaScript', 'GitHub API', 'npm'],
      achievements: ['Published on npm registry']
    },
    {
      title: 'Web Developer',
      company: 'Freelance',
      location: 'Remote',
      date: '2023 - 2024',
      type: 'Freelance',
      description: [
        'Designed and developed a tourism website for a safari business',
        'Created responsive pages showcasing travel packages and destinations',
        'Implemented contact and booking inquiry features',
        'Collaborated with client to refine design and content requirements'
      ],
      technologies: ['Django', 'React', 'PostgreSQL', 'Tailwind CSS'],
      achievements: ['Successfully delivered client project', 'Improved online presence for business']
    },
    {
      title: 'Student Developer / Mentor',
      company: 'University Project Collaboration',
      location: 'University Campus',
      date: '2023',
      type: 'Academic',
      description: [
        'Contributed to the development of two final-year software projects',
        'Assisted in system design, implementation, and debugging',
        'Provided technical guidance to senior students on development challenges',
        'Collaborated on project architecture and feature implementation'
      ],
      technologies: ['Python', 'JavaScript', 'React', 'Git'],
      achievements: ['Supported successful completion of 2 final-year projects', 'Recognized for technical contribution despite being a junior student']
    }
  ]

  for (const exp of experiences) {
    await prisma.experience.create({ data: exp })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  })
