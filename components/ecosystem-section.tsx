"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Users, Building2 } from "lucide-react"
import { TypewriterText } from "@/components/typewriter"

const partners = [
  {
    icon: GraduationCap,
    title: "Students",
    description:
      "Access conversational textbooks that provide personalized explanations, cohesive course materials, and more time to focus on understanding concepts.",
  },
  {
    icon: Users,
    title: "Instructors",
    description:
      "Get an AI co-instructor that knows their course, aligns with their teaching style, and cuts course build time from weeks to hours.",
  },
  {
    icon: Building2,
    title: "Administrators",
    description:
      "Deploy consistent, high-quality courses at scale with LTI-compliant integration, FERPA-compliant architecture, version control, and best-practice AI implementation.",
  },
]

export function EcosystemSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showTypewriter, setShowTypewriter] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowTypewriter(true), 500)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="ecosystem" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground bg-background px-4 py-2 rounded-full mb-6 border">
            Ecosystem
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4">
            {showTypewriter ? (
              <TypewriterText 
                text="The Medhavy Ecosystem" 
                speed={50}
              />
            ) : (
              <span className="opacity-0">The Medhavy Ecosystem</span>
            )}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Building Better Education Through Collaboration
          </p>
          <p className="text-muted-foreground mt-2">
            Medhavy connects three essential partners
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {partners.map((partner, index) => (
            <Card 
              key={partner.title} 
              className={`group border-0 shadow-none bg-transparent transition-all duration-700 ${
                isVisible 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <CardContent className="p-0 flex flex-col gap-5">
                {/* Image placeholder with icon */}
                <div className="aspect-[4/3] rounded-2xl bg-foreground overflow-hidden relative group-hover:shadow-xl transition-shadow">
                  <div className="size-full flex flex-col items-center justify-center">
                    <partner.icon className="size-12 text-background/20 mb-2" />
                    <span className="text-background/20 text-sm font-medium">Image</span>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                </div>
                
                <div>
                  <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                    <partner.icon className="size-5 text-primary" />
                    {partner.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {partner.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
