"use client"

import { useEffect, useState, type MouseEvent, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowUpRight,
  Download,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  Layers,
  Menu,
  X,
} from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const cardReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

type AnimatedSectionProps = {
  children: ReactNode
  className?: string
  id?: string
}

// Animated Section Component
function AnimatedSection({ children, className = "", id = "" }: AnimatedSectionProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={controls} variants={fadeIn} className={className}>
      {children}
    </motion.section>
  )
}

function HeroAnimation() {
  const [pointer, setPointer] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setPointer({
      x: (event.clientX - rect.left) / rect.width - 0.5,
      y: (event.clientY - rect.top) / rect.height - 0.5,
    })
  }

  const handleMouseLeave = () => {
    setPointer({ x: 0, y: 0 })
  }

  const chips = [
    { label: "UI Systems", top: "14%", left: "10%", intensity: 18 },
    { label: "Motion", top: "22%", right: "12%", intensity: -16 },
    { label: "Branding", bottom: "12%", right: "10%", intensity: 14 },
  ]

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full bg-slate-50 overflow-hidden"
    >
      <motion.div
        animate={{ x: pointer.x * 24, y: pointer.y * 24 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        className="absolute inset-0 bg-gradient-to-br from-white via-slate-100 to-slate-50"
      />

      <motion.div
        animate={{ x: pointer.x * -18, y: pointer.y * -18 }}
        transition={{ type: "spring", stiffness: 70, damping: 18 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.16),transparent_30%)]"
      />

      <motion.div
        animate={{ x: pointer.x * 20, y: pointer.y * 20, rotate: pointer.x * 6 }}
        transition={{ type: "spring", stiffness: 75, damping: 16 }}
        className="absolute inset-[2.5%] rounded-[2rem] border border-white/70 bg-white/90 p-2 md:p-3 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur"
      >
        <div className="relative h-full overflow-hidden rounded-[1.6rem] bg-slate-950">
          <Image
            src="/Gemini_Generated_Image_7pobml7pobml7pob.png"
            alt="Featured designer portrait"
            fill
            className="object-cover opacity-90"
            sizes="(min-width: 768px) 40vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-sm md:left-6 md:top-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Visual Designer
          </div>

          <div className="absolute inset-x-4 bottom-4 rounded-[1.5rem] border border-white/15 bg-white/10 p-5 text-white backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.3em] text-white/70">Featured discipline</p>
            <h3 className="mt-2 text-3xl font-semibold leading-tight md:text-[2rem]">Interfaces with personality</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/80 md:text-[15px]">
              Product visuals, brand systems, and polished layouts built to feel clear, premium, and memorable.
            </p>
          </div>
        </div>
      </motion.div>

      {chips.map((chip, index) => (
        <motion.div
          key={chip.label}
          animate={{
            x: pointer.x * chip.intensity,
            y: pointer.y * chip.intensity,
          }}
          transition={{ type: "spring", stiffness: 65, damping: 16, delay: index * 0.04 }}
          className="absolute rounded-full border border-violet-200 bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-700 shadow-md md:px-5 md:py-2.5"
          style={{
            top: chip.top,
            left: chip.left,
            right: chip.right,
            bottom: chip.bottom,
          }}
        >
          {chip.label}
        </motion.div>
      ))}
    </div>
  )
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      const offsetTop = section.offsetTop
      window.scrollTo({
        top: offsetTop - 80, // Offset for the header
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Aniket<span className="text-primary">.Design</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("work")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Work
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600 hover:text-primary">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          <Button className="hidden md:flex" asChild>
            <a href="/aniket-basu-resume.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b">
            <div className="container py-4 space-y-3">
              <button
                onClick={() => scrollToSection("work")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Work
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left py-2 text-sm font-medium hover:text-primary transition-colors"
              >
                Contact
              </button>
              <Button className="w-full" asChild>
                <a href="/aniket-basu-resume.pdf" download>
                  <Download className="mr-2 h-4 w-4" />
                  Resume
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container py-24 md:py-32 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 0.5 }}
          className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
          <motion.div variants={fadeIn} className="space-y-6">
            <motion.p variants={fadeIn} className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              Available for collaboration
            </motion.p>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold leading-tight">
              Crafting Digital <span className="text-primary">Experiences</span> That Inspire
            </motion.h1>
            <motion.p variants={fadeIn} className="text-lg text-muted-foreground max-w-xl">
              UI/UX Designer and Graphic Artist creating polished interfaces, motion-led brand systems, and memorable
              digital products with intention and clarity.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link href="https://www.behance.net/aniketdzns" target="_blank" rel="noopener noreferrer">
                  View My Work
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")}>
                Get in Touch
              </Button>
            </motion.div>
            <motion.div variants={fadeIn} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Projects</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">18+</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Focus</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">UiUx & Graphic Design</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Industry</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">Web & Mobile</p>
              </div>
            </motion.div>
          </motion.div>
          <motion.div variants={fadeIn} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
            <HeroAnimation />
          </motion.div>
        </div>

        {/* Behance Banner */}
        <motion.div
          variants={fadeIn}
          className="relative z-10 mt-12 rounded-[32px] overflow-hidden border border-white/10 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-cyan-300/10" />
          <Image
            src="/aniket-behance-banner.png"
            alt="Aniket Basu — Graphic Designer and Aspiring Coder, behance.net/aniketdzns"
            width={1183}
            height={290}
            className="relative w-full h-auto"
            priority
          />
        </motion.div>
      </motion.section>

      {/* Featured Work */}
      <AnimatedSection id="work" className="py-20 bg-slate-50">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-16">
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground mb-4">Selected projects</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-muted-foreground max-w-2xl">
              A curated collection of product design and brand-driven case studies, with motion and interaction at the core.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ui-ux">UI/UX Design</TabsTrigger>
                <TabsTrigger value="graphic">Graphic Design</TabsTrigger>
                <TabsTrigger value="branding">Branding</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} />
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="ui-ux" className="mt-0">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects
                  .filter((p) => p.category === "UI/UX Design")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="graphic" className="mt-0">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects
                  .filter((p) => p.category === "Graphic Design")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="branding" className="mt-0">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {projects
                  .filter((p) => p.category === "Branding")
                  .map((project, index) => (
                    <ProjectCard key={index} project={project} />
                  ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection id="services" className="py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">My Services</h2>
            <p className="text-muted-foreground">
              I offer a range of design services to help bring your vision to life
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -6, scale: 1.02 }} className="transition-transform">
              <Card className="border border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="p-8">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Layers className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
                <p className="text-muted-foreground mb-4">
                  Creating intuitive, user-centered interfaces that enhance user experience and drive engagement.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    User Research & Testing
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Wireframing & Prototyping
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Responsive Web Design
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Mobile App Design
                  </li>
                </ul>
              </CardContent>
            </Card>
            </motion.div>

            <Card className="border border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Graphic Design</h3>
                <p className="text-muted-foreground mb-4">
                  Crafting visually compelling designs that communicate your message effectively.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Brand Identity Design
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Print & Digital Media
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Marketing Collateral
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Social Media Graphics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-8">
                <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Award className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Branding</h3>
                <p className="text-muted-foreground mb-4">
                  Developing cohesive brand identities that resonate with your audience and set you apart.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Logo Design
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Brand Guidelines
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Visual Identity Systems
                  </li>
                  <li className="flex items-center">
                    <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                    Brand Strategy
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection id="about" className="py-24 bg-slate-50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <p className="text-muted-foreground">Get to know more about my journey, skills, and passion for design</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="relative">
              <div className="relative aspect-square rounded-xl overflow-hidden border shadow-xl">
                <Image
                  src="/Gemini_Generated_Image_7pobml7pobml7pob.png"
                  alt="Designer portrait"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              {/* Decorative elements */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/30 rounded-xl z-10"
              />
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-xl z-10"
              />
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Aniket Basu</h3>
                <p className="text-primary font-medium">UI/UX & Graphic Designer</p>

                <p className="text-muted-foreground">
                  I&apos;m a UX/UI Designer skilled in Figma, Framer, Spline, HANA 2D, and Adobe Photoshop, with a strong
                  focus on wireframing, prototyping, and user research. I&apos;m passionate about creating intuitive and
                  visually consistent web and mobile experiences.
                </p>

                <p className="text-muted-foreground">
                  Currently pursuing a B.Tech in Computer Science Engineering at Bennett University, I blend a
                  user-centered design mindset with a solid foundation in core computer science. I believe great design
                  should solve real problems while delighting the people who use it.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">Greater Noida, India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">basuaniket35@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Education</p>
                    <p className="font-medium">B.Tech CSE</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Freelance</p>
                    <p className="font-medium">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <GraduationCap className="mr-2 h-6 w-6 text-primary" />
                Education
              </h3>

              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-primary/20 pb-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h4 className="font-bold text-lg">B.Tech in Computer Science Engineering</h4>
                  <p className="text-primary">2023 - 2027</p>
                  <p className="text-muted-foreground mt-2">Bennett University, Greater Noida.</p>
                </div>

                <div className="relative pl-8 border-l-2 border-primary/20 pb-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h4 className="font-bold text-lg">Class XII (CBSE)</h4>
                  <p className="text-primary">2023</p>
                  <p className="text-muted-foreground mt-2">Delhi Public School, Greater Faridabad.</p>
                </div>

                <div className="relative pl-8 border-l-2 border-primary/20">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h4 className="font-bold text-lg">Class X (CBSE)</h4>
                  <p className="text-primary">2021</p>
                  <p className="text-muted-foreground mt-2">Delhi Public School, Greater Faridabad.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-primary" />
                Experience
              </h3>

              <div className="space-y-8">
                <div className="relative pl-8 border-l-2 border-primary/20 pb-8">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <h4 className="font-bold text-lg">Graphic Designer (Freelance)</h4>
                  <p className="text-primary">2021 - 2022 · Remote</p>
                  <p className="text-muted-foreground mt-2">
                    Designed esports posters, YouTube thumbnails, X (Twitter) banners, and YouTube channel banners for
                    esports teams and content creators. Created engaging graphics to enhance brand presence and audience
                    reach, working with clients remotely to deliver custom social media visuals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
              <Award className="mr-2 h-6 w-6 text-primary" />
              Skills & Expertise
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">UI/UX & Design Tools</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Figma
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Framer
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Spline
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Hana 2D
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Adobe Photoshop
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Design Process</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Wireframing
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Prototyping
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      User Research
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      User-Centered Design
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Visual Consistency
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-4">Programming & Core CS</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      C, Python
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Data Structures & Algorithms
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Object Oriented Programming
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      DBMS (MySQL)
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-primary mr-2"></div>
                      Operating Systems & Networks
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Interests */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center flex items-center justify-center">
              <Heart className="mr-2 h-6 w-6 text-primary" />
              Interests & Hobbies
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Photography</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Travel</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Reading</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Music</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Hiking</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Cooking</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Art Exhibitions</div>
              <div className="bg-white px-6 py-3 rounded-full text-sm font-medium border">Yoga</div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 0.05, y: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-primary/20"
          />
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 0.05, y: 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute -bottom-40 -left-20 w-96 h-96 rounded-full bg-primary/10"
          />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? I&apos;d love to hear about it. Let&apos;s discuss how we can work together to bring your
              ideas to life.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <a
                    href="tel:+919310621078"
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">+91 9310621078</p>
                    </div>
                  </a>

                  <a
                    href="mailto:asiancrystal8806@gmail.com"
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">asiancrystal8806@gmail.com</p>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-100">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">New Delhi, India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
                <p className="text-muted-foreground mb-6">
                  Follow me on social media to see my latest work and updates, or connect professionally on LinkedIn.
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <a
                    href="https://www.linkedin.com/in/aniket-basu-6a5896298/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <Linkedin className="h-6 w-6 text-primary" />
                    <span className="font-medium">LinkedIn</span>
                  </a>

                  <a
                    href="https://www.behance.net/aniketdzns"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-primary"
                    >
                      <path d="M8 15a3.001 3.001 0 0 0 6 0v-2a3.001 3.001 0 0 0-6 0" />
                      <path d="M2 14h2a2 2 0 0 0 2-2v0a2 2 0 0 0-2-2H2v8" />
                      <path d="M16 6h4a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-4v4a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-1" />
                    </svg>
                    <span className="font-medium">Behance</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <Instagram className="h-6 w-6 text-primary" />
                    <span className="font-medium">Instagram</span>
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-lg border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition-colors"
                  >
                    <Github className="h-6 w-6 text-primary" />
                    <span className="font-medium">GitHub</span>
                  </a>
                </div>

                <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Availability
                  </h4>
                  <p className="text-muted-foreground">
                    I&apos;m currently available for freelance work and collaborations. Typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aniket Design. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">Designed and built with passion</p>
        </div>
      </footer>
    </div>
  )
}

