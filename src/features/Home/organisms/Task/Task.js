import React, { useState } from 'react';
import {useMutation} from "urql";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, IconButton} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { DELETE_TASK } from 'mutations/DeleteTask/deleteTask';

const Task = ({ task }) => {
  const { content, id } = task;
  const [checked, setChecked] = useState([0]);
  const labelId = `checkbox-list-label-${task}`;

  const [{fetching}, deleteTask] = useMutation(DELETE_TASK);

  const onDeleteTask = (id) => {
    deleteTask({ id: id });
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
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
        <ListItemButton onClick={handleToggle(task)} dense>
          <ListItemIcon>
            <Checkbox
              edge="start"
              checked={checked.indexOf(task) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText id={labelId} primary={content} />
        </ListItemButton>
      </ListItem>
    </div>
  );
}

export default Task;
