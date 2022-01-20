import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SubmitButton from 'features/Authentication/molecules/SubmitButton';
import Typography from '@mui/material/Typography';
import { useMutation } from 'urql';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { CREATE_USER } from 'mutations/CreateUser/createUser';
import { MIN_LENGTH, MAX_LENGTH, PASSWORD_LENGTH, PASSWORD_MATCH_STRING  } from 'constants/auth';
import { ROUTES } from 'constants/routes';


const SIGNUP_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(MIN_LENGTH, `First name can't be less then ${MIN_LENGTH} letters`)
    .max(MAX_LENGTH, `First name should be less then ${MIN_LENGTH} letters`)
    .required('Required'),
  lastName: Yup.string()
    .min(MIN_LENGTH, `First name can't be less then ${MIN_LENGTH} letters`)
    .max(MAX_LENGTH, `First name should be less then ${MIN_LENGTH} letters`)
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required("Please enter your password")
    .matches(
      PASSWORD_MATCH_STRING,
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
  const [{ fetching, error }, createUser] = useMutation(CREATE_USER);
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
