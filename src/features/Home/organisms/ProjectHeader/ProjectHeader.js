import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { ROUTES } from 'constants/routes';
import { Edit, ArrowBack } from '@mui/icons-material';

const ProjectHeader = ({ project, edit = false }) => {
  const { id, title } = project;
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant='h6' color='inherit' component='h1' noWrap sx={{ flexGrow: 1 }}>
          <Button component={Link} to={ edit ? `/project/${id}` : ROUTES.HOME } variant='unbordered' color='white' fontSize='20'>
            <ArrowBack fontSize="medium" sx={{ mr: 2 }} /> { edit ? `Back to project - "${title}"` : 'Projects List App' }
          </Button>
        </Typography>

        {!edit && <IconButton component={Link} to={`/project/${id}/edit`} variant='unbordered' color='white'><Edit fontSize="large" /></IconButton>}
      </Toolbar>
    </AppBar>
  );
}

export default ProjectHeader;
