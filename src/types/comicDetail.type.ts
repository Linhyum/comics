export interface ComicDetailType {
   title: string
   thumbnail: string
   description: string
   authors: string
   status: string
   genres: Genre[]
   total_views: number
   followers: number
   chapters: Chapter[]
   id: string
   other_names: string[]
}

export interface Genre {
   id: string
   name: string
}

export interface Chapter {
   id: number
   name: string
}
