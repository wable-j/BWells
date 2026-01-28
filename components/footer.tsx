"use client"

import React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowRight, Twitter, Linkedin, Mail, Loader2 } from "lucide-react"
import { Typewriter } from "@/components/typewriter"
import { useModal } from "@/components/modal-provider"
import { useState } from "react"

const footerLinks1 = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#case-studies", label: "Case Studies" },
  { href: "#documentation", label: "Documentation" },
]

const footerLinks2 = [
  { href: "#about", label: "About Us" },
  { href: "#team", label: "Our Team" },
  { href: "#careers", label: "Careers" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
]

export function Footer() {
  const { openModal } = useModal()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <footer className="border-t bg-muted/20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        {/* CTA Section */}
        <div className="relative rounded-2xl bg-foreground text-background p-8 md:p-12 lg:p-16 mb-16 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -right-24 size-64 bg-background/5 rounded-full blur-2xl" />
            <div className="absolute -bottom-24 -left-24 size-64 bg-background/5 rounded-full blur-2xl" />
          </div>
          
          <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                <Typewriter 
                  words={["Ready to Transform Your Courses?", "Ready to Revolutionize Learning?", "Ready to Empower Students?"]}
                  className="text-background"
                  typingSpeed={80}
                  deletingSpeed={40}
                  delayBetweenWords={3000}
                />
              </h2>
              <p className="text-background/70 leading-relaxed">
                Medhavy turns textbooks into AI-curated, conversational courses inside any 
                LTI-compliant LMS—reducing faculty workload and giving students effortless 
                access to knowledge.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-6 group"
                onClick={() => openModal("demo")}
              >
                Request a Demo
                <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-6 bg-transparent border-background/30 text-background hover:bg-background/10 hover:text-background"
                onClick={() => openModal("learn-more")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {/* Logo Column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="size-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">MEDHAVY</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Built by educators, for educators. Led by Professor Sridhar Srinivas with 
              support from Humanitarians AI fellows.
            </p>
            <div className="flex gap-3 mt-2">
              <button 
                onClick={() => openModal("contact")}
                className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="size-4" />
              </button>
              <button 
                onClick={() => openModal("contact")}
                className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="size-4" />
              </button>
              <button 
                onClick={() => openModal("contact")}
                className="size-9 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="size-4" />
              </button>
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks1.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="flex flex-col gap-3">
              {footerLinks2.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => openModal("contact")}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowRight className="size-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest updates on AI in education.
            </p>
            {isSubscribed ? (
              <p className="text-sm text-green-600 font-medium">Thanks for subscribing!</p>
            ) : (
              <form className="flex gap-2" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-full border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  required
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  className="rounded-full shrink-0"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowRight className="size-4" />
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 - 2027 Medhavy. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => openModal("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openModal("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => openModal("contact")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
