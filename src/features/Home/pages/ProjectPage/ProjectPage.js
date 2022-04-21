import React from 'react';
import {useQuery} from 'urql';
import {useParams} from 'react-router-dom'
import {CircularProgress, Grid, Typography} from '@mui/material';
import MainTemplate from 'components/templates/MainTemplate';
import {GET_PROJECT} from 'queries/Project/getProject';
import ProjectHeader from 'features/Home/organisms/ProjectHeader';
import Project from 'features/Home/organisms/Project';
import DeleteProjectButton from 'features/Home/atoms/DeleteProjectButton';
import {format, parseISO} from "date-fns";

const ProjectPage = () => {
  const {id} = useParams();
  const [{data, fetching}] = useQuery({
    query: GET_PROJECT,
    variables: {id},
  });
  const project = !fetching && data?.project;
  const details = project && <>
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
  </>;

  return (
    <MainTemplate header={project && <ProjectHeader project={project} />}>
      {fetching && <CircularProgress color='primary' />}
      {project ?
                <>
                  <Project key={project.id} project={project} details={details} />
                  <Grid container alignItems='center'>
                    <Grid item xs={12}>
                      <DeleteProjectButton id={project.id} />
                    </Grid>
                  </Grid>
                </>
               :
                <p>Project not found</p>}
    </MainTemplate>
  );
}

export default ProjectPage;
