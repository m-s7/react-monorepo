import { gql } from 'graphql-request'

gql`
    query fetchCars {
      cars {
        id
        brand
        model
        similar {
            id
        }
      }
    }   
`
