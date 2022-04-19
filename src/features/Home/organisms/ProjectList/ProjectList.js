import React, { Fragment } from 'react';
import { useQuery } from 'urql';
import { Grid, Alert, AlertTitle, CircularProgress } from '@mui/material';
import Project from 'features/Home/organisms/Project';
import { GET_PROJECTS } from 'queries/Project/getProjects';

const ProjectList = () => {
  const [{data, fetching, error}] = useQuery({
    query: GET_PROJECTS,
  });
  const projects = data?.projects;

  return (
    <Fragment>
      {error &&
        <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
          <Grid item xs={12}>
            <Alert severity='error' align='left'>
              <AlertTitle>Error</AlertTitle>
              {error.message}
            </Alert>
          </Grid>
        </Grid>
      }
      {fetching ? <CircularProgress color='primary' />
        :
        (projects?.length)
          ?
          projects.map(project => <Project key={project.id} project={project} />)
          :
          <p>You don't have any projects yet</p>
      }
    </Fragment>
  );
}

export default ProjectList;
