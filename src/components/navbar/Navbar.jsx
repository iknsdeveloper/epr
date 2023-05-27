'use client'
import Image from 'next/image'
import Link from 'next/link'
import person from '../../../public/person.jpg'
import {signIn, signOut, useSession} from 'next-auth/react'


const Navbar = () => {
  const {data: session} = useSession()


  return (
    <div>
        <h2><Link href="/" className='text-red-600 text-2xl'>logo</Link></h2>
        <ul>
          {
            session?.user
              ? (
                <div>
                  
                  
                  <Image src={person} width='45' height='45' alt='...' />

                  <button onClick={() => {signOut()}}>Logout</button>
                      <p><Link href='/'>Create</Link></p>
                      <p><Link href='/dashboard/queue'>Dashboard</Link></p>                    
                </div>
              )
              : (
                <>
                <div class="flex items-center mt-4 space-x-3 animate-pulse">
                  <svg class="text-gray-200 w-14 h-14 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
                </div>
               
                  <button onClick={() => {signIn()}}>Log in</button>
                  <p><Link href='/register'>Register</Link></p>
                  <p><Link href='/dashboard/queue'>Dashboard</Link></p>
                </>
              )
          }
        </ul>
      </div>

  )
}

export default Navbar