import React from 'react';
import {useNavigate} from 'react-router-dom';
import {AppBar, Toolbar, Typography, IconButton, Button} from '@mui/material';
import {Edit, ArrowBack} from '@mui/icons-material';
import {ROUTES} from 'constants/routes';

const ProjectHeader = ({project, edit = false}) => {
  const {id, title} = project;
  const navigate = useNavigate();

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Typography variant='h6' color='inherit' component='h1' noWrap sx={{flexGrow: 1}}>
          <Button onClick={() => navigate(edit ? `/project/${id}` : ROUTES.HOME)} variant='unbordered' color='white' fontSize='20' data-testid='back-button'>
            <ArrowBack fontSize='medium' sx={{mr: 2}} /> {edit ? `Back to project - "${title}"` : 'Projects List App'}
          </Button>
        </Typography>
        {!edit && <IconButton onClick={() => navigate(`/project/${id}/edit`)} variant='unbordered' color='white' data-testid='edit-project'><Edit
          fontSize='large' /></IconButton>}
      </Toolbar>
    </AppBar>
  );
}

export default ProjectHeader;
