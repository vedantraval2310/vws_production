'use client'
import { ModeToggle } from '@/components/global/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

type Props = {
  user?: null | User
}

const Navigation = ({ user }: Props) => {
  const scrollToPricing = (e: { preventDefault: any }) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (window.location.hash === '#pricing') {
      scrollToPricing({preventDefault: () => {}});
    }
  }, []);
  return (
    <div className="fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10">
      <aside className="flex items-center gap-2">
        <Image
          src={'./assets/plura-logo.svg'}
          width={40}
          height={40}
          alt="plur logo"
        />
        <span className="text-xl font-bold"> VWS.</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
        <a href="#pricing" onClick={scrollToPricing}>Pricing</a>
          <Link href={'https://documentation-vws.vercel.app/about'}>About</Link>
          <Link href={'https://documentation-vws.vercel.app/'}>Documentation</Link>
          <Link href={'https://documentation-vws.vercel.app/#features'}>Features</Link>
        </ul>
      </nav>
      <aside className="flex gap-2 items-center">
        <Link
          href={'/agency'}
          className="bg-primary text-white p-2 px-4 rounded-md hover:bg-primary/80"
        >
          Dashboard
        </Link>
        <UserButton />
        <ModeToggle />
      </aside> 
    </div>
  )
}

export default Navigation
