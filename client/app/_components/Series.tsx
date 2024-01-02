"use client"
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios';
import { SeriesType } from '../_types/type';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useAuth } from '../_context/userContext';
import Serie from './Serie';

function Series({data,type}:{data:SeriesType[],type:string}) {

  const [searchKey,setSearchKey] = useState<string>(""); 
  const [searchWord,setSearchWord] = useState<string>("");
  const {user} = useAuth();
 
  const { data:watched_series,isLoading } = useQuery("watched_series", () =>
  axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_series/${user?.username}`
  ).then((res) => res.data).catch((err)=>console.log(err))
  );


  const series = data?.filter((item)=> item.title.toLowerCase().includes(searchWord.toLowerCase()));


  
  if(isLoading){
    return <div className='w-screen h-screen flex items-center justify-center'> 
      Loading...
    </div>
  }

  return (
    <div className='w-full h-full'>
      <div className='bg-gray-700 mx-10 drop-shadow-2xl px-8 py-4 rounded-xl'>
          <p className='flex justify-center text-3xl font-bold'>{type}</p>
          <div className='flex justify-center mb-10 gap-4'>
            <InputText className='w-[400px]' placeholder='Search For Movie...' onChange={(e:any)=>setSearchKey(e.target.value)}/>
            <Button label='Search' onClick={()=>setSearchWord(searchKey)}/>
          </div>
          <div className='flex justify-center'>
          </div>
          <div className='grid grid-cols-4 gap-5'>
              {series?.map((item)=>{
                const isWatched = type === "SERIES" ? watched_series.some((watched_serie:any)=>watched_serie.serie_id === item.id):true
                return(
                  <Serie serie={item} isItWatched={isWatched} user={user!}/>
                )
              })}
          </div>
      </div>
    </div>
  )
  
}

export default React.memo(Series)