"use client"

import { Button } from "primereact/button";
import { useAuth } from "../_context/userContext"


export default function Home() {

  const {user,logout} = useAuth();

  return (
    <>
      <main className="w-screen h-full flex justify-center">
        <div className="flex flex-col">
        <div className="text-white flex flex-row gap-2">
          <Button rounded icon="pi pi-user" size="small"/>
          <p>{user?.username}</p>
        </div>
        <p onClick={logout} className="underline-none text-white cursor-pointer">LogOut</p>
        </div>
      </main>
    </>
  )
}

