import {gql} from 'urql';

export const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      createdAt
      deadline
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
