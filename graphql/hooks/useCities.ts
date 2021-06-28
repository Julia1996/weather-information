import { useQuery } from '@apollo/client'
import { GET_CITIES } from '../queries/getCities'

export const useCities = () => useQuery(GET_CITIES);