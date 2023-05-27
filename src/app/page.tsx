import HomeNav from "@/components/navbar/HomeNav";

export default function Home() {

  return (
    <main>
      <HomeNav />
      <p>Domain&nbsp; {process.env.NEXTAUTH_URL}</p>
      <p>NEXT_PUBLIC_API_URL {process.env.NEXTAUTH_URL_INTERNAL} </p>
      <p>{process.env.NEXTAUTH_URL_INTERNAL}/api/register</p>
      <p>Version 1.0</p>
    </main>
  )
}
