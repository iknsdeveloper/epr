import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p>
          Domain&nbsp; {process.env.NEXTAUTH_URL}</p>
        <p>NEXT_PUBLIC_API_URL {process.env.NEXT_PUBLIC_API_URL} </p>


        <p>{`${process.env.NEXTAUTH_URL_INTERNAL}/api/register`}</p>

      </div>




    </main>
  )
}
