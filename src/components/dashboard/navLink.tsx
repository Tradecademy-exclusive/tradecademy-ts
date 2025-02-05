'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  Icon: any
  label: string
  href: string
}

const NavLink = ({ Icon, label, href }: NavLinkProps) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`flex items-center group gap-3 text-white text-lg hover:translate-x-3 transition-transform duration-300 group ${
        pathname === href && 'translate-x-3 font-semibold'
      }`}
    >
      {Icon}
      <span
        className={`group-hover:text-lightblue transition-all duration-300 ${
          pathname === href && 'text-lightblue'
        }`}
      >
        {label}
      </span>
    </Link>
  )
}

export default NavLink
