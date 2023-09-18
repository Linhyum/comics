'use client'
import { AppContext } from '@/context/app.context'
import { Comic } from '@/types/comics.type'
import { formatNumber } from '@/utils/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { Fragment, useContext } from 'react'

export default function ComicItem({ item, isDelete }: { item: Comic; isDelete?: boolean }) {
   const router = useRouter()
   const { setHistory } = useContext(AppContext)
   return (
      <button
         onClick={() => router.push(`/comic/${item.id}`)}
         className='relative group block w-full rounded-lg overflow-hidden aspect-[2/3] duration-500 transition-all select-none border-2 border-transparent hover:border-primary'
      >
         {isDelete && (
            <button
               onClick={(e) => {
                  e.stopPropagation()
                  setHistory((prev) => prev.filter((i) => i.id !== item.id))
               }}
               className='absolute z-10 top-1 right-1 rounded w-10 h-10 flex items-center justify-center bg-red-500 text-white'
            >
               <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6'
               >
                  <path
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                  />
               </svg>
            </button>
         )}
         <Image
            src={item.thumbnail}
            alt={item.title}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            className='w-full group-hover:scale-110 duration-500 transition-all h-full object-cover'
         />
         {item.is_trending && (
            <div className='absolute top-0 left-0 py-0.5 px-2 font-semibold bg-red-500 text-white text-xs'>Hot</div>
         )}
         <div className='absolute bottom-0 bg-gradient h-1/2 left-0 right-0 p-2 gap-y-1 flex flex-col items-center justify-end'>
            <h3
               title={item.title}
               className='text-white line-clamp-2 leading-snug text-lg font-bold group-hover:text-primary'
            >
               {item.title}
            </h3>
            <div className='border-b border-b-gray-500 w-full' />
            <div className='text-gray-300 w-full truncate font-medium'>
               {item.genres.map((genre, index) => (
                  <Fragment key={genre.id}>
                     {genre.name} {index === item.genres.length - 1 ? '' : '|'}{' '}
                  </Fragment>
               ))}
            </div>
            <div className='flex items-center gap-x-2'>
               <div className='text-primary flex items-center bg-white bg-opacity-25 gap-x-1 text-xs font-medium px-1 rounded'>
                  <svg
                     data-v-c3ad5561
                     data-v-f5992961
                     xmlns='http://www.w3.org/2000/svg'
                     xmlnsXlink='http://www.w3.org/1999/xlink'
                     aria-hidden='true'
                     role='img'
                     className='icon'
                     width='1em'
                     height='1em'
                     viewBox='0 0 32 32'
                  >
                     <circle cx={16} cy={16} r={4} fill='currentColor' />
                     <path
                        fill='currentColor'
                        d='M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z'
                     />
                  </svg>

                  {formatNumber(item.total_views)}
               </div>
               <div className='text-primary flex items-center bg-white bg-opacity-25 gap-x-1 text-xs font-medium px-1 rounded'>
                  <svg
                     data-v-c3ad5561
                     data-v-f5992961
                     xmlns='http://www.w3.org/2000/svg'
                     xmlnsXlink='http://www.w3.org/1999/xlink'
                     aria-hidden='true'
                     role='img'
                     className='icon'
                     width='1em'
                     height='1em'
                     viewBox='0 0 1024 1024'
                  >
                     <path
                        fill='currentColor'
                        d='M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5c0 201.2-356 429.3-356 429.3z'
                     />
                  </svg>

                  {formatNumber(item.followers)}
               </div>
            </div>
         </div>
      </button>
   )
}
