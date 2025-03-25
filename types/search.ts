export type TGlobalSearch = {
  universities: Array<{
    id: number
    name: string
    type: string
    address: string | null
  }>
  living_conditions: Array<{
    id: number
    title: string
    short_description: string
    banner: string
  }>
  news: Array<{
    id: number
    title: string
    short_description: string
    university: number
  }>
  explore_places: Array<{
    id: number
    title: string
    region: number
  }>
  olympiads: Array<{
    id: number
    title: string
    short_description: string
    university: number
    more_info_link: string
  }>
  school_programs: Array<{
    id: number
    title: string
    direction: string
    region: number
  }>
  university_directions: Array<{
    id: number
    name: string
  }>
  programs: Array<{
    id: number
    title: string
    university: number
    direction: number
  }>
}

export type ResultItem = {
  id: number
  title: string
  categoryName: string
  slug: string
}

export type ResultArray = ResultItem[]
