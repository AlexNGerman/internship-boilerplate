import {gql} from 'urql';

export const CREATE_PROJECT = gql`
  mutation CreateProject($title: String!, $description: String!, $deadline: String!){
    createProject(
      title: $title, 
      description: $description, 
      deadline: $deadline,
      public: true
    ) {
      deadline
      description
      title
    }
  }
`;
