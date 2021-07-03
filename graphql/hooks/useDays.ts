import { useQuery } from '@apollo/client'
import { GET_DAYS } from '../queries/getDays'

export const useDays = (stationId: number, startDate?: Date | null, endDate?: Date | null) =>
  useQuery(GET_DAYS, {
    variables: {
      stationId,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    }
  })