type Project = {
  title: string
  category: string
  description: string
  image: string
  link: string
}

type ProjectCardProps = {
  project: Project
}

// Project Card Component with Animation
function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      variants={cardReveal}
      whileHover={{ y: -8, scale: 1.02 }}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden group h-full border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <p className="text-white text-sm line-clamp-3">{project.description}</p>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="mb-3 inline-flex rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-500">
            {project.category}
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg text-slate-900">{project.title}</h3>
            </div>
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowUpRight className="h-5 w-5" />
              <span className="sr-only">View project</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Sample project data
const projects = [
  {
    title: "Veo 3 — AI News Carousel Design",
    category: "UI/UX Design",
    description:
      "An editorial-style Instagram carousel created for Google’s Veo 3 launch, blending motion-led storytelling with polished product visuals.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/e76ab6250603091.Y3JvcCwxMDgwLDg0NCwwLDI1MQ.png",
    link: "https://www.behance.net/gallery/250603091/Veo-3-AI-News-Carousel-Design",
  },
  {
    title: "Maruti Suzuki Redesign",
    category: "UI/UX Design",
    description:
      "A fresh digital redesign for Maruti Suzuki, optimizing the user journey across landing, model selection, and booking flows.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/f9bf11245424061.Y3JvcCw2ODAsNTMyLDIxNSw0Mw.png",
    link: "https://www.behance.net/gallery/245424061/Maruti-Suzuki-Redesign",
  },
  {
    title: "Player cards",
    category: "Graphic Design",
    description:
      "A bold set of esports-style player cards designed for social and streaming promotion with vivid visuals and character focus.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808/120194138737167.62b9b7bb92e1b.png",
    link: "https://www.behance.net/gallery/138737167/Player-cards",
  },
  {
    title: "INTRODUCING POSTERS",
    category: "Graphic Design",
    description:
      "A creative poster campaign concept combining expressive typography and vibrant layouts for visual impact.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808/e14773126262837.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    link: "https://www.behance.net/gallery/126262837/INTRODUCING-POSTERS",
  },
  {
    title: "Merch designs",
    category: "Graphic Design",
    description:
      "Merchandise mockups and branded visuals created for a lifestyle collection, with an emphasis on bold color and product presentation.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808/bbc5fd167345047.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
    link: "https://www.behance.net/gallery/167345047/Merch-designs",
  },
  {
    title: "Manipulations",
    category: "Graphic Design",
    description:
      "Photo manipulations and compositing work featuring dramatic visual effects and creative storytelling.",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/141e7c167344481.Y3JvcCwxMTM0LDg4NiwzOTIsMTkw.png",
    link: "https://www.behance.net/gallery/167344481/Manipulations",
  },
]
