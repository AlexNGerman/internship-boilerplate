import {gql} from 'urql';

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: ID!, $title: String!, $description: String!){
    updateProject(
      id: $id, 
      title: $title
      description: $description,
      public: true
    ) {
      id
    }
  }
`;
