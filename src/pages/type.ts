export interface CardListInterface {
  id: number
  name: string
  cards: CardProps[]
}

export interface ModuleInterfaces {
  index: number
  module: CardListInterface
}

export interface CardProps {
  id?: number
  title: string
  image: string
  description: string
  url: string
  label?: boolean
  environmentId?: number
}

export interface ModuleProps {
  id?: number
  name: string
}
