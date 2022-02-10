import React from 'react';
import { useQuery } from 'urql';
import { Grid, Alert, AlertTitle, CircularProgress } from '@mui/material';
import MainTemplate from 'components/templates/MainTemplate';
import Project from 'features/Home/organisms/Project';
import ProjectModal from 'features/Home/organisms/ProjectModal';
import { GET_PROJECTS } from 'queries/GetProjects/getProjects';

const Home = () => {
  const [{ data, fetching, error }] = useQuery({
    query: GET_PROJECTS,
  });
  const projects = data?.projects;

  return (
    <MainTemplate>
      {error &&
        <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
          <Grid item xs={12}>
            <Alert severity="error" align='left'>
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
                      projects.map(project => {
                        return <Project key={project.createdAt} project={project} />;
                      })
                    :
                      <p>You don't have any projects yet</p>
      }
      <ProjectModal />
    </MainTemplate>
  );
}

export default Home;
