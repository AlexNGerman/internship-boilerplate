import React from "react";
import { useField, useFormikContext, ErrorMessage } from 'formik';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField, FormHelperText } from '@mui/material';

const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimePicker
        renderInput={(params) => <TextField {...field} {...props} {...params.inputProps}/>}
        {...field}
        {...props}
        disablePast
        showTodayButton
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setFieldValue(field.name, val);
        }}
      />
      <ErrorMessage component={FormHelperText} name={props.name} error sx={{ mx: "14px" }}/>
    </LocalizationProvider>
  );
};

export default DatePickerField;
