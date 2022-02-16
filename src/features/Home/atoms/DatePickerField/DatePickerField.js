import React from "react";
import { useField, useFormikContext } from 'formik';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...{...props, ...params.inputProps}}/>}
        {...field}
        {...props}
        fullWidth
        disablePast
        showTodayButton
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
    </LocalizationProvider>
  );
};

export default DatePickerField;
