import cities from './data.json'
import { WeatherEntity, LinkAccumulator, DaysParameters, CityPatameters } from '../../types'
import { Day } from './models/day'

export const resolvers = {
  Query: {
    cities: () => {
      return Object.values(cities.reduce((accumulator, place: WeatherEntity) => {
        accumulator[place.place_name] = { id: place.station_id, name: place.place_name }
        return accumulator
      }, {} as LinkAccumulator))
    },
    cityName: (_: any, args: CityPatameters) => {
      const stationId = parseInt(args.stationId)
      return cities.find(city => city.station_id === stationId)?.place_name
    },
    days: (_: any, args: DaysParameters) => {
      const stationId = parseInt(args.stationId)
      let startDate: number | undefined
      let endDate: number | undefined
      if (args.startDate) {
        startDate = (new Date(args.startDate)).getTime()
      }
      if (args.endDate) {
        endDate = (new Date(args.endDate)).getTime()
      }
      return cities
        .filter(city => {
          const cityDate = (new Date(city.datetime)).getTime()
          if (startDate && !endDate) {
            return city.station_id === stationId && cityDate >= startDate
          } else if (!startDate && endDate) {
            return city.station_id === stationId && cityDate <= endDate
          } else if (startDate && endDate) {
            return city.station_id === stationId && cityDate >= startDate && cityDate <= endDate
          }
          return city.station_id === stationId
        })
        .map(day => {
          const dayModel = new Day(day)
          return dayModel.getResolvers()
        })
    }
  }
}