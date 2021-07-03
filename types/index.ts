export type WeatherEntity = {
  station_id: number
  place_name: string
  latitude: number
  longitude: number
  datetime: string
  temperature_max: string
  temperature_min: string
  precipitation_probability: string
  precipitation_mm: string
}

export type CityLink = {
  id: number
  name: string
}

export type LinkAccumulator = {
  [key: string]: CityLink
}

export type DaysParameters = {
  stationId: string
  startDate?: string | null
  endDate?: string | null
}

export type CityPatameters = {
  stationId: string
}

export type DayResolvers = {
  datetime: () => string
  temperature_max: () => string
  temperature_min: () => string
  precipitation_probability: () => string
  precipitation_mm: () => string
}

export interface DayInterface {
  day: WeatherEntity
  getResolvers(): DayResolvers
}