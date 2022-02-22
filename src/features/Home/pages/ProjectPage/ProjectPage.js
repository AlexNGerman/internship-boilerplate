import React from 'react';
import {useQuery} from 'urql';
import {useParams} from 'react-router-dom'
import {Grid, CircularProgress, Box, Typography, Divider} from '@mui/material';
import {parseISO, format} from 'date-fns';
import MainTemplate from 'components/templates/MainTemplate';
import {GET_PROJECT} from 'queries/GetProject/getProject';
import TasksList from 'features/Home/organisms/TasksList';
import TaskModal from 'features/Home/organisms/TaskModal';
import DeleteProjectButton from 'features/Home/atoms/DeleteProjectButton';
import ProjectHeader from 'features/Home/organisms/ProjectHeader';

const ProjectPage = () => {
  const {id} = useParams();
  const [{data, fetching}] = useQuery({
    query: GET_PROJECT,
    variables: {id},
  });
  const project = !fetching && data?.project;
  return (
    <MainTemplate header={<ProjectHeader project={project} />}>
      {fetching && <CircularProgress color='primary' />}
      {project
        ?
        <>
          <Box sx={{width: '100%', mb: 3, py: 1, maxWidth: 480, bgcolor: 'background.paper', boxShadow: 1}}>
            <Box sx={{my: 1}}>
              <Grid container alignItems='center'>
                <Grid item xs={12}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {project.title}
                  </Typography>
                </Grid>
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
              </Grid>
            </Box>
            <Divider variant='middle' />
            <Box sx={{mb: 2}}>
              {(project.tasks?.length)
                ?
                <TasksList tasks={project.tasks} />
                :
                <p>You don't have any tasks yet</p>
              }
              <TaskModal projectId={id} />
            </Box>
          </Box>
          <Grid container alignItems='center'>
            <Grid item xs={12}>
              <DeleteProjectButton id={id} />
            </Grid>
          </Grid>
        </>
        :
        <p>Project not found</p>}
    </MainTemplate>
  );
}

export default ProjectPage;
