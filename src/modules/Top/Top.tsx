'use client'
import { getTopComics } from '@/api/home.api'
import ComicPaginate from '@/components/ComicPaginate/ComicPaginate'
import { Comic } from '@/types/comics.type'
import { useQuery } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
const nav1: {
   title: string
   icon: React.JSX.Element
   tab: string
}[] = [
   {
      title: 'Top Comics',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 21 24'
         >
            <path
               fill='currentColor'
               d='m6.752 3.311l2.695 1.545h2.394l2.695-1.56c.44-.257-.485-1.848-.922-1.591L11.57 2.887v-2.5c0-.515-1.848-.515-1.848 0v2.5L7.677 1.705c-.455-.258-1.379 1.348-.924 1.606zm13.364 7.71c.44.257 1.364-1.348.922-1.591l-2.045-1.182l2.167-1.257c.44-.257-.485-1.848-.922-1.591l-2.167 1.257V4.279c0-.515-1.848-.515-1.848 0V7.4l1.197 2.076zM3.206 4.28v2.364L1.037 5.386C.597 5.129-.327 6.734.115 6.977l2.167 1.257L.237 9.416c-.44.257.485 1.848.922 1.591l2.695-1.56l1.197-2.076v-3.09c.004-.516-1.845-.516-1.845 0zm-2.045 8.697c-.44-.257-1.364 1.348-.922 1.591l2.045 1.182l-2.169 1.258c-.44.257.485 1.848.922 1.591l2.167-1.257v2.364c0 .515 1.848.515 1.848 0v-3.121l-1.197-2.076zm20.001 4.031l-2.167-1.257l2.045-1.182c.44-.257-.485-1.848-.922-1.591l-2.695 1.56l-1.201 2.075v3.121c0 .515 1.848.515 1.848 0v-2.362l2.167 1.257c.44.227 1.364-1.364.925-1.621zm-6.622 3.696l-2.695-1.56H9.447l-2.695 1.56c-.44.257.485 1.848.922 1.591l2.045-1.182v2.499c0 .515 1.848.515 1.848 0v-2.5l2.045 1.182c.444.26 1.366-1.347.927-1.589zm.757-12.454l-2.015 1.167l-1.727-.969V6.084h-1.85v2.348l-1.727.969l-2.015-1.167l-.922 1.591l2.015 1.167v1.986l-2.032 1.166l.922 1.591l2.015-1.167l1.727.969v2.348h1.848v-2.348l1.727-.969l2.015 1.167l.922-1.591l-2.015-1.167v-1.986l2.031-1.167zm-4.652 6.182l-2.106-1.197v-2.47l2.106-1.197l2.11 1.197v2.469z'
            />
         </svg>
      ),
      tab: 'all'
   },
   {
      title: 'Top Daily',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
         >
            <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
               <path d='M19.875 6.27A2.225 2.225 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27A2.225 2.225 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z' />
               <path d='M10 8v8h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2z' />
            </g>
         </svg>
      ),
      tab: 'daily'
   },
   {
      title: 'Top Weekly',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
         >
            <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
               <path d='M19.875 6.27A2.225 2.225 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27A2.225 2.225 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z' />
               <path d='m9 8l1 8l2-5l2 5l1-8' />
            </g>
         </svg>
      ),
      tab: 'weekly'
   },
   {
      title: 'Top Monthly',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 24 24'
         >
            <g fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}>
               <path d='M19.875 6.27A2.225 2.225 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27A2.225 2.225 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z' />
               <path d='M9 16V8l3 5l3-5v8' />
            </g>
         </svg>
      ),
      tab: 'monthly'
   },
   {
      title: 'Top Chapter',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 20 20'
         >
            <path
               fill='currentColor'
               d='M12 5.5a.5.5 0 0 1-.41.492L11.5 6h-4a.5.5 0 0 1-.09-.992L7.5 5h4a.5.5 0 0 1 .5.5ZM12 9a.5.5 0 0 1-.41.492l-.09.008h-4a.5.5 0 0 1-.09-.992L7.5 8.5h4a.5.5 0 0 1 .5.5Zm0 3.5a.5.5 0 0 1-.41.492L11.5 13h-4a.5.5 0 0 1-.09-.992L7.5 12h4a.5.5 0 0 1 .5.5ZM6 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6ZM5 14V4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Zm11-6a1 1 0 0 1 1 1v5.06A3.94 3.94 0 0 1 13.06 18H7a1 1 0 0 1-1-1h7a3 3 0 0 0 3-3V8Z'
            />
         </svg>
      ),
      tab: 'chapter'
   },
   {
      title: 'Top Follow',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 256 256'
         >
            <path
               fill='currentColor'
               d='M117.25 157.92a60 60 0 1 0-66.5 0a95.83 95.83 0 0 0-47.22 37.71a8 8 0 1 0 13.4 8.74a80 80 0 0 1 134.14 0a8 8 0 0 0 13.4-8.74a95.83 95.83 0 0 0-47.22-37.71ZM40 108a44 44 0 1 1 44 44a44.05 44.05 0 0 1-44-44Zm210.14 98.7a8 8 0 0 1-11.07-2.33A79.83 79.83 0 0 0 172 168a8 8 0 0 1 0-16a44 44 0 1 0-16.34-84.87a8 8 0 1 1-5.94-14.85a60 60 0 0 1 55.53 105.64a95.83 95.83 0 0 1 47.22 37.71a8 8 0 0 1-2.33 11.07Z'
            />
         </svg>
      ),
      tab: 'follow'
   },
   {
      title: 'Top Comment',
      icon: (
         <svg
            data-v-c3ad5561
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            aria-hidden='true'
            role='img'
            className='icon'
            width='24px'
            height='24px'
            viewBox='0 0 20 20'
         >
            <path
               fill='currentColor'
               d='M10.48 13.842h4.92c.896 0 1.6-.713 1.6-1.566v-6.71C17 4.713 16.296 4 15.4 4H4.6C3.704 4 3 4.713 3 5.566v6.71c0 .853.704 1.566 1.6 1.566h1.6V17h.003l.002-.001l4.276-3.157ZM6.8 17.803a1.009 1.009 0 0 1-1.4-.199a.978.978 0 0 1-.199-.59v-2.172h-.6c-1.436 0-2.6-1.149-2.6-2.566v-6.71C2 4.149 3.164 3 4.6 3h10.8C16.836 3 18 4.149 18 5.566v6.71c0 1.418-1.164 2.566-2.6 2.566h-4.59l-4.011 2.961Z'
            />
         </svg>
      ),
      tab: 'comment'
   }
]

