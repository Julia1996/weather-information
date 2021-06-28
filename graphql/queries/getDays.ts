import { gql } from '@apollo/client'

export const GET_DAYS = gql`
  query GetCities($city: ID, $startDate: String, $endDate: String) {
    cityName(id: $city)
    days(city: $city, startDate: $startDate, endDate: $endDate) {
      station_id
      place_name
      datetime
      temperature_max
      temperature_min
      precipitation_probability
      precipitation_mm
    }
  }
`;