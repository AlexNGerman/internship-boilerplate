import React, { Fragment } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppHeader from 'components/organisms/AppHeader';

const MainTemplate = ({ children, header }) => (
  <Fragment>
    <CssBaseline />
    {header ? header : <AppHeader />}
    <main>
      <Container sx={{ py: 6 }} maxWidth="md" align="center">
        {children}
      </Container>
    </main>
  </Fragment>
);

export default MainTemplate;
