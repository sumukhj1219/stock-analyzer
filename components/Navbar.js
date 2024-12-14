'use client'
import { useAuth, UserButton } from '@clerk/nextjs'
import { Button } from './ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Navbar() {
  const { isLoaded, userId, sessionId, getToken } = useAuth()

  return (
    
    <div className='shadow-xl p-6 animate-pulse shadow-neutral-700'>
      <div className='flex items-center justify-between'>
        {!userId ? (<Link href={'/sign-in'} className='bg-black rounded-xl border-b-4 font-extrabold border-b-gray-400 p-4 py-2 m-4 text-white w-52'>Sign In</Link>) : (<div><UserButton  /></div>)
      }
      <Link href={'https://in.tradingview.com/chart/8daX0FdT/'} className='w-56 p-4 bg-gradient-to-r from-sky-500 to-purple-600 via-blue-600'>
        <span className='text-secondary font-extrabold '>Trading view</span>
      </Link>    
       </div>
      
    </div>
     
  
  )
}