'use client'

import {cn} from '@/utils/cn'
import {forwardRef, useState} from 'react'
import {Magnetic} from './magnetic'

interface BurgerButtonProps {
  hidden?: boolean
}

export const BurgerButton = forwardRef(function BurgerButton(
  {hidden = false}: BurgerButtonProps,
  ref: React.Ref<HTMLDivElement>,
) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <button
      aria-label='Menu Navigation Button'
      aria-expanded={isSidebarOpen}
      aria-controls='menu'
      className={cn(
        'ease-expo group pointer-events-none relative flex flex-col items-center justify-center rounded-full p-[30px] transition-all duration-1000',
        hidden ? 'scale-0' : 'scale-100',
      )}
      onClick={() => toggleSidebar()}
    >
      <div
        className='pointer-events-auto absolute left-0 top-0 h-full w-full hover:scale-[300%]'
        ref={ref}
      ></div>
      <span
        className={cn(
          'ease-in-out-circ pointer-events-none absolute h-[2px] w-7 rounded-full bg-black transition-all duration-300 group-hover:bg-white group-hover:duration-100 2xl:w-9',
          isSidebarOpen ? '-translate-y-1 rotate-0' : 'translate-y-0 rotate-45',
        )}
      ></span>
      <span
        className={cn(
          'ease-in-out-circ pointer-events-none absolute h-[2px] w-7  translate-y-1 rotate-0 rounded-full bg-black transition-all duration-300 group-hover:bg-white group-hover:duration-100 2xl:w-9',
          isSidebarOpen ? 'translate-y-1 rotate-0' : 'translate-y-0 -rotate-45',
        )}
      ></span>
    </button>
  )
})
