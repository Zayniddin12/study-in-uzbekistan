export type TMenu =
  | 'why_uzbekistan'
  | 'programs_universities'
  | 'entry_procedure'

export type TMenuCategory = {
  id: number
  title: string
  slug: string
}

export type TMenuArticle = {
  id: number
  title: string
  short_description: string
  banner: string
}

export interface IMenu {
  id: number
  name: string
  order: number
}
