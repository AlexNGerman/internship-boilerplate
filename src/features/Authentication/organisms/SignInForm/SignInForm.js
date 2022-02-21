import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Grid, Typography, Alert, AlertTitle } from '@mui/material';
import { useMutation } from 'urql';
import SubmitButton from 'components/molecules/SubmitButton';
import FormTemplate from 'features/Authentication/templates/FormTemplate';
import { SIGNIN_USER } from 'mutations/SignInUser/signInUser';
import { PASSWORD_LENGTH, PASSWORD_REGEX  } from 'constants/auth';
import { ROUTES } from 'constants/routes';
import { setToken } from 'utils/auth/cookies';

const SIGNIN_SCHEMA = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string()
    .required('Please enter your password')
    .matches(
      PASSWORD_REGEX,
      `Password must contain at least ${PASSWORD_LENGTH} characters, one uppercase, one number and one special case character`
    ),
});

const INITIAL_VALUES = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [{ fetching, error }, signInUser] = useMutation(SIGNIN_USER);
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    const result = await signInUser(values);
    const token = result.data?.signInUser.token;
    if(token) setToken(token);
    setSubmitting(false);
    if(!result.error) navigate(ROUTES.HOME);
  }

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        validationSchema={SIGNIN_SCHEMA}
        onSubmit={onSubmit}
      >
        {() => (
          <FormTemplate>
            <Typography variant='h3' component='div' gutterBottom align='center'>
              Sign In
            </Typography>

            {error &&
              <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
                <Grid item xs={12}>
                  <Alert severity='error' align='left'>
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
                         name='email'
                         inputProps={{
                           'data-testid': 'email',
                         }}
                         type='email'
                         fullWidth
                         label='Email'
                         placeholder='email@mail.com'
                         variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field component={TextField}
                         name='password'
                         inputProps={{
                           'data-testid': 'password',
                         }}
                         type='password'
                         fullWidth
                         label='Password'
                         placeholder='Password'
                         variant='outlined'
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton loading={fetching}>Sign In</SubmitButton>
                </Grid>
              </Grid>
            </Form>
          </FormTemplate>
        )}
      </Formik>
    </div>
  );
}

export default SignInForm;
