"use client"
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios';
import { BookType } from '../_types/type';
import Book from './Book';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from '../_context/userContext';

function BooksComponent({data,type}:{data:BookType[],type:string}) {

  const [searchKey,setSearchKey] = useState<string>(""); 
  const [searchWord,setSearchWord] = useState<string>("");
  const {user} = useAuth();
 
  const { data:read_books,isLoading } = useQuery("read_books", () =>
  axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/read_books/${user?.username}`
  ).then((res) => res.data).catch((err)=>console.log(err))
  );

  const books = data?.filter((item)=> item.title.toLowerCase().includes(searchWord.toLowerCase()));

  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
    <p className=''></p>
      Loading...
    </div>
  }

  return (
    <div className='w-full h-full'>
      <div className='bg-gray-700 mx-10 drop-shadow-2xl px-8 py-4 rounded-xl'>
          <p className='flex justify-center text-3xl font-bold'>{type}</p>
          <div className='flex justify-center mb-10 gap-4'>
            <InputText className='w-[400px]' placeholder='Search For Book...' onChange={(e:any)=>setSearchKey(e.target.value)}/>
            <Button label='Search' onClick={()=>setSearchWord(searchKey)}/>
          </div>
          <div className='flex justify-center'>
          </div>
          <div className='grid grid-cols-4 gap-5'>
              {books?.map((item)=>{
                const isRead = type === "BOOKS" ? read_books.some((read_book:any)=>read_book.book_id === item.id):true
                return(
                  <Book book={item} isItRead={isRead} user={user!}/>
                )
              })}
          </div>
      </div>
    </div>
  )
  
}

export default React.memo(BooksComponent)