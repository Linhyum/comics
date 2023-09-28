'use client'
import useLocalStorage from '@/hooks/useLocalStorage'
import { Comic } from '@/types/comics.type'
import React, { createContext } from 'react'
interface AppContextInterface {
   history: Comic[]
   setHistory: (value: Comic[] | ((val: Comic[]) => Comic[])) => void
}

const initialAppContext: AppContextInterface = {
   history: [],
   setHistory: () => null
}

export const AppContext = createContext<AppContextInterface>(initialAppContext)

//khi không truyền value vào AppProvider thì cái initialAppContext của AppContext sẽ được sử dụng
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
   const [history, setHistory] = useLocalStorage<Comic[]>('history', initialAppContext.history)

   return <AppContext.Provider value={{ history, setHistory }}>{children}</AppContext.Provider>
}
