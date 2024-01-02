"use client"

import React, { useState } from 'react'
import { MovieType } from '../_types/type'
import { Rating } from 'primereact/rating';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import axios, { AxiosError } from 'axios';
import { User } from '../_context/userContext';
import { QueryClient, useMutation, useQueryClient } from 'react-query';

function Movie({movie,isItWatched,user}:{movie:MovieType,isItWatched:boolean,user:User}) {

    const [isWatched,setisWatched] = useState(isItWatched);


    const Label = isWatched?"":"I Watched"
    const Icon = isWatched? "pi pi-check":"pi pi-plus"

    const queryClient = useQueryClient()


    const addMutation = useMutation((newMovie:any) => {
        return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_movies`, newMovie)
    },
    {
        onSuccess:(data)=>{
            setisWatched(true);
            alert(data.data.message)
            queryClient.invalidateQueries('watched_movies')
        }
    })

    const deleteMutation = useMutation(() => {
        return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_movies/${user?.username}/${movie.id}`)
    },
    {
        onSuccess:(data)=>{
            setisWatched(false);
            alert(data.data.message)
            queryClient.invalidateQueries('watched_movies')
        }
    })
  

  return (
    <div key={movie.id} className='p-6 rounded-lg shadow-md bg-white'>
        <div className="flex flex-col text-black">
            <div className='w-full flex justify-center'>
                <img src={movie.image_url} className='object-cover w-28 h-44 hover:w-32 hover:h-48 transition rounded-md'></img>
            </div>
            <div className="flex justify-center mt-3">
                <Rating value={Math.floor(movie.vote_average/2)} readOnly cancel={false} />
            </div>
            <p className='font-bold text-balance'>{movie.title}</p>
            <p className='text-xs text-red-600 line-clamp-2'>{movie.overview!}</p>
            <div className="flex flex-row gap-2">
                <Chip label={movie.genre1_name} className='text-xs' />
                <Chip label={movie.genre2_name} className='text-xs'/>
            </div>
            <div className='flex justify-end mt-5'>
                <Button size='small' icon={Icon} label={Label} onClick={()=>{!isWatched? 
                addMutation.mutate({"username":user?.username, "movie_id":movie.id,"rating":4}):
                deleteMutation.mutate()}} />
            </div>
        </div>
    </div>
  )
}

export default React.memo(Movie)