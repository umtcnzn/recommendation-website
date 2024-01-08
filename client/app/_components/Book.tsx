import React, { useState } from 'react'
import { BookType } from '../_types/type'
import { Rating } from 'primereact/rating';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import axios from 'axios';
import { User } from '../_context/userContext';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';

function Book({book,isItRead,user}:{book:BookType,isItRead:boolean,user:User}) {

    const [isOpen,setIsOpen] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const Label = isItRead?"":"I Read"
    const Icon = isItRead? "pi pi-check":"pi pi-plus"

    const queryClient = useQueryClient()

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () =>{
        setIsOpen(false);
        setIsLoading(false);
    }


    const addMutation = useMutation((newBook:any) => {
        return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/read_books`, newBook)
    },
    {
        onSuccess:(response)=>{
            alert(response.data.message);
            queryClient.invalidateQueries('read_books');
        }
    })

    const deleteMutation = useMutation(() => {
        return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/read_books/${user?.username}/${book.id}`)
    },
    {
        onSuccess:(response)=>{
            alert(response.data.message)
            setIsLoading(false)
            queryClient.invalidateQueries('read_books')
            queryClient.invalidateQueries('all_user_books')
        },
    })
  

    function onAccept(rating:number){
        addMutation.mutate({"username":user.username,"book_id":book.id,"rating":rating})
        closeModal()
    }

  return (
    <>
    <div key={book.id} className='p-6 rounded-lg shadow-md bg-white'>
        <div className="flex flex-col text-black">
            <div className='w-full flex justify-center'>
                <img src={book.image_url} className='object-cover w-28 h-44 hover:w-32 hover:h-48 transition rounded-md'></img>
            </div>
            <div className="flex justify-center mt-3">
                <Rating value={Math.floor(book.vote_average)} readOnly cancel={false} />
            </div>
            <p className='font-bold text-balance'>{book.title}</p>
            <p className='text-xs text-red-600'>{book.authors.length>40?book.authors.slice(0,40):book.authors}</p>
            <div className="flex flex-row gap-2">
                <Chip label={book.genre1_name} className='text-xs' />
                <Chip label={book.genre2_name} className='text-xs'/>
            </div>
            <div className='flex justify-end mt-5'>
                <Button loading={isLoading} size='small' icon={Icon} label={Label} 
                onClick={()=> {!isItRead ? openModal() : deleteMutation.mutate(); setIsLoading(true)}} />
            </div>
        </div>
        <Modal isOpen={isOpen} closeModal={closeModal} onAccept={onAccept}>
            <div className='font-medium'>
                {book.title}
            </div>
        </Modal>
    </div>
    </>
  )
}

export default Book