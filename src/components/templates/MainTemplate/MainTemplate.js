import React, { Fragment } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppHeader from "components/organisms/AppHeader";

const MainTemplate = (props) =>{
  return (
    <Fragment>
      <CssBaseline />
      <AppHeader />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md" align="center">
          {props.children}
        </Container>
      </main>
    </Fragment>
  );
}

export default MainTemplate;
