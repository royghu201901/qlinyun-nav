export interface CardListInterface {
  id: number
  name: string
  cards: CardProps[]
}

export interface ModuleInterfaces {
  index: number
  canDelete?: boolean
  handleChangeDeleteStatus: (flag: boolean) => void
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

export interface ContextInterface {
  prop: ContextProps
}

export interface ContextProps {
  loading: boolean
  canDelete: boolean
  handleChangeDeleteStatus: (flag: boolean) => void
  navigationList: CardListInterface[]
  getNavigationList: () => void
  searchList: CardProps[]
  moduleList: ModuleProps[]
}

export interface LogProps {
  beforeDate: string
  afterDate: string
}

export interface LogInterface {
  id: number
  message: string
  changeTime: string
  beforeMessage: string
  afterMessage: string
}

export interface SearchProps {
  keyword: string
}

export interface IdProps {
  environmentId: number
}
