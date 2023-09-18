import { ComicChapterType } from '@/types/comicChapter.type'
import { ComicDetailType } from '@/types/comicDetail.type'
import { ComicsType } from '@/types/comics.type'
import { GenresType } from '@/types/genres.type'
import { RecommemdComicsType } from '@/types/recommed.type'
import { SearchSuggest } from '@/types/searchSuggest.type'
import http from '@/utils/http'

export const getTrending = (params: { page: number }) =>
   http.get<ComicsType>('/trending-comics', {
      params
   })

export const getRecommend = () => http.get<RecommemdComicsType>('/recommend-comics')

export const getCompleted = (params: { page: number }) =>
   http.get<ComicsType>('/completed-comics', {
      params
   })

export const getRecent = (params: { page: number }) =>
   http.get<ComicsType>('/recent-update-comics', {
      params
   })

export const getBoyComics = (params: { page: number }) =>
   http.get<ComicsType>('/boy-comics', {
      params
   })

export const getGirlComics = (params: { page: number }) =>
   http.get<ComicsType>('/girl-comics', {
      params
   })

export const getNewComics = (params: { page: number }) =>
   http.get<ComicsType>('/new-comics', {
      params
   })

export const getComicDetail = (comic_id: string) => http.get<ComicDetailType>(`/comics/${comic_id}`)

export const getComicChapter = (comic_id: string, chapter_id: number) =>
   http.get<ComicChapterType>(`/comics/${comic_id}/chapters/${chapter_id}`)

export const getGenres = () => http.get<GenresType>('/genres')

export const getComicsByGenre = (genre_id: string, params: { page: number }) =>
   http.get<ComicsType>(`/genres/${genre_id}`, { params })

export const getTopComics = (tab: string, params: { page: number; status: string }) =>
   http.get<ComicsType>(`/top/${tab}`, { params })

export const searchSuggest = (params: { q: string }) => http.get<SearchSuggest>(`/search-suggest`, { params })
export const search = (params: { q: string; page: number }) => http.get<ComicsType>(`/search`, { params })
