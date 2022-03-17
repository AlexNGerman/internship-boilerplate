import {gql} from 'urql';

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!){
    deleteProject(id: $id) {
      id
    }
  }
`;
