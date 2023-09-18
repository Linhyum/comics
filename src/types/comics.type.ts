export interface ComicsType {
   comics: Comic[]
   total_pages: number
   current_page: number
}

export interface Comic {
   id: string
   title: string
   thumbnail: string
   updated_at: string
   is_trending: boolean
   genres: Genre[]
   short_description: string
   other_names: string[]
   status: string
   total_views: number
   followers: number
   last_chapter: LastChapter
}

export interface Genre {
   id: string
   name: string
}

export interface LastChapter {
   id: number
   name: string
}
