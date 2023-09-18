export interface ComicChapterType {
   images: Image[]
   chapters: Chapter[]
   chapter_name: string
   comic_name: string
}

export interface Image {
   page: number
   src: string
}

export interface Chapter {
   id: number
   name: string
}
