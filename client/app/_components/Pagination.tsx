
import React, { useState,useEffect } from 'react'

function Pagination({totalNumbers,dataPerPage,currentPage,setCurrentPage}:
    {totalNumbers:number,dataPerPage:number,currentPage:number,setCurrentPage:(pageNumber:number)=>void}) {

    type buttonType = {
        id:number,
        pageNumber:number
    }

    const [buttonArray,setButtonArray] = useState<buttonType[]>([])

    const pageNumber = Math.ceil(totalNumbers / dataPerPage)

    useEffect(() => {
        const arrayLength = pageNumber > 5 ? 5 : pageNumber;
        const newArray: buttonType[] = [];
        for (let i = 1; i <= arrayLength; i++) {
            newArray.push({ "id": i, "pageNumber": i });
        }
        setButtonArray(newArray);
    }, [pageNumber]);

    const prevPage = ()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage-1)
            if(buttonArray.at(0)?.pageNumber != 1){
                decreaseArray()
            }
        }
    }

    const nextPage = () =>{
        if (currentPage < pageNumber) {
            setCurrentPage(currentPage + 1);
            if(buttonArray.at(4)?.pageNumber != pageNumber){
                increaseArray()
            }
        }
    }

    const handleButton = (pageNum:number,id:number) => {
        setCurrentPage(pageNum)
        if(id >= 4 && currentPage+1<pageNumber){
            increaseArray()
        }
        else if(id <= 3 && currentPage>3){
            decreaseArray()
        }  
    }

    const increaseArray = () => {
        const updatedArray = buttonArray.map(item => ({ ...item, pageNumber: item.pageNumber + 1 }));
        setButtonArray(updatedArray);
    }

    const decreaseArray = () => {
        const updatedArray = buttonArray.map(item => ({ ...item, pageNumber: item.pageNumber - 1 }));
        setButtonArray(updatedArray);
    }

    const firstPage = () => {
        setCurrentPage(1);
        const updatedArray = buttonArray.map(item => ({ ...item, pageNumber: item.pageNumber = item.id }));
        setButtonArray(updatedArray);
    }

    const lastPage = () => {
        setCurrentPage(pageNumber);
        const updatedArray = buttonArray.map(item => ({ ...item, pageNumber: item.pageNumber = item.id + pageNumber - 5 }));
        setButtonArray(updatedArray);
    }


  return (
    <div className='flex-row flex justify-center gap-2 mb-8'>
        <button onClick={firstPage} disabled={currentPage === 1} className='w-10'>{"<<"}</button>
        <button onClick={prevPage} disabled={currentPage ===1 ?true:false} className='w-10'>{"<"}</button>
        {buttonArray.map((item)=>{
            return <button key={item.id} onClick={()=>handleButton(item.pageNumber,item.id)}
             className={`w-10 h-10 text-[14px] cursor-pointer rounded border-none drop-shadow-md
             ${currentPage===item.pageNumber?"bg-red-500 pointer-events-none text-black font-bold":""}`}>
                {item.pageNumber}
                </button>
        })}
        <button onClick={nextPage} disabled={currentPage === pageNumber?true:false} className='w-10'>{">"}</button>
        <button onClick={lastPage} disabled={currentPage === pageNumber} className='w-10'>{">>"}</button>
    </div>
  )
}

export default React.memo(Pagination)