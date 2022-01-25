import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import { Box, Grid, Typography, Alert, AlertTitle } from '@mui/material';
import { useMutation } from 'urql';
import SubmitButton from 'features/Authentication/molecules/SubmitButton';
import { CREATE_USER } from 'mutations/CreateUser/createUser';
import { MIN_LENGTH, MAX_LENGTH, PASSWORD_LENGTH, PASSWORD_REGEX  } from 'constants/auth';
import { ROUTES } from 'constants/routes';


const SIGNUP_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(MIN_LENGTH, `First name can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `First name can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter your first name'),
  lastName: Yup.string()
    .min(MIN_LENGTH, `Last name can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Last name can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter your last name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      PASSWORD_REGEX,
      `Password must contain at least ${PASSWORD_LENGTH} characters, one uppercase, one number and one special case character`
    ),
});

const INITIAL_VALUES = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

const SignUpForm = () => {
  const [{ fetching, data }, createUser] = useMutation(CREATE_USER);
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    const result = await createUser(values);
    setSubmitting(false);
    if(!result.error) navigate(ROUTES.SIGNIN);
  }

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={SIGNUP_SCHEMA}
        onSubmit={onSubmit}
      >
        {() => (
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
              <Typography variant="h3" component="div" gutterBottom align="center">
                Sign Up
              </Typography>

              {data?.errors[0].message &&
                <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
                  <Grid item xs={12}>
                    <Alert severity="error" align='left'>
                      <AlertTitle>Error</AlertTitle>
                      {data.errors[0].message}
                    </Alert>
                  </Grid>
                </Grid>
              }
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name="firstName"
                           inputProps={{
                             "data-testid": "firstName",
                           }}
                           fullWidth label="First name"
                           placeholder="First name"
                           variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name="lastName"
                           inputProps={{
                             "data-testid": "lastName",
                           }}
                           fullWidth
                           label="Last name"
                           placeholder="Last name"
                           variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name="email"
                           inputProps={{
                             "data-testid": "email",
                           }}
                           type="email"
                           fullWidth
                           label="Email"
                           placeholder="email@mail.com"
                           variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name="password"
                           inputProps={{
                             "data-testid": "password",
                           }}
                           type="password"
                           fullWidth
                           label="Password"
                           placeholder="Password"
                           variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton data-testid="submit" loading={fetching}>Sign Up</SubmitButton>
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
