import React, { useState } from 'react'
import { BookType } from '../_types/type'
import { Rating } from 'primereact/rating';
import { Chip } from 'primereact/chip';
import { Button } from 'primereact/button';
import axios, { AxiosError } from 'axios';
import { User, useAuth } from '../_context/userContext';
import { useMutation, useQueryClient } from 'react-query';

function Book({book,isItRead,user}:{book:BookType,isItRead:boolean,user:User}) {

    const [isRead,setIsRead] = useState(isItRead);


    const Label = isRead?"":"I Read"
    const Icon = isRead? "pi pi-check":"pi pi-plus"

    const queryClient = useQueryClient()


    const addMutation = useMutation((newBook:any) => {
        return axios.post(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/read_books`, newBook)
    },
    {
        onSuccess:(data)=>{
            setIsRead(true);
            alert(data.data.message)
            queryClient.invalidateQueries('read_books')
        }
    })

    const deleteMutation = useMutation(() => {
        return axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/user_data/read_books/${user?.username}/${book.id}`)
    },
    {
        onSuccess:(data)=>{
            setIsRead(false);
            alert(data.data.message)
            queryClient.invalidateQueries('read_books')
        }
    })
  

  return (
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
                <Button size='small' icon={Icon} label={Label} onClick={()=>{!isRead? 
                addMutation.mutate({"username":user?.username, "book_id":book.id,"rating":4}):
                deleteMutation.mutate()}} />
            </div>
        </div>
    </div>
  )
}

export default React.memo(Book)