"use client"

import React, { useEffect, useRef, useState } from "react"
import { Clock, Shield, TrendingDown, Zap } from "lucide-react"

export function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedTraditional, setAnimatedTraditional] = useState(0)
  const [animatedMedhavy, setAnimatedMedhavy] = useState(0)
  const [animatedReduction, setAnimatedReduction] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

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

  // Animate numbers when visible
  useEffect(() => {
    if (!isVisible) return

    const traditionalTarget = 120
    const medhavyTarget = 6
    const reductionTarget = 95

    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setAnimatedTraditional(Math.round(traditionalTarget * easeOut))
      setAnimatedMedhavy(Math.round(medhavyTarget * easeOut))
      setAnimatedReduction(Math.round(reductionTarget * easeOut))

      if (step >= steps) {
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [isVisible])

  const traditionalHeight = (animatedTraditional / 120) * 100
  const medhavyHeight = (animatedMedhavy / 120) * 100

  // Y-axis labels
  const yAxisLabels = [120, 100, 80, 60, 40, 20, 0]

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-background to-sky-50/50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl" />
      </div>
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Header */}
        <div 
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 text-balance text-blue-950">
            Weeks to Hours
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            The &ldquo;Co-instructor&rdquo; model means AI proposes, and you dispose. See the dramatic efficiency gains in course preparation.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-6 items-start">
          {/* Bar Chart - takes 3 columns */}
          <div 
            className={`lg:col-span-3 bg-card rounded-2xl border border-blue-100 p-6 md:p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.01] hover:border-blue-200 group ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="text-lg font-semibold mb-8 text-center text-blue-900 group-hover:text-blue-700 transition-colors">
              Course Creation Time Investment
            </h3>
            
            {/* Chart with Y-axis */}
            <div className="flex gap-4">
              {/* Y-axis */}
              <div className="flex flex-col justify-between h-52 text-xs text-muted-foreground pr-2 border-r border-blue-200">
                {yAxisLabels.map((label) => (
                  <span key={label} className="text-right tabular-nums -translate-y-1">
                    {label}
                  </span>
                ))}
              </div>

              {/* Chart area */}
              <div className="flex-1">
                {/* Grid lines */}
                <div className="relative h-52 mb-2">
                  {/* Horizontal grid lines */}
                  {yAxisLabels.map((_, index) => (
                    <div 
                      key={index}
                      className="absolute w-full border-t border-dashed border-blue-100"
                      style={{ top: `${(index / (yAxisLabels.length - 1)) * 100}%` }}
                    />
                  ))}
                  
                  {/* Bars container */}
                  <div className="absolute inset-0 flex items-end justify-center gap-16 md:gap-24 px-8">
                    {/* Traditional Prep Bar */}
                    <div className="flex flex-col items-center">
                      <div className="relative h-52 w-20 md:w-28 flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-slate-400 to-slate-300 rounded-t-lg transition-all duration-1000 ease-out hover:from-slate-500 hover:to-slate-400 cursor-pointer group/bar"
                          style={{ height: `${traditionalHeight}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground bg-card px-2 py-1 rounded shadow-sm border border-slate-200">
                            {animatedTraditional}h
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medhavy Prep Bar */}
                    <div className="flex flex-col items-center">
                      <div className="relative h-52 w-20 md:w-28 flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out delay-500 hover:from-blue-700 hover:to-blue-500 cursor-pointer shadow-lg shadow-blue-500/30"
                          style={{ height: `${medhavyHeight}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-foreground bg-card px-2 py-1 rounded shadow-sm border border-blue-200">
                            {animatedMedhavy}h
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* X-axis labels */}
                <div className="flex justify-center gap-16 md:gap-24 px-8 pt-4 border-t border-blue-200">
                  <span className="text-sm text-muted-foreground font-medium text-center w-20 md:w-28">
                    Traditional Prep
                  </span>
                  <span className="text-sm text-blue-600 font-medium text-center w-20 md:w-28">
                    B Wells Prep
                  </span>
                </div>
              </div>
            </div>

            {/* Y-axis label */}
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-6">
              <Clock className="size-3 text-blue-500" />
              <span>Hours</span>
            </div>

            {/* Footnote inside chart */}
            <p className="text-xs text-muted-foreground/70 text-center mt-4 italic">
              *Based on average faculty reporting for 3-credit course creation.
            </p>
          </div>

          {/* Stats Cards - takes 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* 95% Time Reduction */}
            <div 
              className={`relative bg-card rounded-2xl border border-blue-100 p-6 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/15 hover:scale-[1.03] hover:border-blue-300 group cursor-pointer ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-sky-500/0 to-indigo-500/0 group-hover:from-blue-500/5 group-hover:via-sky-500/5 group-hover:to-indigo-500/5 transition-all duration-700" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
              <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
              
              <div className="relative flex items-start gap-4">
                <div className="h-full w-1.5 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full group-hover:scale-y-125 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all origin-top" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900 group-hover:text-blue-600 transition-colors">
                      {animatedReduction}
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-blue-900 group-hover:text-blue-600 transition-colors">%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="size-4 text-blue-500 group-hover:animate-bounce" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                      Time Reduction
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Faculty move from content creation to content curation.
                  </p>
                </div>
              </div>
            </div>

            {/* 100% Instructor Control */}
            <div 
              className={`relative bg-card rounded-2xl border border-blue-100 p-6 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/15 hover:scale-[1.03] hover:border-blue-300 group cursor-pointer ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "500ms" }}
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 via-blue-500/0 to-indigo-500/0 group-hover:from-sky-500/5 group-hover:via-blue-500/5 group-hover:to-indigo-500/5 transition-all duration-700" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
              <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
              
              <div className="relative flex items-start gap-4">
                <div className="h-full w-1.5 bg-gradient-to-b from-sky-600 to-sky-400 rounded-full group-hover:scale-y-125 group-hover:shadow-lg group-hover:shadow-sky-500/50 transition-all origin-top" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900 group-hover:text-sky-600 transition-colors">
                      100
                    </span>
                    <span className="text-2xl md:text-3xl font-bold text-blue-900 group-hover:text-sky-600 transition-colors">%</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="size-4 text-sky-500 group-hover:animate-pulse" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                      Instructor Control
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    AI generates drafts, but nothing goes live without your approval.
                  </p>
                </div>
              </div>
            </div>

            {/* 3x Faster Updates */}
            <div 
              className={`relative bg-card rounded-2xl border border-blue-100 p-6 shadow-sm overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/15 hover:scale-[1.03] hover:border-blue-300 group cursor-pointer ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
              }`}
              style={{ transitionDelay: "700ms" }}
            >
              {/* Animated background on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-blue-500/0 to-sky-500/0 group-hover:from-indigo-500/5 group-hover:via-blue-500/5 group-hover:to-sky-500/5 transition-all duration-700" />
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
              <div className="absolute -left-10 -bottom-10 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100" />
              
              <div className="relative flex items-start gap-4">
                <div className="h-full w-1.5 bg-gradient-to-b from-indigo-600 to-indigo-400 rounded-full group-hover:scale-y-125 group-hover:shadow-lg group-hover:shadow-indigo-500/50 transition-all origin-top" />
                <div className="flex-1">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-4xl md:text-5xl font-bold tracking-tight text-blue-900 group-hover:text-indigo-600 transition-colors">
                      3x
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="size-4 text-indigo-500 group-hover:animate-ping" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                      Faster Updates
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Iterate on course materials three times faster than traditional methods.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
