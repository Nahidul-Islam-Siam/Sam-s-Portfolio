import React from 'react'

interface GradientTextProps {
  children: React.ReactNode
  colors: [string, string] // Tuple for from- and to-colors
  textSize?: string // Tailwind text size class, e.g., "text-4xl"
}

const GradientText: React.FC<GradientTextProps> = ({ children, colors, textSize = 'text-base' }) => {
  const [fromColor, toColor] = colors
  const gradientClass = `bg-gradient-to-r from-[${fromColor}] to-[${toColor}]`

  return (
    <span className={`${gradientClass} bg-clip-text text-transparent ${textSize}`}>
      {children}
    </span>
  )
}

export default GradientText
