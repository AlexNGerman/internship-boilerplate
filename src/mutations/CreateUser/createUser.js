import { gql } from 'urql';

export const CREATE_USER_MUTATION = gql`
  mutation ($email: String! $password: String! $firstName: String! $lastName: String!){
    createUser{
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    } {
      id
      email
      firstName
      lastName
    }
  }
`