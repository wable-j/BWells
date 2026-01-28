"use client"

import { useState, useEffect, useCallback } from "react"

interface TypewriterProps {
  words: string[]
  className?: string
  typingSpeed?: number
  deletingSpeed?: number
  delayBetweenWords?: number
}

export function Typewriter({
  words,
  className = "",
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenWords = 2000,
}: TypewriterProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const type = useCallback(() => {
    const currentWord = words[currentWordIndex]

    if (isDeleting) {
      setCurrentText(currentWord.substring(0, currentText.length - 1))
    } else {
      setCurrentText(currentWord.substring(0, currentText.length + 1))
    }

    if (!isDeleting && currentText === currentWord) {
      setTimeout(() => setIsDeleting(true), delayBetweenWords)
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false)
      setCurrentWordIndex((prev) => (prev + 1) % words.length)
    }
  }, [currentText, currentWordIndex, isDeleting, words, delayBetweenWords])

  useEffect(() => {
    const timeout = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timeout)
  }, [type, isDeleting, deletingSpeed, typingSpeed])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
}

export function TypewriterText({
  text,
  className = "",
  speed = 30,
  delay = 0,
  onComplete,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [displayedText, text, speed, started, onComplete])

  return <span className={className}>{displayedText}</span>
}
