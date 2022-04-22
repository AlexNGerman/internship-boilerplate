import React from 'react';
import {Grid, Typography} from '@mui/material';
import {format,parseISO} from 'date-fns';

const ProjectDescription = ({project}) => (
  <>
    <Grid item xs={12}>
      <Typography gutterBottom variant='p' component='p'>
        Deadline: {format(parseISO(project.deadline), 'MM/dd/yyyy HH:mm a')}
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography gutterBottom variant='p' component='p'>
        Description: {project.description}
      </Typography>
    </Grid>
  </>
)

export default ProjectDescription;
