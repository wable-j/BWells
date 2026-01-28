"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useModal } from "@/components/modal-provider"

type ModalType = 
  | "demo" 
  | "contact" 
  | "learn-more" 
  | "get-started"
  | "newsletter"
  | "explore-ai"
  | "course-creation"
  | "platform-integration"

interface FeatureSectionProps {
  eyebrow?: string
  title: string
  description: string
  ctaText: string
  modalType?: ModalType
  imagePosition?: "left" | "right"
  icon?: React.ReactNode
}

export function FeatureSection({
  eyebrow,
  title,
  description,
  ctaText,
  modalType = "learn-more",
  imagePosition = "left",
  icon,
}: FeatureSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const { openModal } = useModal()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const content = (
    <div 
      className={`flex flex-col justify-center gap-5 transition-all duration-700 ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : imagePosition === "left" 
            ? "opacity-0 translate-x-8" 
            : "opacity-0 -translate-x-8"
      }`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2">
          <div className="h-px w-8 bg-primary/50" />
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
        {title}
      </h2>
      <p className="text-muted-foreground leading-relaxed text-lg">
        {description}
      </p>
      <div className="mt-2">
        <Button 
          variant="outline" 
          className="rounded-full bg-transparent group hover:bg-primary hover:text-primary-foreground transition-all" 
          onClick={() => openModal(modalType)}
        >
          <span className="inline-flex items-center gap-2">
            {ctaText}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </div>
    </div>
  )

  const image = (
    <div 
      className={`relative aspect-[4/3] lg:aspect-square rounded-2xl bg-foreground overflow-hidden transition-all duration-700 delay-200 ${
        isVisible 
          ? "opacity-100 translate-x-0" 
          : imagePosition === "left" 
            ? "opacity-0 -translate-x-8" 
            : "opacity-0 translate-x-8"
      }`}
    >
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Content placeholder with icon */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {icon && (
          <div className="text-background/20 mb-4">
            {icon}
          </div>
        )}
        <div className="text-background/20 text-sm font-medium">Media Content</div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
    </div>
  )

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
          {imagePosition === "left" ? (
            <>
              {image}
              {content}
            </>
          ) : (
            <>
              {content}
              {image}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
