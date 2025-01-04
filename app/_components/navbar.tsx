"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { UserButton } from "@clerk/nextjs"

export function Navbar() {
  const pathname = usePathname()

  function activeLink(path: string) {
    if (pathname !== path) return "text-muted-foreground"

    return "text-primary font-bold"
  }

  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="Finance-AI" width={173} height={39} />

        <Link href="/" className={activeLink("/")}>
          Dashboard
        </Link>
        <Link href="/transactions" className={activeLink("/transactions")}>
          Transações
        </Link>
        <Link href="/subscription" className={activeLink("/subscription")}>
          Assinatura
        </Link>
      </div>

      <UserButton showName />
    </nav>
  )
}
