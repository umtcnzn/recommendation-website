"use client"

import React from 'react'

function getRecom({ params }: { params: { kindName: string }} ) {


  return (
    <div>
      {params.kindName}
    </div>
  )
}

export default getRecom