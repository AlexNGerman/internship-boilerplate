import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { CREATE_USER } from 'mutations/CreateUser/createUser';
import { useMutation } from 'urql';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SIGNUP_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{10,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 10 characters, one uppercase, one number and one special case character"
    ),
});

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const SignUpForm = () => {
  const [{ fetching, error }, createUser] = useMutation(CREATE_USER);

  const onSubmit = async (values, { setSubmitting }, {error}) => {
    await createUser(values).then(result => {
      if (result.error) {
        console.error('Oh no!', result.error.message);
      }
    });
    setSubmitting(false);
  }

  return (
    <div>
      <Typography variant="h3" component="div" gutterBottom align="center">
        Sign Up
      </Typography>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={SIGNUP_SCHEMA}
        onSubmit={(values, setSubmitting) => {
          onSubmit(values, setSubmitting, {error});
        }}
      >
        {({ isSubmitting}) => (
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
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField} name="firstName" fullWidth label="First name" placeholder="First name" variant="outlined" disabled={isSubmitting}/>
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField} name="lastName" fullWidth label="Last name" placeholder="Last name" variant="outlined" disabled={isSubmitting}/>
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField} name="email" type="email" fullWidth label="Email" placeholder="email@mail.com" variant="outlined" disabled={isSubmitting}/>
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField} name="password" type="password" fullWidth label="Password" placeholder="Password" variant="outlined" disabled={isSubmitting} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={isSubmitting}
                    >
                      Sign In {isSubmitting && fetching && <CircularProgress color="inherit" /> }
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            </Box>
          </Grid>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;


