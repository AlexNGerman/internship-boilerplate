import React from 'react';
import {useMutation} from "urql";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DELETE_TASK } from 'mutations/DeleteTask/deleteTask';
import { UPDATE_TASK } from 'mutations/UpdateTask/updateTask';

const Task = ({ task }) => {
  const { content, id, done } = task;
  const labelId = `checkbox-list-label-${task}`;
  const [{fetching}, deleteTask] = useMutation(DELETE_TASK);
  const [{},updateTask] = useMutation(UPDATE_TASK);
  const onDeleteTask = (id) => {
    deleteTask({ id: id });

  }
  const handleToggle = (values) => () => {
    updateTask(values)
  };

  return (
    <div>
      <ListItem
        key={task}
        secondaryAction={
          <IconButton edge="end" aria-label="delete" onClick={() => onDeleteTask(id)}>
            <Delete fontSize="inherit" />
          </IconButton>
        }
        disablePadding
        disabled={fetching}
      >
        <ListItemButton onClick={ handleToggle({id: id, done: !done }) } dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={done}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={content} style={{textDecoration: done && 'line-through' }} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default Task;
