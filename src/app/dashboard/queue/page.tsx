'use client'

import { setActiveUser, setUserRole } from '@/app/globalredux/features/user/userSlice'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const ClientProtectPage = () => {

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin?callbackUrl=/dashboard/queue')
    }
  })

  const dispatch = useDispatch();

  useEffect(() => {
    const userRole = session?.user?.name || "...";
    dispatch(setUserRole(userRole));

    const activeUser = session?.user?.email || "...";
    dispatch(setActiveUser(activeUser));
  }, [session?.user?.email]);

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <>
      <section className='py-24'>
        <div className='container'>
          <h1 className='text-2xl font-bold'>
            This is a <span className='text-emerald-500'>client-side</span>{' '}
            protected page
          </h1>
          <h2 className='mt-4 font-medium'>You are logged in as: {session?.user?.name} -</h2>
          <p className='mt-4'>{session?.user?.email}</p>
        </div>
      </section>
    </>
  )
}

export default ClientProtectPage