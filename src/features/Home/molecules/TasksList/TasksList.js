import React from 'react';
import {Checkbox, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {useMutation} from "urql";
import {makeStyles} from '@mui/styles';
import {UPDATE_TASK} from 'mutations/Task/updateTask';
import DeleteTaskButton from 'features/Home/atoms/DeleteTaskButton';

const useStyles = makeStyles({
  underlined: {
    textDecoration: 'line-through',
  }
});


const TasksList = ({tasks}) => {
  const classes = useStyles();
  const [{fetching}, updateTask] = useMutation(UPDATE_TASK);

  const handleToggle = (id, done) => {
    updateTask({id: id, done: !done})
  };

  return (
    <List sx={{width: '100%', m: 0, px: 2, bgcolor: 'background.paper'}}>
      {tasks.map(({content, id, done}) =>
        <ListItem
          key={id}
          secondaryAction={<DeleteTaskButton id={id} />}
          disablePadding
          disabled={fetching}
        >
          <ListItemButton onClick={() => handleToggle(id, done)} key={id} dense>
            <ListItemIcon>
              <Checkbox
                edge='start'
                checked={done}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': `checkbox-list-label-${id}`}}
              />
            </ListItemIcon>
            <ListItemText id={`checkbox-list-label-${id}`} primary={content} className={done ? classes.underlined : ''} />
          </ListItemButton>
        </ListItem>
      )}
    </List>
  );
}

export default TasksList;
