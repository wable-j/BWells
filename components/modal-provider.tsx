"use client"

import React from "react"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Sparkles, Mail, BookOpen, Users, MessageSquare, ArrowRight, Loader2 } from "lucide-react"

type ModalType =
  | "demo"
  | "contact"
  | "learn-more"
  | "get-started"
  | "newsletter"
  | "explore-ai"
  | "course-creation"
  | "platform-integration"

interface ModalContextType {
  openModal: (type: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const openModal = useCallback((type: ModalType) => {
    setModalType(type)
    setIsSuccess(false)
  }, [])

  const closeModal = useCallback(() => {
    setModalType(null)
    setIsSuccess(false)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const modalConfig: Record<ModalType, {
    title: string
    description: string
    icon: typeof Sparkles
    fields: { name: string; label: string; type: string; placeholder: string; required?: boolean }[]
    submitText: string
    successMessage: string
  }> = {
    demo: {
      title: "Request a Demo",
      description: "See how B Wells can transform your educational content into intelligent, conversational courses.",
      icon: Sparkles,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Work Email", type: "email", placeholder: "john@university.edu", required: true },
        { name: "institution", label: "Institution", type: "text", placeholder: "University of..." },
        { name: "role", label: "Your Role", type: "text", placeholder: "Professor, Administrator, etc." },
        { name: "message", label: "What are you hoping to achieve?", type: "textarea", placeholder: "Tell us about your goals..." },
      ],
      submitText: "Schedule Demo",
      successMessage: "Thank you! We'll be in touch within 24 hours to schedule your personalized demo.",
    },
    contact: {
      title: "Contact Us",
      description: "Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
      icon: Mail,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
        { name: "subject", label: "Subject", type: "text", placeholder: "How can we help?" },
        { name: "message", label: "Message", type: "textarea", placeholder: "Your message...", required: true },
      ],
      submitText: "Send Message",
      successMessage: "Message sent! We'll get back to you within 1-2 business days.",
    },
    "learn-more": {
      title: "Learn More About B Wells",
      description: "Get detailed information about our AI-powered educational platform sent directly to your inbox.",
      icon: BookOpen,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
        { name: "interest", label: "What interests you most?", type: "text", placeholder: "AI co-instruction, course creation, etc." },
      ],
      submitText: "Get Information",
      successMessage: "Check your inbox! We've sent you detailed information about B Wells.",
    },
    "get-started": {
      title: "Get Started with B Wells",
      description: "Create your account and start transforming your educational content today.",
      icon: Users,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Work Email", type: "email", placeholder: "john@university.edu", required: true },
        { name: "institution", label: "Institution", type: "text", placeholder: "University of...", required: true },
        { name: "courses", label: "How many courses do you manage?", type: "text", placeholder: "1-5, 6-20, 20+..." },
      ],
      submitText: "Create Account",
      successMessage: "Welcome to B Wells! Check your email for next steps to set up your account.",
    },
    newsletter: {
      title: "Stay Updated",
      description: "Get the latest news, tips, and insights on AI in education delivered to your inbox.",
      icon: Mail,
      fields: [
        { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
        { name: "interests", label: "Topics of Interest", type: "text", placeholder: "AI, EdTech, Course Design..." },
      ],
      submitText: "Subscribe",
      successMessage: "You're subscribed! Watch your inbox for our next newsletter.",
    },
    "explore-ai": {
      title: "Explore AI Co-Instruction",
      description: "Learn how our AI assistant can help you create summaries, quizzes, exams, and lecture notes automatically.",
      icon: Sparkles,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
        { name: "subject", label: "What subject do you teach?", type: "text", placeholder: "Biology, History, etc." },
        { name: "challenge", label: "What's your biggest content creation challenge?", type: "textarea", placeholder: "Tell us more..." },
      ],
      submitText: "Explore AI Features",
      successMessage: "We've sent you detailed information about our AI co-instruction capabilities!",
    },
    "course-creation": {
      title: "Effortless Course Creation",
      description: "See how B Wells can help you build LMS modules, generate assessments, and create lecture materials in hours, not weeks.",
      icon: BookOpen,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
        { name: "lms", label: "What LMS do you use?", type: "text", placeholder: "Canvas, Blackboard, Moodle..." },
        { name: "courses", label: "How many courses do you need to create/update?", type: "text", placeholder: "1-5, 6-10, 10+..." },
      ],
      submitText: "Learn About Course Creation",
      successMessage: "Check your email for a detailed guide on effortless course creation with B Wells!",
    },
    "platform-integration": {
      title: "Platform Integration",
      description: "Discover how B Wells unifies textbooks, PDFs, videos, and existing LMS content into one cohesive experience.",
      icon: MessageSquare,
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true },
        { name: "email", label: "Email Address", type: "email", placeholder: "john@example.com", required: true },
        { name: "platforms", label: "What platforms do you currently use?", type: "text", placeholder: "Canvas, Zoom, Google Drive..." },
        { name: "pain", label: "What's your biggest integration challenge?", type: "textarea", placeholder: "Describe your current workflow..." },
      ],
      submitText: "Discover Integration Options",
      successMessage: "We've sent you information about our seamless integration capabilities!",
    },
  }

  const currentConfig = modalType ? modalConfig[modalType] : null
  const Icon = currentConfig?.icon || Sparkles

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Dialog open={!!modalType} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle2 className="size-8 text-green-600" />
              </div>
              <DialogTitle className="text-xl mb-2">Success!</DialogTitle>
              <DialogDescription className="text-base">
                {currentConfig?.successMessage}
              </DialogDescription>
              <Button onClick={closeModal} className="mt-6 rounded-full">
                Close
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <DialogTitle className="text-xl">{currentConfig?.title}</DialogTitle>
                </div>
                <DialogDescription className="text-base">
                  {currentConfig?.description}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                {currentConfig?.fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-2">
                    <Label htmlFor={field.name} className="text-sm font-medium">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeholder}
                        required={field.required}
                        className="min-h-24 resize-none"
                      />
                    ) : (
                      <Input
                        id={field.name}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
                <Button
                  type="submit"
                  className="w-full rounded-full mt-2 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      {currentConfig?.submitText}
                      <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ModalContext.Provider>
  )
}
