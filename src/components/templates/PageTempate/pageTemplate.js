import React, {Component, Fragment} from 'react';
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import AppHeader from "../../organisms/AppHeader";

class PageTemplate extends Component {

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <AppHeader />
        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="md">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >{'TODO List App'}
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {this.props.children}
          </Container>
        </main>
      </Fragment>
    );
  }
}

export default PageTemplate;
