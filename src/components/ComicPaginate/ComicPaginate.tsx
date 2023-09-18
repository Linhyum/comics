import { Comic } from '@/types/comics.type'
import React, { useState } from 'react'
import LoadingComics from '../Loading/LoadingComics'
import ComicItem from '../ComicItem/ComicItem'
import ReactPaginate from 'react-paginate'

export default function ComicPaginate({
   comics,
   handlePageClick,
   totalPages,
   currentPage
}: {
   comics: Comic[]
   handlePageClick: (e: { selected: number }) => void
   totalPages: number
   currentPage: number
}) {
   return (
      <>
         <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 xl:grid-cols-6 gap-3 sm:gap-4'>
            {!comics &&
               Array(12)
                  .fill(0)
                  .map((_, index) => <LoadingComics key={index} />)}
            {comics?.map((item) => (
               <ComicItem key={item.id} item={item} />
            ))}
         </div>
         <div className='mt-10'>
            <ReactPaginate
               pageCount={totalPages} // Tổng số trang
               marginPagesDisplayed={1} // Số lượng trang được hiển thị trước và sau trang hiện tại
               pageRangeDisplayed={1} // Số lượng trang được hiển thị trong phân đoạn paginate
               breakLabel='...'
               nextLabel={
                  currentPage < totalPages && (
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='w-6 h-6'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                     </svg>
                  )
               }
               onPageChange={handlePageClick}
               forcePage={currentPage - 1} // Đặt trang hiện tại là trang active
               previousLabel={
                  currentPage > 1 && (
                     <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={2}
                        stroke='currentColor'
                        className='w-6 h-6'
                     >
                        <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                     </svg>
                  )
               }
               renderOnZeroPageCount={null}
               containerClassName={'flex items-center gap-x-5 justify-center text-xl font-bold'} // Class cho container của paginate
               activeClassName={'text-primary'} // Class cho trang hiện tại
            />
         </div>
      </>
   )
}
