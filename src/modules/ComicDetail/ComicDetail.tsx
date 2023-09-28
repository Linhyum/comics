'use client'
import { getComicDetail } from '@/api/home.api'
import { AppContext } from '@/context/app.context'
import { Chapter } from '@/types/comicDetail.type'
import { Comic } from '@/types/comics.type'
import { formatNumberWithDot } from '@/utils/utils'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect, useContext } from 'react'
const CHAPTER_PER_PAGE = 50
export default function ComicDetail({ params }: { params: { title: string } }) {
   const [showMore, setShowMore] = useState<boolean>(false)
   const { setHistory } = useContext(AppContext)
   const router = useRouter()
   const { data } = useQuery({
      queryKey: ['comicDetail', params.title],
      queryFn: () => getComicDetail(params.title)
   })
   const conmicDetail = data?.data

   const getChapter = (start: number, end: number) => {
      if (conmicDetail) {
         const chapters = [...(conmicDetail?.chapters as Chapter[])]
            .reverse()
            .slice(start < CHAPTER_PER_PAGE ? 0 : start - CHAPTER_PER_PAGE, end + CHAPTER_PER_PAGE) //slice để duyệt nhanh hơn
            .filter((chapter) => {
               const chap = chapter.name.match(/\d+(\.\d+)?/)?.[0] //lấy ra số chương
               if (!chap) return false
               if (parseFloat(chap) >= start && parseFloat(chap) <= end + 0.99) return true
               return false
            })
         return chapters
      }
   }

   const [chaptersSection, setChaptersSection] = useState<Chapter[]>([])
   const [currentChapterPage, setCurrentChapterPage] = useState<number>(0)
   useEffect(() => {
      setChaptersSection(getChapter(0, CHAPTER_PER_PAGE) as Chapter[])
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [conmicDetail?.id])

   const largestChapter: number = Number(conmicDetail?.chapters[0]?.name.match(/\d+(\.\d+)?/)?.[0]) //match(/\d+(\.\d+)?/):lấy ra số chương lớn nhất
   const totalChapterPage = !isNaN(Number(largestChapter)) ? Math.ceil(Number(largestChapter) / CHAPTER_PER_PAGE) : 0

   const onChangeChapterGroup = (idx: number) => {
      setCurrentChapterPage(idx)
      setChaptersSection(
         getChapter(idx === 0 ? 0 : idx * CHAPTER_PER_PAGE + 1, (idx + 1) * CHAPTER_PER_PAGE) as Chapter[]
      )
   }

   useEffect(() => {
      document.title = `${conmicDetail?.title} | NetTruyen`
   }, [conmicDetail])

   return (
      <div className='max-w-5xl mx-auto pt-12'>
         <div className='lg:grid grid-cols-12 gap-6 p-4 border-4 rounded-2xl border-primary '>
            {conmicDetail ? (
               <>
                  <div className='relative mx-auto w-56 lg:w-[unset] lg:mx-0 lg:col-span-3 aspect-[2/3] overflow-hidden rounded-lg border-2 border-primary'>
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img
                        src={conmicDetail.thumbnail}
                        alt={conmicDetail.title}
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <div className='w-full mt-10 lg:mt-0 lg:col-span-9'>
                     <h1 className='text-3xl font-bold'>{conmicDetail.title}</h1>
                     {conmicDetail.other_names.length > 0 && (
                        <div className='font-medium mt-1 flex items-center flex-wrap'>
                           {conmicDetail.other_names.map(
                              (item, index) => `${item}${index === conmicDetail.other_names.length - 1 ? '' : ' | '}`
                           )}
                        </div>
                     )}
                     <div className='flex items-center flex-wrap gap-2 mt-3'>
                        {conmicDetail.genres.map((item) => (
                           <Link
                              href={`/genres?type=${item.id}`}
                              className='font-bold border-2 border-primary rounded py-0.5 px-2 hover:bg-primary transition-all'
                              key={item.id}
                           >
                              {item.name}
                           </Link>
                        ))}
                     </div>
                     <div className='mt-1 text-base font-semibold'>
                        Creator: <span className='text-primary'>{conmicDetail.authors}</span>
                     </div>
                     <div className='flex mt-1 items-center gap-x-4 font-bold text-base'>
                        <div className='flex items-center gap-x-1'>
                           <svg
                              data-v-c3ad5561
                              data-v-8aa02ddf
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              role='img'
                              className='icon text-sky-500'
                              width='20px'
                              height='20px'
                              viewBox='0 0 32 32'
                           >
                              <circle cx={16} cy={16} r={4} fill='currentColor' />
                              <path
                                 fill='currentColor'
                                 d='M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68ZM16 22.5a6.5 6.5 0 1 1 6.5-6.5a6.51 6.51 0 0 1-6.5 6.5Z'
                              />
                           </svg>
                           {formatNumberWithDot(conmicDetail.total_views)}
                        </div>
                        <div className='flex items-center gap-x-1'>
                           <svg
                              data-v-c3ad5561
                              data-v-8aa02ddf
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              role='img'
                              className='icon text-rose-500'
                              width='20px'
                              height='20px'
                              viewBox='0 0 24 24'
                           >
                              <path
                                 fill='currentColor'
                                 d='m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53L12 21.35Z'
                              />
                           </svg>

                           {formatNumberWithDot(conmicDetail.followers)}
                        </div>
                     </div>
                     <p className='mt-2 text-base font-medium text-justify'>
                        <span>
                           {conmicDetail.description.length >= 480
                              ? showMore
                                 ? conmicDetail.description
                                 : `${conmicDetail.description.slice(0, 480)}...`
                              : conmicDetail.description}
                        </span>{' '}
                        {conmicDetail.description.length >= 480 && (
                           <button
                              onClick={() => setShowMore((prev) => !prev)}
                              className='text-base font-semibold text-primary hover:underline'
                           >
                              {showMore ? 'Show less' : 'Show more'}
                           </button>
                        )}
                     </p>
                     <div className='mt-4 flex items-center gap-3'>
                        <button
                           onClick={() => {
                              router.push(
                                 `/comic/${conmicDetail.id}/${
                                    conmicDetail.chapters[conmicDetail.chapters.length - 1].id
                                 }`
                              )
                              setHistory((prev: any) => {
                                 if (prev.length >= 20) {
                                    return prev.includes(conmicDetail as unknown as Comic)
                                       ? [
                                            conmicDetail,
                                            ...prev.filter((i: Comic) => i !== (conmicDetail as unknown as Comic))
                                         ]
                                       : [
                                            conmicDetail,
                                            ...prev.filter((_: any, index: number) => index !== prev.length - 1)
                                         ]
                                 } else {
                                    return prev.includes(conmicDetail as unknown as Comic)
                                       ? [
                                            conmicDetail,
                                            ...prev.filter((i: Comic) => i !== (conmicDetail as unknown as Comic))
                                         ]
                                       : [conmicDetail, ...prev]
                                 }
                              })
                           }}
                           className='py-2 text-lg font-bold px-6 rounded flex items-center gap-x-1 bg-primary border-2 hover:bg-opacity-90 border-primary'
                        >
                           <svg
                              data-v-c3ad5561
                              data-v-8aa02ddf
                              xmlns='http://www.w3.org/2000/svg'
                              xmlnsXlink='http://www.w3.org/1999/xlink'
                              aria-hidden='true'
                              role='img'
                              className='icon'
                              width='24px'
                              height='24px'
                              viewBox='0 0 32 32'
                           >
                              <path
                                 fill='currentColor'
                                 d='M19 10h7v2h-7zm0 5h7v2h-7zm0 5h7v2h-7zM6 10h7v2H6zm0 5h7v2H6zm0 5h7v2H6z'
                              />
                              <path
                                 fill='currentColor'
                                 d='M28 5H4a2.002 2.002 0 0 0-2 2v18a2.002 2.002 0 0 0 2 2h24a2.002 2.002 0 0 0 2-2V7a2.002 2.002 0 0 0-2-2ZM4 7h11v18H4Zm13 18V7h11v18Z'
                              />
                           </svg>
                           Read Now
                        </button>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <div className='lg:col-span-3 mx-auto w-56 lg:w-auto lg:mx-0 rounded-lg aspect-[2/3] bg-gray-400 animate-pulse' />
                  <div className='lg:col-span-9 w-full mt-10 h-96 lg:h--auto lg:mt-0 rounded-lg bg-gray-400 animate-pulse' />
               </>
            )}
         </div>
         <div className='mt-10'>
            <h2 className='flex items-center gap-x-2 text-primary font-bold text-xl'>
               <svg
                  data-v-c3ad5561
                  data-v-8aa02ddf
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                  aria-hidden='true'
                  role='img'
                  className='icon'
                  width='20px'
                  height='20px'
                  viewBox='0 0 32 32'
               >
                  <path
                     fill='none'
                     stroke='currentColor'
                     strokeLinecap='round'
                     strokeLinejoin='round'
                     strokeWidth={2}
                     d='M16 7S9 1 2 6v22c7-5 14 0 14 0s7-5 14 0V6c-7-5-14 1-14 1Zm0 0v21'
                  />
               </svg>
               Chapters
            </h2>
            <div className='border-b-2 border-b-gray-300 mt-1 w-full' />
            <ul className='flex items-center gap-3 my-5 flex-wrap font-semibold'>
               {Array(totalChapterPage)
                  .fill(0)
                  .map((_, index) => (
                     <button
                        onClick={() => onChangeChapterGroup(index)}
                        key={index}
                        className={`px-2 py-0.5 rounded-full ${
                           index === currentChapterPage ? 'bg-primary/25 text-primary' : 'bg-gray-100 dark:bg-gray-700'
                        }`}
                     >
                        {index + 1 < totalChapterPage
                           ? `${index === 0 ? 0 : index * CHAPTER_PER_PAGE + 1} - ${(index + 1) * CHAPTER_PER_PAGE}`
                           : `${totalChapterPage === 1 ? 0 : index * CHAPTER_PER_PAGE + 1} - ${largestChapter}`}
                     </button>
                  ))}
            </ul>

            <ul className='grid sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-base font-medium'>
               {chaptersSection &&
                  chaptersSection.length > 0 &&
                  chaptersSection.map((item, index) => (
                     <Link
                        href={`/comic/${conmicDetail?.id}/${item.id}`}
                        className='dark:border-gray-700 border-gray-300 text-left truncate rounded border py-2 px-3'
                        key={index}
                     >
                        {item.name}
                     </Link>
                  ))}
            </ul>
         </div>
      </div>
   )
}
