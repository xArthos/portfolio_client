// Modules
import React from 'react';

// UI
import TextField from '@mui/material/TextField';

const FormikTextField = ({ props, name, placeholder, disabled, prefix, suffix, noUnderline, ...other }) => (
    noUnderline ?
        <TextField
            variant='filled'
            margin='normal'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={(props.values[name])}
            error={props.errors[name] && props.touched[name] || other.error}
            helperText={props.errors[name] && props.touched[name] && props.errors[name] || other.helperText}
            placeholder={disabled ? undefined : placeholder}
            disabled={disabled}
            name={name}
            inputProps={{ prefix, suffix }}
            {...other}
            InputProps={{ disableUnderline: noUnderline }}
        />
        :
        <TextField
            variant='filled'
            margin='normal'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={(props.values[name])}
            error={props.errors[name] && props.touched[name] || other.error}
            helperText={props.errors[name] && props.touched[name] && props.errors[name] || other.helperText}
            placeholder={disabled ? undefined : placeholder}
            disabled={disabled}
            name={name}
            inputProps={{ prefix, suffix }}
            {...other}
        />
);

export default FormikTextField;