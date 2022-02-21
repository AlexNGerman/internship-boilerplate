import React from 'react';
import { IconButton } from '@mui/material';
import { useMutation } from 'urql';
import { Delete } from '@mui/icons-material';
import { DELETE_TASK } from 'mutations/DeleteTask/deleteTask';

const DeleteTaskButton = ({ id }) => {
  const [{fetching}, deleteTask] = useMutation(DELETE_TASK);

  const onDeleteTask = (id) => {
    deleteTask({ id: id });
  }

  return (
    <IconButton edge='end' aria-label='delete' color='error' onClick={() => onDeleteTask(id)} disabled={ fetching }>
      <Delete fontSize='inherit' />
    </IconButton>
  )
};

export default DeleteTaskButton;
