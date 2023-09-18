export type RecommemdComicsType = Root2[]

export interface Root2 {
   id: string
   title: string
   thumbnail: string
   updated_at: string
   lastest_chapter: LastestChapter
}

export interface LastestChapter {
   id: number
   name: string
}
