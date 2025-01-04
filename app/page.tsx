import { redirect } from "next/navigation"

import { auth } from "@clerk/nextjs/server"

import { Navbar } from "./_components/navbar"

export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login")
  }

  return (
    <>
      <Navbar />
    </>
  )
}