const nav2: {
   title: string
   filter: 'all' | 'completed' | 'ongoing'
}[] = [
   {
      title: 'All',
      filter: 'all'
   },
   {
      title: 'Completed',
      filter: 'completed'
   },
   {
      title: 'Ongoing',
      filter: 'ongoing'
   }
]
export default function Top() {
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [status, setStatus] = useState<'all' | 'completed' | 'ongoing'>('all')
   const searchParams = useSearchParams()
   const tab = searchParams.get('tab') as string
   const router = useRouter()
   const { data } = useQuery({
      queryKey: ['top', currentPage, status, tab],
      queryFn: () => getTopComics(tab === 'all' ? '' : tab, { page: currentPage, status })
   })

   const comics = data?.data.comics

   //pagination
   const totalPages: number = data?.data.total_pages as number
   const handlePageClick = (e: { selected: number }) => {
      if (totalPages) {
         setCurrentPage(e.selected + 1)
         document.body.scrollIntoView({ behavior: 'smooth', block: 'start' })
         router.push(`/top?tab=${tab}&filter=${status}&page=${e.selected + 1}`)
      }
   }

   return (
      <>
         <nav className='flex items-center gap-1.5 flex-wrap mt-10'>
            {nav1.map((item) => (
               <button
                  onClick={() => {
                     router.push(`/top?tab=${item.tab}`)
                     setStatus('all')
                     setCurrentPage(1)
                  }}
                  key={item.title}
                  className={`flex text-base font-medium items-center gap-x-1 px-3 py-2 rounded select-none ${
                     tab === item.tab && 'bg-primary text-white'
                  }`}
               >
                  {item.icon}
                  {item.title}
               </button>
            ))}
         </nav>
         <nav className='flex items-center flex-wrap gap-2.5 mb-5 mt-4 font-semibold text-base sm:gap-5'>
            {nav2.map((item) => (
               <button
                  onClick={() => {
                     setStatus(item.filter)
                     router.push(`/top?tab=${tab}&filter=${item.filter}`)
                     setCurrentPage(1)
                  }}
                  className={`px-3 py-1.5 rounded border ${
                     item.filter === status ? 'border-primary text-primary' : 'border-gray-300 dark:border-gray-700'
                  }`}
                  key={item.title}
               >
                  {item.title}
               </button>
            ))}
         </nav>
         <ComicPaginate
            setCurrentPage={setCurrentPage}
            comics={comics as Comic[]}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            totalPages={totalPages}
         />
      </>
   )
}
