'use client'
import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBoyComics, getCompleted, getGirlComics, getRecent, getTrending } from '@/api/home.api'
import ComicsList from '@/components/ComicsList/ComicsList'
import LoadingComics from '@/components/Loading/LoadingComics'
export default function Home() {
   // trending comics
   const trendingData = useQuery({
      queryKey: ['trending'],
      queryFn: () => getTrending({ page: 1 }),
      staleTime: 60 * 1000
   })
   const trendingComics = trendingData.data?.data.comics

   // completed comics
   const completedData = useQuery({
      queryKey: ['completed'],
      queryFn: () => getCompleted({ page: 1 }),
      staleTime: 60 * 1000
   })
   const completedComics = completedData.data?.data.comics

   // Recently Update
   const recentUpdateData = useQuery({
      queryKey: ['recentUpdate'],
      queryFn: () => getRecent({ page: 1 }),
      staleTime: 60 * 1000
   })
   const recentUpdateComics = recentUpdateData.data?.data.comics

   // Boy Comics
   const boyComicsData = useQuery({
      queryKey: ['boyComics'],
      queryFn: () => getBoyComics({ page: 1 }),
      staleTime: 60 * 1000
   })
   const boyComics = boyComicsData.data?.data.comics

   // Girl Comics
   const girlComicsData = useQuery({
      queryKey: ['girlComics'],
      queryFn: () => getGirlComics({ page: 1 }),
      staleTime: 60 * 1000
   })
   const girlComics = girlComicsData.data?.data.comics
   useEffect(() => {
      document.title = 'Đọc Truyện Tranh Online - Website chính thức - NetTruyen.COM'
   }, [])
   if (!trendingComics || !completedComics || !recentUpdateComics || !boyComics || !girlComics)
      return (
         <>
            <div className='flex items-center justify-between mt-10 mb-5'>
               <div className='bg-gray-400 w-60 h-10 animate-pulse rounded' />
               <div className='bg-gray-400 w-20 h-10 animate-pulse rounded' />
            </div>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-6 gap-4 mb-10'>
               {Array(6)
                  .fill(0)
                  .map((_, index) => (
                     <LoadingComics key={index} />
                  ))}
            </div>
            <div className='flex items-center justify-between mt-10 mb-5'>
               <div className='bg-gray-400 w-60 h-10 animate-pulse rounded' />
               <div className='bg-gray-400 w-20 h-10 animate-pulse rounded' />
            </div>
            <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-6 gap-4 mb-10'>
               {Array(6)
                  .fill(0)
                  .map((_, index) => (
                     <LoadingComics key={index} />
                  ))}
            </div>
         </>
      )
   return (
      <>
         {/* trending comics */}
         <ComicsList
            title='Popular Comics'
            linkMore='/popular'
            icon={
               <svg
                  data-v-c3ad5561
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon text-emerald-500'
                  width='36px'
                  height='36px'
                  viewBox='0 0 24 24'
               >
                  <path
                     fill='currentColor'
                     d='M17.66 11.2c-.23-.3-.51-.56-.77-.82c-.67-.6-1.43-1.03-2.07-1.66C13.33 7.26 13 4.85 13.95 3c-.95.23-1.78.75-2.49 1.32c-2.59 2.08-3.61 5.75-2.39 8.9c.04.1.08.2.08.33c0 .22-.15.42-.35.5c-.23.1-.47.04-.66-.12a.58.58 0 0 1-.14-.17c-1.13-1.43-1.31-3.48-.55-5.12C5.78 10 4.87 12.3 5 14.47c.06.5.12 1 .29 1.5c.14.6.41 1.2.71 1.73c1.08 1.73 2.95 2.97 4.96 3.22c2.14.27 4.43-.12 6.07-1.6c1.83-1.66 2.47-4.32 1.53-6.6l-.13-.26c-.21-.46-.77-1.26-.77-1.26m-3.16 6.3c-.28.24-.74.5-1.1.6c-1.12.4-2.24-.16-2.9-.82c1.19-.28 1.9-1.16 2.11-2.05c.17-.8-.15-1.46-.28-2.23c-.12-.74-.1-1.37.17-2.06c.19.38.39.76.63 1.06c.77 1 1.98 1.44 2.24 2.8c.04.14.06.28.06.43c.03.82-.33 1.72-.93 2.27Z'
                  />
               </svg>
            }
            comics={trendingComics}
         />

         {/* completed comics */}
         <ComicsList
            title='Completed Comics'
            linkMore='/completed'
            icon={
               <svg
                  data-v-c3ad5561
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon text-emerald-500'
                  width='36px'
                  height='36px'
                  viewBox='0 0 256 256'
               >
                  <path
                     fill='currentColor'
                     d='M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18Zm-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32Z'
                  />
               </svg>
            }
            comics={completedComics}
         />

         {/* Recently Update */}
         <ComicsList
            title='Recently Update'
            linkMore='/recent'
            icon={
               <svg
                  data-v-c3ad5561
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon text-emerald-500'
                  width='36px'
                  height='36px'
                  viewBox='0 0 24 24'
               >
                  <path
                     fill='currentColor'
                     d='M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z'
                  />
               </svg>
            }
            comics={recentUpdateComics}
         />

         {/* Boy Comics */}
         <ComicsList
            title='Boy Comics'
            linkMore='/boy'
            icon={
               <svg
                  data-v-c3ad5561
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon text-emerald-500'
                  width='36px'
                  height='36px'
                  viewBox='0 0 24 24'
               >
                  <path
                     fill='none'
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth={2}
                     d='M5 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0m14-9l-5.4 5.4M19 5h-5m5 0v5'
                  />
               </svg>
            }
            comics={boyComics}
         />

         {/* Girl Comics */}
         <ComicsList
            title='Girl Comics'
            linkMore='/girl'
            icon={
               <svg
                  data-v-c3ad5561
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon text-emerald-500'
                  width='36px'
                  height='36px'
                  viewBox='0 0 24 24'
               >
                  <path
                     fill='none'
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth={2}
                     d='M7 9a5 5 0 1 0 10 0A5 5 0 1 0 7 9m5 5v7m-3-3h6'
                  />
               </svg>
            }
            comics={girlComics}
         />
      </>
   )
}
