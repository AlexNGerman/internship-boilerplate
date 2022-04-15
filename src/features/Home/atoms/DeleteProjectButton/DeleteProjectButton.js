import React from 'react';
import {useNavigate} from 'react-router-dom'
import {Button} from '@mui/material';
import {useMutation} from 'urql';
import {Delete} from '@mui/icons-material';
import {DELETE_PROJECT} from 'mutations/Project/deleteProject';
import {ROUTES} from 'constants/routes';

const DeleteProjectButton = ({id}) => {
  const navigate = useNavigate();
  const [{fetching}, deleteProject] = useMutation(DELETE_PROJECT);

  const onDeleteProject = async (id) => {
    const response = await deleteProject({id: id});
    if(!response.error) navigate(ROUTES.HOME);
  }
  return (
    <Button variant='contained' color='error' onClick={() => onDeleteProject(id)} disabled={fetching} data-testid='delete-project'>
      <Delete fontSize='inherit' /> Delete Project
    </Button>
  )
};

export default DeleteProjectButton;
