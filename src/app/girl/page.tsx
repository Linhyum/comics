'use client'
import { getGirlComics } from '@/api/home.api'
import MoreComics from '@/modules/MoreComics/MoreComics'
import React from 'react'

export default function page() {
   return (
      <MoreComics
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
         title='Girl Comics'
         key='girl'
         getApi={getGirlComics}
      />
   )
}
