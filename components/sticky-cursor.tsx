'use client'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {
  animate,
  motion,
  transform,
  useMotionValue,
  useSpring,
} from 'framer-motion'

interface TransformTemplate {
  rotate: string
  scaleX: number
  scaleY: number
  x: number
  y: number
}

interface StickyCursorProps {
  stickyElement: React.RefObject<HTMLElement>
}

export function StickyCursor({stickyElement}: StickyCursorProps) {
  const cursorRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

  const cursorSize = isHovered ? 60 : 20

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  }

  const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  }

  const scale = {
    x: useMotionValue(1),
    y: useMotionValue(1),
  }

  const rotate = (distance: {x: number; y: number}) => {
    const angle = Math.atan2(distance.y, distance.x)
    animate(cursorRef.current, {rotate: `${angle}rad`}, {duration: 0})
  }

  const manageMouseMove = useCallback(
    (event: MouseEvent) => {
      const {clientX, clientY} = event
      if (stickyElement.current === null) return
      const {left, top, width, height} =
        stickyElement.current?.getBoundingClientRect()

      const center = {x: left + width / 2, y: top + height / 2}
      const distance = {x: clientX - center.x, y: clientY - center.y}

      if (isHovered) {
        // Rotate the cursor
        rotate(distance)

        // Stretch the cursor based on the distance between the pointer and the custom cursor
        const absDistance = Math.max(Math.abs(distance.x), Math.abs(distance.y))
        const newScaleX = transform(absDistance, [0, width / 2], [1, 1.3])
        const newScaleY = transform(absDistance, [0, height / 2], [1, 0.8])
        scale.x.set(newScaleX)
        scale.y.set(newScaleY)

        mouse.x.set(center.x - cursorSize / 2 + distance.x / 10)
        mouse.y.set(center.y - cursorSize / 2 + distance.y / 10)
      } else {
        mouse.x.set(clientX - cursorSize / 2)
        mouse.y.set(clientY - cursorSize / 2)
      }
    },
    [mouse.x, mouse.y, cursorSize, isHovered, stickyElement],
  )

  const manageMouseOver = () => {
    setIsHovered(true)
  }

  const manageMouseLeave = () => {
    setIsHovered(false)
    animate(
      cursorRef.current,
      {scaleX: 1, scaleY: 1},
      {duration: 0.1, type: 'spring'},
    )
  }

  useEffect(() => {
    window.addEventListener('mousemove', manageMouseMove)
    if (stickyElement.current !== null) {
      stickyElement.current?.addEventListener('mouseover', manageMouseOver)
      stickyElement.current?.addEventListener('mouseleave', manageMouseLeave)
    }
    return () => {
      window.removeEventListener('mousemove', manageMouseMove)
      if (stickyElement.current !== null) {
        stickyElement.current?.removeEventListener('mouseover', manageMouseOver)
        stickyElement.current?.removeEventListener(
          'mouseleave',
          manageMouseLeave,
        )
      }
    }
  }, [manageMouseMove, stickyElement])

  const template = ({rotate, scaleX, scaleY, x, y}: TransformTemplate) => {
    return `rotate(${rotate}) scaleX(${scaleX}) scaleY(${scaleY})`
  }
  return (
    <motion.div
      transformTemplate={template}
      ref={cursorRef}
      className='pointer-events-none fixed -z-50 h-5 w-5 rounded-full bg-black'
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        scaleX: scale.x,
        scaleY: scale.y,
      }}
      animate={{width: cursorSize, height: cursorSize}}
    ></motion.div>
  )
}
