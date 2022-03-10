import {gql} from 'urql';

export const CREATE_TASK = gql`
  mutation CreateTask($content: String!, $projectId: ID!){
    createTask(
      content: $content, 
      projectId: $projectId
    ) {
      content
    }
  }
`;
