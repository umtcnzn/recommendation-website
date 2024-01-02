"use client"

import BooksComponent from "@/app/_components/books"
import { BookType } from "@/app/_types/type";
import axios from "axios";

import React from 'react'
import { useQuery } from "react-query";

function Books() {

  const { isLoading, error, data } = useQuery<BookType[]>("books", () =>
    axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/books/`
      ).then((res) => res.data).catch((err)=>console.log(err))
  );
  
  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
      Loading...
    </div>
  }


  return (
    <div>
      <BooksComponent data={data!} type="BOOKS"/>
    </div>
  )
}

export default React.memo(Books)