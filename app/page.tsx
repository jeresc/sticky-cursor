'use client'
import {Header} from '@/components/header'
import {useRef} from 'react'
import {StickyCursor} from '@/components/sticky-cursor'

export default function Home() {
  const stickyElement = useRef(null)

  return (
    <main className='min-h-screen'>
      <Header ref={stickyElement} />
      <StickyCursor stickyElement={stickyElement} />
    </main>
  )
}
