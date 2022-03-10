import {gql} from 'urql';

export const UPDATE_TASK = gql`
  mutation UpdateTask($id: ID!, $done: Boolean!){
    updateTask(
      id: $id, 
      done: $done
    ) {
      done
    }
  }
`;
