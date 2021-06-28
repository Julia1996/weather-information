import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  type CityLink {
    id: ID
    name: String
  }
  
  type WeatherEntity {
    station_id: ID
    place_name: String
    latitude: Float
    longitude: Float
    datetime: String
    temperature_max: String
    temperature_min: String
    precipitation_probability: String
    precipitation_mm: String
  }
  
  type Query {
    cities: [CityLink]
    cityName(id: ID): String
    days(city: ID, startDate: String, endDate: String): [WeatherEntity]
  }
`;

export default typeDefs;