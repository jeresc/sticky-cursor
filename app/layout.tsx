import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Sticky Cursor',
  description:
    'This is a website showcasing the sticky cursor effect powered by Next.js and Framer Motion',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: Readonly<RootLayoutProps>) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
