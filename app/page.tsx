import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeatureSection } from "@/components/feature-section"
import { StatsSection } from "@/components/stats-section"
import { EcosystemSection } from "@/components/ecosystem-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Feature 1: What Medhavy Does - Conversational Textbooks */}
        <FeatureSection
          eyebrow="What B Wells Does"
          title="Conversational Textbooks"
          description="Students ask questions in natural language and receive answers grounded in your course content—not generic internet responses. Created using conceptual scaffolding principles rooted in learning science. Static PDFs become interactive conversations tailored to your curriculum."
          ctaText="Learn More"
          modalType="learn-more"
          imagePosition="left"
        />

        {/* Feature 2: AI as Co-Instructor */}
        <FeatureSection
          title="AI as Co-Instructor"
          description="B Wells automatically creates summaries, quizzes, exams, and lecture notes while keeping you in control. AI proposes. You dispose. Your pedagogical expertise and teaching philosophy stay front and center."
          ctaText="Explore AI co-instruction"
          modalType="explore-ai"
          imagePosition="right"
        />

        {/* Feature 3: Effortless Course Creation */}
        <FeatureSection
          title="Effortless Course Creation"
          description="B Wells imports any course content materials and builds LMS modules, generates assessments, and creates lecture materials. Course prep that used to take weeks now takes an afternoon of review."
          ctaText="See how B Wells saves time"
          modalType="course-creation"
          imagePosition="left"
        />

        {/* Stats Section - Time Savings */}
        <StatsSection />

        {/* Feature 4: Unified Learning Platform */}
        <FeatureSection
          title="Unified Learning Platform"
          description="One cohesive course experience. B Wells unifies textbooks, PDFs, images and videos, and existing LMS content—eliminating frustrating platform jumping for students and instructors."
          ctaText="Discover platform integration"
          modalType="platform-integration"
          imagePosition="right"
        />

        {/* Ecosystem Section */}
        <EcosystemSection />
      </main>

      <Footer />
    </div>
  )
}
