import React, {useState} from 'react';
import {useMutation} from 'urql';
import {Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import {TextField} from 'formik-mui';
import {Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Grid, Container, Button} from '@mui/material';
import {Close, Add} from '@mui/icons-material';
import SubmitButton from 'components/molecules/SubmitButton';
import {CREATE_TASK} from 'mutations/Task/CreateTask/createTask';
import {MIN_LENGTH, MAX_LENGTH} from 'constants/auth';

const TASK_SCHEMA = Yup.object().shape({
  content: Yup.string()
    .min(MIN_LENGTH, `Content can't be less than ${MIN_LENGTH} characters`)
    .max(MAX_LENGTH, `Content can't be longer than ${MAX_LENGTH} characters`)
    .required('Please enter your content')
});

const INITIAL_VALUES = {
  content: '',
  projectId: '',
}

const TaskModal = ({projectId}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [{fetching}, createTask] = useMutation(CREATE_TASK);

  const onSubmit = async (values, {setSubmitting}) => {
    const params = {...values, projectId};
    const result = await createTask(params);
    setSubmitting(false);
    if(!result.error) handleClose();
  }

  return (
    <div>
      <Button
        aria-label='Open Create Task Modal'
        variant='outlined'
        startIcon={<Add/>}
        data-testid='open-modal'
        onClick={handleOpen}
      >Add Task
      </Button>
      <Dialog
        fullScreen
        onClose={handleClose}
        aria-labelledby='task-modal'
        open={open}
        data-testid='task-modal'
      >
        <DialogTitle sx={{m: 0, p: 2}}>
        Add Task
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <Close/>
        </IconButton>
      </DialogTitle>
        <DialogContent dividers>
          <Container sx={{py: 6}} maxWidth='sm' align='center'>
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={TASK_SCHEMA}
              onSubmit={onSubmit}
            >
              {() => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field component={TextField}
                           name='content'
                           inputProps={{
                             'data-testid': 'content',
                           }}
                           fullWidth
                           label='Content'
                           placeholder='Content'
                           variant='outlined'
                           autoFocus
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <DialogActions sx={{flex: 1, px: 0, mt: 2}}>
                      <Button fullWidth variant='outlined' onClick={handleClose}>Cancel</Button>
                      <SubmitButton loading={fetching}>Create Task</SubmitButton>
                    </DialogActions>
                  </Grid>
                </Grid>
              </Form>
            )}
            </Formik>
          </Container>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default TaskModal;
