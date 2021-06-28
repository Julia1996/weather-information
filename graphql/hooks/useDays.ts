import { useQuery } from '@apollo/client'
import { GET_DAYS } from '../queries/getDays'

export const useDays = (city: number, startDate?: Date | null, endDate?: Date | null) =>
  useQuery(GET_DAYS, {
    variables: {
      city,
      startDate: startDate?.toISOString(),
      endDate: endDate?.toISOString(),
    }
  })