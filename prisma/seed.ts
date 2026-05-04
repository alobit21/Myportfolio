import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import dotenv from 'dotenv'

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
      title: 'Freelance Full-Stack Developer',
      company: 'Self-Employed',
      location: 'Remote',
      date: '2022 – Present',
      type: 'Freelance',
      description: [
        'Developed and deployed 10+ custom websites for small businesses using React, Next.js, and Tailwind CSS',
        'Implemented responsive designs achieving 95+ mobile usability scores across all projects',
        'Managed full project lifecycle from client requirements to deployment on Vercel and AWS',
        'Integrated payment systems, booking platforms, and third-party APIs for enhanced functionality'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'PostgreSQL', 'AWS', 'Vercel'],
      achievements: ['10+ satisfied clients', '95%+ mobile scores', 'Full project delivery']
    },
    {
      title: 'AI Chatbot System',
      company: 'University Capstone Project',
      location: 'University Campus',
      date: 'Sept 2023 – May 2024',
      type: 'Academic',
      description: [
        'Led development of AI-powered student support chatbot serving 500+ test users',
        'Integrated OpenAI GPT API for real-time query processing with 85% accuracy rate',
        'Built responsive React frontend with Node.js backend handling 1000+ concurrent requests',
        'Collaborated in 3-person team using Agile methodologies and Git version control'
      ],
      technologies: ['React', 'Node.js', 'OpenAI API', 'Express', 'MongoDB', 'Git'],
      achievements: ['500+ test users', '85% accuracy', 'Team lead']
    },
    {
      title: 'Full-Stack Development & Cloud Architecture',
      company: 'Continuous Learning',
      location: 'Self-Directed',
      date: '2021 – Present',
      type: 'Skills Development',
      description: [
        'Mastered modern web stack: React, Next.js, TypeScript, and cloud deployment platforms',
        'Built 15+ personal projects including e-commerce sites, blogs, and portfolio applications',
        'Achieved 200+ LeetCode problems solved with focus on algorithms and data structures',
        'Maintain active GitHub profile with 100+ commits and collaborative open-source contributions'
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Python', 'Docker', 'AWS', 'GraphQL'],
      achievements: ['15+ projects built', '200+ LeetCode solved', 'Active GitHub profile']
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
