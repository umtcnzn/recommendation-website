"use client"
import Series from '@/app/_components/Series';
import { SeriesType } from '@/app/_types/type';
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';



function SeriesPage() {
  const { isLoading, error, data } = useQuery<SeriesType[]>("series", () =>
  axios.get(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/series/`)
  .then((res) => res.data).catch((err)=>console.log(err))
  );

  
  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
      Loading...
    </div>
  }

  return (
    <div>
      <Series data={data!} type='SERIES' />
    </div>
  )
}

export default SeriesPage