"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Typewriter } from "@/components/typewriter"
import { ChevronLeft, ChevronRight, Sparkles, BookOpen, Zap } from "lucide-react"
import { useModal } from "@/components/modal-provider"

const slides = [
  {
    icon: BookOpen,
    title: "Conversational Learning",
    description: "Students engage with course material through natural dialogue",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    description: "Get intelligent suggestions and automated content creation",
  },
  {
    icon: Zap,
    title: "Seamless Integration",
    description: "Works with any LTI-compliant learning management system",
  },
]

const rotatingWords = ["Intelligent", "Interactive", "Personalized", "Engaging"]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const { openModal } = useModal()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const CurrentIcon = slides[currentSlide].icon

  return (
    <section className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 size-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 size-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Content */}
          <div
            className={`flex flex-col gap-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/80 px-4 py-2 rounded-full w-fit">
              <Sparkles className="size-4" />
              AI-Powered Education Platform
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-balance">Transform Static</span>
              <span className="block text-balance">Textbooks Into</span>
              <span className="block">
                <Typewriter
                  words={rotatingWords}
                  className="text-primary"
                  typingSpeed={120}
                  deletingSpeed={80}
                  delayBetweenWords={2500}
                />
              </span>
              <span className="block text-balance">Courses</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              B Wells turns any textbook into a personalized, AI-curated conversational
              learning experience inside any LTI-compliant LMS.
            </p>



            <div className="flex flex-wrap gap-4 mt-4">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                onClick={() => openModal("demo")}
              >
                Request a Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 h-12 text-base bg-transparent hover:bg-muted transition-all"
                onClick={() => openModal("learn-more")}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-muted/50 border shadow-2xl overflow-hidden">
              {/* Pagination dots */}
              <div className="absolute top-5 left-5 flex gap-2 z-10">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`size-2.5 rounded-full transition-all duration-300 ${currentSlide === index
                        ? "bg-foreground w-8"
                        : "bg-foreground/30 hover:bg-foreground/50"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              {/* Slide Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div
                  key={currentSlide}
                  className="animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center"
                >
                  <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <CurrentIcon className="size-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{slides[currentSlide].title}</h3>
                  <p className="text-muted-foreground max-w-sm">{slides[currentSlide].description}</p>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background shadow-lg transition-all hover:scale-105"
                aria-label="Previous slide"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 size-10 rounded-full bg-background/90 backdrop-blur flex items-center justify-center hover:bg-background shadow-lg transition-all hover:scale-105"
                aria-label="Next slide"
              >
                <ChevronRight className="size-5" />
              </button>

              {/* Decorative grid */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                                  linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }} />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-background rounded-full px-4 py-2 shadow-lg border animate-in fade-in slide-in-from-top-4 duration-700 delay-500">
              <span className="text-sm font-medium">Built for Educators</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
              <span className="text-sm font-medium">LTI Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
