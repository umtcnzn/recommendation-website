"use client"
import Movies from '@/app/_components/Movies'
import Series from '@/app/_components/Series'
import BookComponent from '@/app/_components/books'
import { BookType, MovieType, SeriesType } from '@/app/_types/type'
import { redirect } from 'next/navigation'
import React from 'react'
import { useQueryClient } from 'react-query'

function WatchedRead({ params }: { params: { kindName: string } }) {
  const queryClient = useQueryClient()

  if(params.kindName === "books"){
    const data = queryClient.getQueryData<BookType[]>("books")
    const userData = queryClient.getQueryData<any>("read_books")
    const read_books = data?.filter((item)=>{
      return userData?.some((book:any)=> book.book_id === item.id)
    })
    return (
      <div>
      <BookComponent data={read_books!} type='READ BOOKS'/>
      </div>
   )
}
  else if(params.kindName === "movies"){
    const data = queryClient.getQueryData<MovieType[]>("movies")
    const userData = queryClient.getQueryData<any>("watched_movies")
    const watched_movies = data?.filter((item)=>{
      return userData?.some((movie:any)=> movie.movie_id === item.id)
    })
    return (
      <div>
        <Movies data={watched_movies!} type='WATCHED MOVIES'/>
      </div>
   )
  }
  else if(params.kindName === "series"){
    const data = queryClient.getQueryData<SeriesType[]>("series")
    const userData = queryClient.getQueryData<any>("watched_series")
    const watched_series = data?.filter((item)=>{
      return userData?.some((series:any)=> series.series_id === item.id)
    })
    return (
      <div>
        <Series data={watched_series!} type='WATCHED SERIES'/>
      </div>
   )
  }
  return redirect("/not-found")
}

export default React.memo(WatchedRead)