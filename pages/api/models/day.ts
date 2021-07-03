import { WeatherEntity, DayInterface } from '../../../types'

export class Day implements DayInterface {
  day: WeatherEntity

  constructor(day: WeatherEntity) {
    this.day = day
  }

  getResolvers() {
    return {
      datetime: () => this.day.datetime,
      temperature_max: () => this.day.temperature_max,
      temperature_min: () => this.day.temperature_min,
      precipitation_probability: () => this.day.precipitation_probability,
      precipitation_mm: () => this.day.precipitation_mm
    }
  }
}
