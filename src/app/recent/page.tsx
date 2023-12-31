'use client'
import { getRecent } from '@/api/home.api'
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
                  fill='currentColor'
                  d='M12 20a8 8 0 0 0 8-8a8 8 0 0 0-8-8a8 8 0 0 0-8 8a8 8 0 0 0 8 8m0-18a10 10 0 0 1 10 10a10 10 0 0 1-10 10C6.47 22 2 17.5 2 12A10 10 0 0 1 12 2m.5 5v5.25l4.5 2.67l-.75 1.23L11 13V7h1.5Z'
               />
            </svg>
         }
         title='Recently Update'
         key='recent'
         getApi={getRecent}
      />
   )
}
