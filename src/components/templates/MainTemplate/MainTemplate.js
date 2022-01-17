import React, { Fragment, Component } from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppHeader from "components/organisms/AppHeader";

class MainTemplate extends Component {
  render(){
    return (
      <Fragment>
        <CssBaseline />
        <AppHeader />
        <main>
          <Container sx={{ py: 8 }} maxWidth="md" align="center">
            {this.props.children}
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default MainTemplate;
