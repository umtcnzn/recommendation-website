"use client"
import Movies from '@/app/_components/Movies'
import Series from '@/app/_components/Series'
import BookComponent from '@/app/_components/books'
import { useAuth } from '@/app/_context/userContext'
import { BookType, MovieType, SeriesType } from '@/app/_types/type'
import axios from 'axios'
import { redirect } from 'next/navigation'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'

function WatchedRead({ params }: { params: { kindName: string } }) {

  const {user} = useAuth()

  if(params.kindName === "books"){
    const { isLoading, error, data } = useQuery<BookType[]>("all_user_books", () =>
    axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/read_books/all/${user?.username}`
      ).then((res) => res.data).catch((err)=>console.log(err))
  );

  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
      Loading...
    </div>
  }
  
    return (
      <div>
      <BookComponent data={data!} type='READ BOOKS'/>
      </div>
   )
}
  else if(params.kindName === "movies"){
    const { isLoading, error, data } = useQuery<MovieType[]>("all_user_movies", () =>
    axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_movies/all/${user?.username}`
      ).then((res) => res.data).catch((err)=>console.log(err))
    )
    if(isLoading){
      return <div className='w-screen h-screen flex items-center justify-center'> 
        Loading...
      </div>
    }
    return (
      <div>
        <Movies data={data!} type='WATCHED MOVIES'/>
      </div>
   )
  }
  else if(params.kindName === "series"){
    const { isLoading, error, data } = useQuery<SeriesType[]>("all_user_series", () =>
    axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_series/all/${user?.username}`
      ).then((res) => res.data).catch((err)=>console.log(err))
    )
    if(isLoading){
      return <div className='w-screen h-screen flex items-center justify-center'> 
        Loading...
      </div>
    }
    return (
      <div>
        <Series data={data!} type='WATCHED SERIES'/>
      </div>
   )
  }
  return redirect("/not-found")
}

export default React.memo(WatchedRead)