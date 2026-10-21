import { type ImmutableObject, type UseDataSource } from 'jimu-core'

/** Un type de signalement = un bouton dans le widget + une couche liée */
export interface SignalType {
  id: string
  label: string
  /** PNG (data URL) affiché dans le triangle */
  iconUrl?: string
  color?: string
  useDataSource?: UseDataSource
}

export interface Config {
  types: SignalType[]
}

export type IMConfig = ImmutableObject<Config>
