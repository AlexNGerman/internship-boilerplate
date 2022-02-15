import React from 'react';
import { Box, Grid, Divider, Typography } from '@mui/material';

import TasksList from 'features/Home/organisms/TasksList';
import TaskModal from 'features/Home/organisms/TaskModal';

const Project = ({ project }) => {
  const { id, title, tasks } = project;
  return (
    <Box sx={{ width: '100%', mb: 5, py: 1, maxWidth: 480, bgcolor: 'background.paper', boxShadow: 1 }}>
      <Box sx={{ my: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography gutterBottom variant="h6" component="div">
              {title} - ({id})
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Divider variant="middle" />
      <Box sx={{ mb: 2 }}>
        {(tasks?.length)
          ?
            <TasksList tasks={tasks}/>
          :
            <p>You don't have any tasks yet</p>
        }
        <TaskModal projectId={id}/>
      </Box>
    </Box>
  );
}

export default Project;
