import React from 'react';
import { useMutation } from "urql";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox } from '@mui/material';
import { UPDATE_TASK } from 'mutations/UpdateTask/updateTask';
import DeleteTaskButton from 'features/Home/atoms/DeleteTaskButton';

const Task = ({ task }) => {
  const { content, id, done } = task;
  const labelId = `checkbox-list-label-${task}`;
  const [{fetching}, updateTask] = useMutation(UPDATE_TASK);

  const handleToggle = () => {
    updateTask({id: id, done: !done })
  };

  return (
    <ListItem
      key={task}
      secondaryAction={ <DeleteTaskButton id={ id }/>}
      disablePadding
      disabled={ fetching }
    ><ListItemButton onClick={ handleToggle } dense>
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
  );
}

export default Task;
