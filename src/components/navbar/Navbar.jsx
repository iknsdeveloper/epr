'use client'
import Image from 'next/image'
import Link from 'next/link'
import person from '../../../public/person.jpg'
import {signIn, signOut, useSession} from 'next-auth/react'

const Navbar = () => {
  const {data: session} = useSession()

  return (
    <div>

        <h2>
          <Link href="/" className='text-red-600 text-2xl'>logo</Link>
        </h2>
        <ul>
          {
            session?.user
              ? (
                <div>
                  <Image src={person} width='45' height='45' alt='...' />
                  <button onClick={() => {signOut()}}>Logout</button>
                      <p><Link href='/'>Create</Link></p>
                      <p><Link href='/dashboard/queue'>Dashbopard</Link></p>                    
                </div>
              )
              : (
                <>
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