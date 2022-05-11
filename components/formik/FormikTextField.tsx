// Modules
import React from 'react';

// UI
import TextField from '@mui/material/TextField';

const FormikTextField = ({ props, name, placeholder, disabled, prefix, suffix, noUnderline, helperTextProps, ...other }) => {
    return noUnderline ?
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
            InputProps={{ disableUnderline: noUnderline }}
            FormHelperTextProps={helperTextProps}
            {...other}
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
            FormHelperTextProps={helperTextProps}
            {...other}
        />
};

export default FormikTextField;