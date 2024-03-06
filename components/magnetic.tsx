'use client'
import React, {useRef, useState} from 'react'
import {motion} from 'framer-motion'

interface MagneticProps {
  children: React.ReactElement
}

export function Magnetic({children}: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)

  const [position, setPosition] = useState({x: 0, y: 0})

  const mouseMove = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (!ref.current) return
    const {clientX, clientY} = e
    const {width, height, left, top} = ref.current?.getBoundingClientRect()
    let middleX = clientX - (left + width / 2)
    let middleY = clientY - (top + height / 2)
    setPosition({x: middleX * 0.1, y: middleY * 0.1})
  }

  const mouseLeave = () => {
    setPosition({x: 0, y: 0})
  }

  const {x, y} = position
  return (
    <motion.span
      className='p-2'
      ref={ref}
      onMouseMove={(e) => mouseMove(e)}
      onMouseLeave={() => mouseLeave()}
      animate={{x, y}}
      transition={{type: 'spring', stiffness: 350, damping: 5, mass: 0.5}}
    >
      {children}
    </motion.span>
  )
}
