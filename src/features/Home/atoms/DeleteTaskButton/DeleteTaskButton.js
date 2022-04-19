import React from 'react';
import {IconButton} from '@mui/material';
import {useMutation} from 'urql';
import {Delete} from '@mui/icons-material';
import {DELETE_TASK} from 'mutations/Task/deleteTask';

const DeleteTaskButton = ({id}) => {
  const [{fetching}, deleteTask] = useMutation(DELETE_TASK);

  const onDeleteTask = (id) => {
    deleteTask({id});
  }

  return (
    <IconButton edge='end' aria-label='delete' data-testid='delete-task' color='error' onClick={() => onDeleteTask(id)} disabled={fetching}>
      <Delete fontSize='inherit' />
    </IconButton>
  )
};

export default DeleteTaskButton;
