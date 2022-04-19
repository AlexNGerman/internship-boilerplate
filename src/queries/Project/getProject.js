import {gql} from 'urql';

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      createdAt
      deadline
      description
      id
      public
      tasks {
        content
        createdAt
        done
        id
        projectId
      }
      title
    }
  }
`;
