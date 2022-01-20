import { gql } from 'urql';

export const SIGNIN_USER = gql`
  mutation ($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`;
