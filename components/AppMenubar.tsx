import { Home } from 'lucide-react'
import React from 'react'
import { navigate } from '../lib/utils'
import { Pagefind } from './Pagefind'
import { Button } from './ui/button'

export function AppMenubar() {
  return (
    <>
      <Button
        onClick={() => navigate('/')}
        variant='ghost'
        className='flex items-center justify-start w-1/5 cursor-pointer'
      >
        <Home />
        <h2 className='hidden md:inline'>My Digital Playground</h2>
      </Button>
      <div className='flex items-center justify-center w-3/5'>
        <Pagefind />
      </div>
      <div id='placeholder' className='w-1/5'>
        &nbsp;
      </div>
    </>
  )
}
