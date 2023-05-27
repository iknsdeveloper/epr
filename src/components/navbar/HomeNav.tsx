"use client"
import Link from 'next/link';

export default function HomeNav() {
  return (
    <>
      <Link href="/dashboard/queue" className="font-medium text-primary-600 hover:underline">
        Demo
      </Link>
    </>
  );
}
