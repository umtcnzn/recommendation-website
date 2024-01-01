import { redirect } from 'next/navigation'
import React from 'react'

function WatchedRead({ params }: { params: { kindName: string } }) {

if(params.kindName === "books"){
  return (
    <div>{params.kindName}</div>
  )
}
return redirect("/not-found")
}

export default WatchedRead