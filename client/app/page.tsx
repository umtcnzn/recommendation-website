"use client"
import { redirect } from "next/navigation";
import { useAuth } from "./_context/userContext"

export default function Home() {

  const {user} = useAuth();

  if(!user){
    return redirect("/login");
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Home
    </main>
  )
}
