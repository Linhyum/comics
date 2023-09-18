'use client'
import { getComicChapter } from '@/api/home.api'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/perspective-extreme.css'
import React, { useEffect, useState } from 'react'

export default function ReadComic({ params }: { params: { id: number } }) {
   const [showToolbar, setShowToolbar] = useState<boolean>(true)
   const [currentPage, setCurrentPage] = useState<number>(1)
   const [inputRangeVal, setInputRangeVal] = useState<number>(1)
   const [openAllChapters, setOpenAllChapters] = useState<boolean>(false)
   const pathname = usePathname()
   const router = useRouter()
   const title = pathname.split('/')[2]
   const { data } = useQuery({
      queryKey: ['comicChapter', params.id],
      queryFn: () => getComicChapter(title, params.id)
   })
   const comicChapter = data?.data

   const getElementsPos = () => {
      const elements = document.querySelectorAll('.image-source')
      const foundEle = Array.from(elements).find((el) => {
         const rect = el.getBoundingClientRect()
         return rect.top > 0
      })
      if (foundEle) {
         setCurrentPage(Number(foundEle.getAttribute('id')) - 1)
         setInputRangeVal(Number(foundEle.getAttribute('id')) - 1)
         return
      }
      setCurrentPage(elements.length)
      setInputRangeVal(elements.length)
   }

   useEffect(() => {
      document.querySelector('.result')?.addEventListener('scroll', getElementsPos)
      return () => {
         document.querySelector('.result')?.removeEventListener('scroll', getElementsPos)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   //next prev chương
   const handleChangeChapter = (type: 'prev' | 'next') => {
      if (comicChapter) {
         const chapters = [...comicChapter?.chapters].reverse()
         const chapterIdx = chapters.findIndex((chapter: any) => chapter.id === Number(params.id))
         const nextChapterIdx = chapterIdx + (type === 'next' ? 1 : -1)
         router.push(`/comic/${title}/${chapters[nextChapterIdx].id}`)
      }
   }

   useEffect(() => {
      if (comicChapter) {
         document.title = `${comicChapter.comic_name} - ${comicChapter.chapter_name} | NetTruyen`
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [comicChapter?.chapter_name])

   return (
      <div
         onClick={() => setShowToolbar((prev) => !prev)}
         className='bg-zinc-900 fixed inset-0 min-h-screen result overflow-y-auto z-[60]'
      >
         {!comicChapter ? (
            <>
               <div className='absolute z-10 top-0 inset-x-0 h-12 bg-gray-600 animate-pulse' />
               <div className='max-w-2xl mx-auto bg-gray-400 animate-pulse h-full' />
               <div className='absolute bottom-0 inset-x-0 bg-gray-600 animate-pulse h-14' />
            </>
         ) : (
            <>
               <header
                  onClick={(e) => e.stopPropagation()}
                  className={`select-none fixed z-[70] top-0 inset-x-0 flex sm:block items-center justify-between bg-[rgba(0,0,0,0.9)] py-3 px-2 text-gray-300 font-semibold transition-all duration-300 ${
                     showToolbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                  }`}
               >
                  <span className='sm:hidden'>{`${currentPage} / ${comicChapter.images.length}`}</span>
                  <div className='flex items-center justify-center gap-x-2 text-base'>
                     <Link href={`/comic/${title}`}>{comicChapter.comic_name}</Link>
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='w-4 h-4'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                     <span>{comicChapter.chapter_name}</span>
                  </div>
               </header>
               <ul className='flex flex-col max-w-2xl mx-auto select-none'>
                  {comicChapter.images.map((item) => (
                     <li key={item.page}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                           id={item.page.toString()}
                           src={item.src}
                           alt=''
                           loading='lazy'
                           className='image-source w-full h-full object-contain'
                        />
                     </li>
                  ))}
               </ul>
               <footer
                  onClick={(e) => e.stopPropagation()}
                  className={`select-none fixed z-[70] bottom-0 inset-x-0 flex items-center gap-2 flex-wrap sm:gap-x-5 justify-center bg-[rgba(0,0,0,0.9)] py-3 px-2 text-gray-300 font-semibold transition-all duration-300 ${
                     showToolbar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  }`}
               >
                  <span className='hidden sm:block'>{`${currentPage} / ${comicChapter.images.length}`}</span>
                  <button
                     onClick={() => handleChangeChapter('prev')}
                     disabled={params.id == comicChapter?.chapters[comicChapter?.chapters.length - 1].id}
                     className={`px-3 py-1 rounded-full bg-emerald-200 text-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white`}
                  >
                     Prev Chapter
                  </button>
                  <button
                     disabled={params.id == comicChapter?.chapters[0].id}
                     onClick={() => handleChangeChapter('next')}
                     className={`px-3 py-1 rounded-full bg-emerald-200 text-primary disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-white`}
                  >
                     Next Chapter
                  </button>
                  <Tippy
                     animation={'perspective-extreme'}
                     onClickOutside={() => setOpenAllChapters(false)}
                     visible={openAllChapters}
                     content={
                        <div className='bg-[#333] text-white p-3 rounded-lg'>
                           <h2 className='text-lg font-bold mb-2'>
                              All Chapters ({comicChapter.chapters.length} Chapters)
                           </h2>
                           <ul className=' max-h-80 overflow-y-auto'>
                              {comicChapter?.chapters.map((item) => (
                                 <li key={item.id}>
                                    <button
                                       className='p-1.5 hover:bg-emerald-200 hover:text-primary rounded w-full text-left'
                                       onClick={() => router.push(`/comic/${title}/${item.id}`)}
                                    >
                                       {item.name}
                                    </button>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     }
                     interactive={true}
                     arrow={false}
                     offset={[0, 10]}
                     placement={'top'}
                  >
                     <button
                        onClick={(e) => {
                           e.stopPropagation()
                           setOpenAllChapters((prev) => !prev)
                        }}
                        className='px-3 py-1 rounded-full bg-fuchsia-200 text-fuchsia-500'
                     >
                        All Chapters
                     </button>
                  </Tippy>
               </footer>
            </>
         )}
      </div>
   )
}
