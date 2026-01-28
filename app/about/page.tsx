"use client"

import React, { useEffect, useRef, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { 
  Shield, 
  Hand, 
  Globe, 
  User, 
  ShieldCheck,
  BookOpen,
  Lightbulb,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useModal } from "@/components/modal-provider"

// Animation hook for scroll reveal
function useScrollReveal(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}

// Donut chart component with blue theme
function DonutChart({ isVisible }: { isVisible: boolean }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      setProgress(100)
    }, 300)
    return () => clearTimeout(timer)
  }, [isVisible])

  // Segments with blue color scheme
  const segments = [
    { percent: 35, color: "#2563eb", label: "Active Content" },
    { percent: 25, color: "#93c5fd", label: "In Transformation" },
    { percent: 40, color: "#1e3a5f", label: "Static Backlog" },
  ]

  const radius = 80
  const strokeWidth = 24
  const circumference = 2 * Math.PI * radius
  let cumulativePercent = 0

  return (
    <div className="flex flex-col items-center">
      <svg width="220" height="220" viewBox="0 0 220 220" className="transform -rotate-90">
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="transparent"
          stroke="#e0f2fe"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment, index) => {
          const dashLength = (segment.percent / 100) * circumference * (progress / 100)
          const dashOffset = (cumulativePercent / 100) * circumference
          cumulativePercent += segment.percent
          
          return (
            <circle
              key={index}
              cx="110"
              cy="110"
              r={radius}
              fill="transparent"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference}`}
              strokeDashoffset={-dashOffset}
              className="transition-all duration-1000 ease-out"
              style={{ transitionDelay: `${index * 200}ms` }}
            />
          )
        })}
      </svg>
      
      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {segments.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: segment.color }}
            />
            <span className="text-sm text-muted-foreground">{segment.label}</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground mt-4 text-center">
        Growth in Accessible Intelligent Content (Projected 2025)
      </p>
    </div>
  )
}

// Typewriter effect component
function TypewriterHeading({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const { ref, isVisible } = useScrollReveal(0.5)

  useEffect(() => {
    if (!isVisible) return
    
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index))
        index++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 80)

    return () => clearInterval(timer)
  }, [isVisible, text])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {isTyping && isVisible && (
        <span className="animate-pulse ml-1">|</span>
      )}
    </span>
  )
}

export default function AboutPage() {
  const heroReveal = useScrollReveal(0.1)
  const missionReveal = useScrollReveal(0.2)
  const teamReveal = useScrollReveal(0.2)
  const valuesReveal = useScrollReveal(0.2)
  const scienceReveal = useScrollReveal(0.2)
  const { openModal } = useModal()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Etymology Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background with blue gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-sky-50/40 to-background" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-50/20 rounded-full blur-3xl" />
        
        <div 
          ref={heroReveal.ref}
          className={`container relative mx-auto px-4 md:px-6 text-center transition-all duration-1000 ${
            heroReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Sanskrit text */}
          <p className="text-2xl md:text-3xl text-blue-600 font-medium mb-4" style={{ fontFamily: "serif" }}>
            मेधावी
          </p>
          
          {/* Main heading with elegant serif font */}
          <h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-foreground"
            style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
          >
            <TypewriterHeading text="Intellectually Brilliant" />
          </h1>
          
          {/* Tagline */}
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            &ldquo;Medhavy transforms how knowledge is shared, making elite education accessible to every corner of the globe.&rdquo;
          </p>
          
          {/* Sub-tag */}
          <p className="mt-8 text-sm text-muted-foreground">
            A Global Education Initiative led by <span className="font-semibold text-blue-600">Professor Sridhar Srinivas</span>
          </p>
        </div>
      </section>

      {/* The Narrative / Mission Section */}
      <section className="py-20 md:py-28">
        <div 
          ref={missionReveal.ref}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text content */}
            <div 
              className={`transition-all duration-700 ${
                missionReveal.isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-4">
                Our Mission
              </p>
              <h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-blue-900"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Bridging the Gap
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Medhavy transforms static textbooks into living, AI-powered courses inside Learning Management Systems like Canvas. We bridge the gap between traditional educational content and personalized learning by combining automation with instructor control.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Led by <span className="font-semibold text-foreground">Professor Sridhar Srinivas</span> and supported by the fellows at <span className="font-semibold text-blue-600">Humanitarians AI</span>, we believe AI serves education&apos;s highest purpose when it democratizes learning.
              </p>
              
              {/* Callout */}
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                <div className="size-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="size-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium italic text-foreground">
                  Built by educators, for educators.
                </p>
              </div>
            </div>
            
            {/* Right: Donut Chart */}
            <div 
              className={`flex justify-center transition-all duration-700 delay-300 ${
                missionReveal.isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
              }`}
            >
              <div className="bg-card rounded-2xl border shadow-sm p-8 hover:shadow-xl hover:border-blue-200 transition-all">
                <DonutChart isVisible={missionReveal.isVisible} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Founders Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50/30 to-muted/30">
        <div 
          ref={teamReveal.ref}
          className="container mx-auto px-4 md:px-6"
        >
          <div 
            className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
              teamReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-muted-foreground text-lg">
              AI is only as good as the humans who guide it. Meet the educators and technologists behind Medhavy.
            </p>
          </div>

          {/* Bento Grid for Team */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Professor Sridhar Srinivas */}
            <div 
              className={`bg-card rounded-2xl border p-8 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 transition-all duration-500 group cursor-pointer ${
                teamReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-start gap-6">
                <div className="size-20 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <User className="size-10 text-blue-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Professor Sridhar Srinivas
                  </h3>
                  <p className="text-sm text-blue-600 font-medium mb-3">Founder & Visionary</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    A career educator dedicated to closing the accessibility gap in Higher Ed. Sridhar leads the pedagogical framework of Medhavy.
                  </p>
                </div>
              </div>
            </div>

            {/* Humanitarians AI */}
            <div 
              className={`bg-blue-900 text-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-500 group cursor-pointer ${
                teamReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-start gap-6">
                <div className="size-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                  <ShieldCheck className="size-10 text-white/80" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Humanitarians AI
                  </h3>
                  <p className="text-sm text-blue-300 font-medium mb-3">Philanthropic Support</p>
                  <p className="text-sm text-white/70 leading-relaxed">
                    A global collective of AI fellows ensuring Medhavy remains ethical, FERPA-compliant, and focused on social impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Grid */}
      <section className="py-20 md:py-28">
        <div 
          ref={valuesReveal.ref}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Integrity */}
            <div 
              className={`text-center transition-all duration-700 group ${
                valuesReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              <div className="size-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all cursor-pointer">
                <Shield className="size-7 text-blue-600" />
              </div>
              <h3 
                className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Integrity
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We adhere to the highest standards of data privacy and LTI 1.3 certification to protect our institutions.
              </p>
            </div>

            {/* Control */}
            <div 
              className={`text-center transition-all duration-700 group ${
                valuesReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="size-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all cursor-pointer">
                <Hand className="size-7 text-blue-600" />
              </div>
              <h3 
                className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Control
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                &ldquo;AI proposes, you dispose.&rdquo; Faculty stay at the heart of the learning experience, always.
              </p>
            </div>

            {/* Democratization */}
            <div 
              className={`text-center transition-all duration-700 group ${
                valuesReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="size-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-100 group-hover:border-blue-200 transition-all cursor-pointer">
                <Globe className="size-7 text-blue-600" />
              </div>
              <h3 
                className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Democratization
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Knowledge shouldn&apos;t be limited by geography. We serve the global learner community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Scientific Roots Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-blue-50/30 to-background">
        <div 
          ref={scienceReveal.ref}
          className="container mx-auto px-4 md:px-6"
        >
          <div 
            className={`max-w-4xl mx-auto transition-all duration-700 ${
              scienceReveal.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-card rounded-2xl border shadow-sm p-8 md:p-12 hover:shadow-xl hover:border-blue-200 transition-all">
              <div className="flex items-start gap-6">
                <div className="size-14 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <BookOpen className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600 mb-2">
                    Scientific Foundation
                  </p>
                  <h3 
                    className="text-2xl md:text-3xl font-bold mb-4 text-blue-900"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Rooted in Learning Science
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Medhavy&apos;s AI isn&apos;t just intelligent—it&apos;s pedagogically grounded. Our system leverages 
                    <span className="font-semibold text-blue-600"> Vygotsky&apos;s Zone of Proximal Development (ZPD)</span> and 
                    <span className="font-semibold text-blue-600"> Scaffolded Learning</span> principles to ensure every interaction 
                    meets students exactly where they are, providing just-in-time support that builds genuine understanding.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <Lightbulb className="size-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm mb-1">Zone of Proximal Development</p>
                        <p className="text-xs text-muted-foreground">Identifies the sweet spot between what students know and what they can learn with guidance.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-blue-50/50 rounded-xl border border-blue-100/50 hover:bg-blue-50 hover:border-blue-200 transition-colors">
                      <Lightbulb className="size-5 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm mb-1">Scaffolded Learning</p>
                        <p className="text-xs text-muted-foreground">Provides structured support that gradually decreases as competence increases.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-6 text-blue-900"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join the growing community of educators using Medhavy to create intelligent, personalized learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="group bg-blue-600 hover:bg-blue-700"
                onClick={() => openModal("demo")}
              >
                Request a Demo
                <ArrowRight className="ml-2 size-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-blue-200 hover:bg-blue-50 hover:border-blue-300 bg-transparent"
                onClick={() => openModal("contact")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
