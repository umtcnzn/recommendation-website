"use client"

import { useAuth } from "../_context/userContext"


export default function Home() {

  const {logout} = useAuth();

  return (
    <>
      <main>
        <p onClick={logout} className="underline text-white">LogOut</p>
      </main>
    </>
  )
}

