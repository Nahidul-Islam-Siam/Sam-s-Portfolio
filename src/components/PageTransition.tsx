'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

interface PageTransitionProps {
  children: React.ReactNode
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const containerRef = useRef<HTMLDivElement>(null)
  const prevPathnameRef = useRef<string>(pathname)

  useEffect(() => {
    if (prevPathnameRef.current !== pathname && containerRef.current) {
      const container = containerRef.current
      
      // Create exit animation
      const exitTimeline = gsap.timeline()
      exitTimeline.to(container, {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: 'power3.inOut',
      })

      // Create enter animation
      exitTimeline.to(container, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    prevPathnameRef.current = pathname
  }, [pathname])

  return (
    <div ref={containerRef} className="page-transition">
      {children}
    </div>
  )
}

