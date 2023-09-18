'use client'
import { getBoyComics } from '@/api/home.api'
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
                  d='M5 14a5 5 0 1 0 10 0a5 5 0 1 0-10 0m14-9l-5.4 5.4M19 5h-5m5 0v5'
               />
            </svg>
         }
         title='Boy Comics'
         key='boy'
         getApi={getBoyComics}
      />
   )
}
