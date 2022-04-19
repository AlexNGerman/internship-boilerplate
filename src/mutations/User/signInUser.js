import {gql} from 'urql';

export const SIGNIN_USER = gql`
  mutation SignInUser ($email: String!, $password: String!) {
    signInUser(email: $email, password: $password) {
      token
    }
  }
`;
