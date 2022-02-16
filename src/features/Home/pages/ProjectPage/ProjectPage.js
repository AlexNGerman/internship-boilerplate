import React from 'react';
import {useMutation, useQuery} from 'urql';
import { useParams, useNavigate } from 'react-router-dom'
import {Grid, Alert, AlertTitle, CircularProgress, Box, Typography, Divider, Button} from '@mui/material';
import {Delete} from "@mui/icons-material";
import MainTemplate from 'components/templates/MainTemplate';
import { GET_PROJECT } from 'queries/GetProject/getProject';
import TasksList from 'features/Home/organisms/TasksList';
import TaskModal from 'features/Home/organisms/TaskModal';
import {DELETE_PROJECT} from "mutations/DeleteProject/deleteProject";
import {ROUTES} from "constants/routes";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, deleteProject] = useMutation(DELETE_PROJECT);
  const [{ data, fetching, error }] = useQuery({
    query: GET_PROJECT,
    variables: { id },
  });
  const project = data?.project;

  const onDeleteProject = async (id) => {
    const responce = await deleteProject({ id: id });
    if(!responce.error) navigate(ROUTES.HOME);
  }
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
      {fetching && <CircularProgress color='primary' />}
      {(project)
        ?
        <>
          <Box sx={{ width: '100%', mb: 3, py: 1, maxWidth: 480, bgcolor: 'background.paper', boxShadow: 1 }}>
            <Box sx={{ my: 1 }}>
              <Grid container alignItems="center">
                <Grid item xs={12}>
                  <Typography gutterBottom variant="h6" component="div">
                    {project.title} - {project.deadline}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom variant="p" component="p">
                    Description: {project.description}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
            <Box sx={{ mb: 2 }}>
              {(project.tasks?.length)
                ?
                <TasksList tasks={project.tasks}/>
                :
                <p>You don't have any tasks yet</p>
              }
              <TaskModal projectId={id}/>
            </Box>
          </Box>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <Button variant="contained" color="error" onClick={() => onDeleteProject(id)} disabled={result.fetching}>
                <Delete fontSize="inherit" /> Delete Project
              </Button>
            </Grid>
          </Grid>
        </>
        :
        <p>You don't have any projects yet</p>}
    </MainTemplate>
  );
}

export default ProjectPage;
