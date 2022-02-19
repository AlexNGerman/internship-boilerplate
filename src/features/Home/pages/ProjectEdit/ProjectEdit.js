import React  from 'react';
import { useMutation, useQuery } from 'urql';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { Grid, CircularProgress, Typography, Alert, AlertTitle } from '@mui/material';
import AppProjectHeader from 'features/Home/organisms/AppProjectHeader';
import MainTemplate from 'components/templates/MainTemplate';
import FormTemplate from 'features/Authentication/templates/FormTemplate';
import SubmitButton from 'components/molecules/SubmitButton';
import { GET_PROJECT } from 'queries/GetProject/getProject';
import { UPDATE_PROJECT } from "mutations/UpdateProject/updateProject";
import { MIN_LENGTH, MAX_LENGTH } from 'constants/auth';

const PROJECT_EDIT_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(MIN_LENGTH, `Title can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Title can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter title'),
  description: Yup.string()
    .min(MIN_LENGTH, `Description can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Description can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter description'),
});

const ProjectEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [{ error }, updateProject] = useMutation(UPDATE_PROJECT);
  const [{ fetching, data }] = useQuery({
    query: GET_PROJECT,
    variables: { id },
  });
  const errorMessage = error?.message;
  const project = !fetching && data?.project;

  const onSubmit = async (values, { setSubmitting }) => {
    values = {...values, id }
    const result = await updateProject(values);
    setSubmitting(false);
    if(!result?.error) navigate(`/project/${id}`);
  }

  const INITIAL_VALUES = {
    title: project?.title,
    description: project?.description,
  }

  return (
    <MainTemplate header={<AppProjectHeader project={project} edit/>}>
      {fetching && <CircularProgress color='primary' />}
      {(project)
        ?
        <FormTemplate>
          <Typography variant="h3" component="div" gutterBottom align="center">
            Edit Project
          </Typography>

          {errorMessage &&
            <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
              <Grid item xs={12}>
                <Alert severity="error" align='left'>
                  <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
              </Grid>
            </Grid>
          }
          <Formik
            initialValues={INITIAL_VALUES}
            validationSchema={PROJECT_EDIT_SCHEMA}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name="title"
                           inputProps={{
                             "data-testid": "title",
                           }}
                           fullWidth
                           label="Title"
                           placeholder="Title"
                           variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name="description"
                           inputProps={{
                             "data-testid": "description",
                           }}
                           type="textarea"
                           fullWidth
                           label="Description"
                           placeholder="Description"
                           variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton data-testid="submit" loading={fetching}>Update Project</SubmitButton>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </FormTemplate>
        :
        <p>Project not found</p>
      }
    </MainTemplate>
  );
}

export default ProjectEdit;
