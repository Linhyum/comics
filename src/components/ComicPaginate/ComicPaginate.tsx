import { Comic } from '@/types/comics.type'
import React, { useState } from 'react'
import LoadingComics from '../Loading/LoadingComics'
import ComicItem from '../ComicItem/ComicItem'
import ReactPaginate from 'react-paginate'
import Tippy from '@tippyjs/react'
import 'tippy.js/animations/perspective-extreme.css'
interface Props {
   comics: Comic[]
   handlePageClick: (e: { selected: number }) => void
   totalPages: number
   currentPage: number
   setCurrentPage: React.Dispatch<React.SetStateAction<number>>
}
export default function ComicPaginate({ comics, handlePageClick, totalPages, currentPage, setCurrentPage }: Props) {
   const [value, setValue] = useState<number>(1)
   const [openPaginate, setOpenPaginate] = useState<boolean>(false)
   //di chuyển đến trang đã nhập
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value)
      if (newValue >= 1 && newValue <= totalPages) {
         setValue(newValue)
      }
   }
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
         <div className='mt-10 flex items-center justify-center gap-x-1'>
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
            <Tippy
               animation={'perspective-extreme'}
               visible={openPaginate}
               onClickOutside={() => setOpenPaginate(false)}
               content={
                  <form
                     onSubmit={(e) => {
                        e.preventDefault()
                        setCurrentPage(value)
                        setOpenPaginate(false)
                     }}
                     className='bg-blue-500 text-white shadow rounded p-2 flex items-center gap-x-2'
                  >
                     <input
                        type='number'
                        value={value}
                        min={1}
                        max={totalPages}
                        onChange={handleChange}
                        className='outline-none p-1 bg-transparent border border-white'
                     />
                     <button className='border border-white text-white p-1' type='submit'>
                        Go
                     </button>
                  </form>
               }
               interactive={true}
               arrow={false}
               offset={[0, 6]}
               placement={'top'}
            >
               <button onClick={() => setOpenPaginate((prev) => !prev)}>
                  <svg
                     stroke='currentColor'
                     fill='currentColor'
                     strokeWidth={0}
                     viewBox='0 0 24 24'
                     height='22px'
                     width='22px'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path fill='none' d='M0 0h24v24H0z' />
                     <path d='M3 5v6h5L7 7l4 1V3H5c-1.1 0-2 .9-2 2zm5 8H3v6c0 1.1.9 2 2 2h6v-5l-4 1 1-4zm9 4l-4-1v5h6c1.1 0 2-.9 2-2v-6h-5l1 4zm2-14h-6v5l4-1-1 4h5V5c0-1.1-.9-2-2-2z' />
                  </svg>
               </button>
            </Tippy>
         </div>
      </>
   )
}
