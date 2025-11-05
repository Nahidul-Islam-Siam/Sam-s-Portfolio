import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'
import PageTransition from '@/components/PageTransition'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Siam | Full Stack Developer Portfolio',
  description: 'Welcome to Siam\'s portfolio — Full Stack Developer specializing in Next Js and Node.js.',
  icons: {
    icon: '/hero.jpg',
  },
  openGraph: {
    title: 'Siam | Full Stack Developer Portfolio',
    description: 'Welcome to Siam\'s portfolio — Full Stack Developer specializing in Next Js and Node.js.',
    images: ['https://siams-portfolio.vercel.app/og-image.jpg'],
    url: 'https://siams-portfolio.vercel.app/',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Siam | Full Stack Developer Portfolio',
    description: 'Welcome to Siam\'s portfolio — Full Stack Developer specializing in React and Node.js.',
    images: ['https://siams-portfolio.vercel.app/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${inter.className}`}>
        <ThemeProvider>
          <PageTransition>
            {children}
          </PageTransition>
        </ThemeProvider>
      </body>
    </html>
  )
}

