import React from 'react';
import {Box, Grid} from '@mui/material';

const FormTemplate = ({children}) => (
  <Grid item xs={12} sm={8} md={5}>
    <Box
      sx={{
        my: 8,
        mx: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </Box>
  </Grid>
);

export default FormTemplate;
