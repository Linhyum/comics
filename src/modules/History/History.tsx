'use client'
import ComicItem from '@/components/ComicItem/ComicItem'
import LoadingComics from '@/components/Loading/LoadingComics'
import { AppContext } from '@/context/app.context'
import React, { useContext, useEffect } from 'react'

export default function History() {
   const { history } = useContext(AppContext)
   useEffect(() => {
      document.title = 'History | NetTruyen'
   }, [])
   return (
      <div className='h-[calc(100vh-218px)]'>
         <h1 className='text-2xl mt-10 font-bold mb-5 flex items-center gap-x-2'>
            <svg
               data-v-c3ad5561='true'
               data-v-eb07a472='true'
               xmlns='http://www.w3.org/2000/svg'
               xmlnsXlink='http://www.w3.org/1999/xlink'
               aria-hidden='true'
               role='img'
               className='icon text-blue-500'
               width='30px'
               height='30px'
               viewBox='0 0 24 24'
            >
               <path
                  fill='currentColor'
                  d='M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.25 2.52l.77-1.28l-3.52-2.09V8z'
               />
            </svg>
            History
         </h1>
         {history.length > 0 ? (
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-6 gap-4'>
               {!history &&
                  Array(12)
                     .fill(0)
                     .map((_, index) => <LoadingComics key={index} />)}
               {history?.map((item) => (
                  <ComicItem isDelete key={item.id} item={item} />
               ))}
            </div>
         ) : (
            <>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img
                  src='https://cdni.iconscout.com/illustration/premium/thumb/no-transaction-7359562-6024630.png'
                  alt='no history'
                  className='w-80 h-[265px] mt-5 object-cover mx-auto'
               />
               <p className='font-bold text-xl text-center'>Lịch sử trống</p>
            </>
         )}
      </div>
   )
}
