export interface CardListInterface {
  id: number
  name: string
  cards: CardProps[]
}

export interface ModuleInterfaces {
  index: number
  module: CardListInterface
  refresh: () => void
}

export interface CardProps {
  id?: number
  title: string
  image: string
  description: string
  url: string
  label?: number
  environmentId?: number
  environmentName?: string
}

export interface ModuleProps {
  id?: number
  name: string
}
