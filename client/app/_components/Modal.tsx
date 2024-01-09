import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import React, { useState } from 'react'

type ModalProps = {
  isOpen : boolean;
  closeModal : () => void;
  onAccept : (rating:number) => void;
  children: React.ReactNode;
}

function Modal({ isOpen, closeModal,onAccept,children }:ModalProps) {

  const [rating,setRating] = useState(0);


  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="z-50 bg-gray-300 rounded-lg text-black w-[400px] py-2 px-4">
                <div className="flex justify-between items-center">
                    <p className='font-bold text-xl'>Give a Rating</p>
                    <Button size='small' className='w-10' icon={"pi pi-times"} onClick={closeModal}/>
                </div>
                {children}
                <div className="my-5 flex justify-center gap-x-2">
                    <Rating cancel={false} value={rating} onChange={(e:any) => setRating(e.target.value)} />
                </div>
                <div className='flex justify-end gap-x-2'>
                    <Button severity='danger' label='Cancel' size='small' onClick={closeModal} />
                    <Button severity='success' label='Accept' size='small' onClick={()=> onAccept(rating)}/>
                </div>
            </div>
        </div>
      )}
    </>
  )
}

export default Modal