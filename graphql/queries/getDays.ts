import { gql } from '@apollo/client'

export const GET_DAYS = gql`
  query GetCities($stationId: ID, $startDate: String, $endDate: String) {
    cityName(stationId: $stationId)
    days(stationId: $stationId, startDate: $startDate, endDate: $endDate) {
      datetime
      temperature_max
      temperature_min
      precipitation_probability
      precipitation_mm
    }
  }
`;