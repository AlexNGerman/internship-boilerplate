import React, { useState } from "react";
import { useMutation } from 'urql';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField } from 'formik-mui';
import { SpeedDial, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Alert, AlertTitle, Container, Button } from '@mui/material';
import { Close, Add } from '@mui/icons-material';
import SubmitButton from 'components/molecules/SubmitButton';
import DatePickerField from 'features/Home/atoms/DatePickerField';
import { CREATE_PROJECT } from 'mutations/CreateProject/createProject';
import { MIN_LENGTH, MAX_LENGTH } from 'constants/auth';


const SIGNUP_SCHEMA = Yup.object().shape({
  title: Yup.string()
    .min(MIN_LENGTH, `Title can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Title can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter title'),
  description: Yup.string()
    .min(MIN_LENGTH, `Description can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Description can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter description'),
  deadline: Yup.date()
    .required('Please enter deadline'),
});

const INITIAL_VALUES = {
  title: '',
  description: '',
  deadline: '',
}

const ProjectModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [{ fetching, error }, createProject] = useMutation(CREATE_PROJECT);
  const errorMessage = error?.message;

  const onSubmit = async (values, { setSubmitting }) => {
    const result = await createProject(values);
    setSubmitting(false);

    if(!result.error) handleClose();
  }

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<Add />}
        data-testid='open-modal'
        onClick={handleOpen}
      />
      <Dialog
        fullScreen
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        data-testid='project-modal'
      >
        <DialogTitle sx={{ m: 0, p: 2 }}>
          Add Project

          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Container sx={{ py: 6 }} maxWidth="sm" align="center">
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={SIGNUP_SCHEMA}
              onSubmit={onSubmit}
            >
              {(props) => (
                <>
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
                               autoFocus
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
                        <DatePickerField
                          onChange={value => props.setFieldValue("deadline", value)}
                          label="Deadline"
                          name="deadline"
                          inputProps={{
                            "data-testid": "deadline",
                            name: "deadline",
                            placeholder: "Deadline",
                            autoComplete: 'off'
                          }}
                          fullWidth
                          placeholder="Deadline"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <DialogActions sx={{ flex: 1, px: 0, mt: 2 }}>
                          <Button fullWidth variant="outlined" onClick={handleClose}>Cancel</Button>
                          <SubmitButton data-testid="submit" loading={fetching}>Create Project</SubmitButton>
                        </DialogActions>
                      </Grid>
                    </Grid>
                  </Form>
                </>
              )}
            </Formik>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProjectModal;
