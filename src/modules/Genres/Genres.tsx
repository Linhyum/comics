'use client'
import { getComicsByGenre, getGenres } from '@/api/home.api'
import { useQuery } from '@tanstack/react-query'
import React, { useState, useEffect } from 'react'
import { Navigation, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle'
import { useRouter, useSearchParams } from 'next/navigation'
import ComicPaginate from '@/components/ComicPaginate/ComicPaginate'
import { Comic } from '@/types/comics.type'

export default function Genres() {
   const searchParams = useSearchParams()
   const type = searchParams.get('type')
   const [currentPage, setCurrentPage] = useState<number>(1)
   const router = useRouter()
   //categories genres
   const { data: genresData } = useQuery({
      queryKey: ['genres'],
      queryFn: getGenres,
      staleTime: 1000 * 60 * 2
   })
   const categoriesGenres = genresData?.data

   // comics by genre
   const { data } = useQuery({
      queryKey: ['comicsByGenre', type, currentPage],
      queryFn: () => getComicsByGenre(type as string, { page: currentPage })
   })
   const comics = data?.data.comics
   //pagination
   const totalPages: number = data?.data.total_pages as number
   const handlePageClick = (e: { selected: number }) => {
      if (totalPages) {
         setCurrentPage(e.selected + 1)
         document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
         router.push(`/genres?type=${type}&page=${e.selected + 1}`)
      }
   }
   useEffect(() => {
      if (categoriesGenres) {
         document.title = `${categoriesGenres.find((item) => item.id === type)?.name} - Page ${currentPage} | NetTruyen`
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [type, currentPage])
   return (
      <>
         <h1 className='flex mt-10 items-center gap-x-2 text-3xl font-bold mb-5'>
            <svg
               data-v-c3ad5561
               data-v-0eca6ff4
               xmlns='http://www.w3.org/2000/svg'
               xmlnsXlink='http://www.w3.org/1999/xlink'
               aria-hidden='true'
               role='img'
               className='icon text-emerald-500'
               width='36px'
               height='36px'
               viewBox='0 0 640 512'
            >
               <path
                  fill='currentColor'
                  d='M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48c0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8c0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8c26.5 0 48-21.5 48-48s-21.5-48-48-48z'
               />
            </svg>
            <span className='translate-y-0.5'>Genres</span>
         </h1>
         {!categoriesGenres && <div className='bg-gray-400 w-full h-12 animate-pulse' />}
         <Swiper
            className='border-y dark:border-y-gray-700 border-y-gray-300 select-none'
            modules={[Navigation, FreeMode]}
            draggable
            slidesPerView={'auto'}
            freeMode
         >
            {categoriesGenres?.map((item) => (
               <SwiperSlide
                  onClick={() => {
                     router.push(`/genres?type=${item.id}`)
                     setCurrentPage(1)
                  }}
                  className={`!w-max text-base font-medium px-5 py-3 cursor-pointer ${
                     type === item.id && 'bg-primary text-white'
                  }`}
                  key={item.id}
               >
                  {item.name}
               </SwiperSlide>
            ))}
         </Swiper>
         <div className='my-5 flex items-center gap-2 py-2 px-3 rounded bg-sky-500 text-white text-base font-medium'>
            <svg
               data-v-c3ad5561
               data-v-0eca6ff4
               xmlns='http://www.w3.org/2000/svg'
               xmlnsXlink='http://www.w3.org/1999/xlink'
               aria-hidden='true'
               role='img'
               className='icon w-full max-w-[30px]'
               width='30px'
               height='30px'
               viewBox='0 0 16 16'
            >
               <path
                  fill='currentColor'
                  d='M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2Zm.75 3.5a.749.749 0 1 1-1.499 0a.749.749 0 0 1 1.498 0ZM8 7a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 7Z'
               />
            </svg>
            {!categoriesGenres && <div className='w-52 h-10 animate-pulse bg-white' />}
            {categoriesGenres?.find((item) => item.id === type)?.description}
         </div>
         <ComicPaginate
            comics={comics as Comic[]}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
         />
      </>
   )
}
