import React from 'react';
import { List } from '@mui/material';
import Task from 'features/Home/molecules/Task';

const TasksList = ({ tasks }) => (
  <List sx={{ width: '100%', m:0, px: 2, bgcolor: 'background.paper' }}>
    {(tasks?.length)
      ?
      tasks.map(task => {
        return <Task key={task.createdAt} task={task} />;
      })
      :
      <p>You don't have any tasks yet</p>
    }
  </List>
)

export default TasksList;
