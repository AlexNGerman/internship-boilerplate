import {gql} from 'urql';

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(
      email: $email,
      password: $password,
      firstName: $firstName,
      lastName: $lastName
    ) {
      id
    }
  }
`;
