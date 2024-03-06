import React, {forwardRef} from 'react'
import {BurgerButton} from './burger'
import {Magnetic} from './magnetic'

export const Header = forwardRef(function Header(
  _,
  ref: React.Ref<HTMLDivElement>,
) {
  return (
    <header className='fixed flex w-full cursor-pointer justify-end p-[10px] '>
      <Magnetic>
        <BurgerButton ref={ref} />
      </Magnetic>
    </header>
  )
})
