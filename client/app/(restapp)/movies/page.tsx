"use client"

import Movies from '@/app/_components/Movies'
import { MovieType } from '@/app/_types/type';
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';

function MoviesPage() {


  const { isLoading, error, data } = useQuery<MovieType[]>("movies", () =>
    axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/movies/`
      ).then((res) => res.data).catch((err)=>console.log(err)),{refetchOnWindowFocus:false,refetchOnReconnect:false,
        refetchOnMount:false}
  );


  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
      Loading...
    </div>
  }

  return (
    <div>
      <Movies data={data!} type='MOVIES' />
    </div>
  )
}

export default React.memo(MoviesPage)