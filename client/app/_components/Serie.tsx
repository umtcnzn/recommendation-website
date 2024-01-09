"use client"

import React, { useState } from 'react'
import { SeriesType } from '../_types/type'
import { Rating } from 'primereact/rating';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import axios, { AxiosError } from 'axios';
import { User } from '../_context/userContext';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';

function Serie({serie,isItWatched,user}:{serie:SeriesType,isItWatched:boolean,user:User}) {

    const [isOpen,setIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const Label = isItWatched?"":"I Watched"
    const Icon = isItWatched? "pi pi-check":"pi pi-plus"

    const queryClient = useQueryClient();

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
        setIsLoading(false);
    }



    const addMutation = useMutation((newSerie:any) => {
        return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_series`, newSerie)
    },
    {
        onSuccess:(data)=>{
            alert(data.data.message)
            queryClient.invalidateQueries('watched_series')
        }
    })

    const deleteMutation = useMutation(() => {
        return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/watched_series/${user?.username}/${serie.id}`)
    },
    {
        onSuccess:(data)=>{
            alert(data.data.message)
            setIsLoading(false);
            queryClient.invalidateQueries('watched_series')
        }
    })

    function onAccept(rating:number){
        addMutation.mutate({"username":user.username,"serie_id":serie.id,"rating":rating})
        closeModal()
    }
  

  return (
    <div key={serie.id} className='p-6 rounded-lg shadow-md bg-white'>
        <div className="flex flex-col text-black">
            <div className='w-full flex justify-center'>
                <img src={serie.image_url} className='object-cover w-28 h-44 hover:w-32 hover:h-48 transition rounded-md'></img>
            </div>
            <div className="flex justify-center mt-3">
                <Rating value={Math.floor(serie.vote_average/2)} readOnly cancel={false} />
            </div>
            <p className='font-bold text-balance'>{serie.title}</p>
            <p className='text-xs text-red-600 line-clamp-2'>{serie.overview!}</p>
            <div className="flex flex-row gap-2">
                <Chip label={serie.genre1_name} className='text-xs' />
                <Chip label={serie.genre2_name} className='text-xs'/>
            </div>
            <div className='flex justify-end mt-5'>
                <Button size='small' icon={Icon} label={Label} loading={isLoading}
                onClick={()=>{!isItWatched ? openModal():deleteMutation.mutate()}} />
            </div>
            <Modal isOpen={isOpen} closeModal={closeModal} onAccept={onAccept}>
                <div className='font-medium'>
                    {serie.title}
                </div>
            </Modal>
        </div>
    </div>
  )
}

export default React.memo(Serie)