// Modules
import React from 'react';
import NumberFormat from 'react-number-format';

// UI
import TextField from '@mui/material/TextField';

const NumberFormatCustom = (props) => {
    const { inputRef, onChange, name, prefix, suffix, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={values => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value
                    }
                });
            }}
            prefix={prefix || ''}
            suffix={suffix || ''}
            thousandSeparator
        />
    );
};

const FormikTextField = ({ props, name, placeholder, disabled, formatNumber, prefix, suffix, noUnderline, ...other }) => (
    noUnderline ?
        <TextField
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
            InputProps={process.browser && formatNumber && { inputComponent: NumberFormatCustom }}
        />
);

export default FormikTextField;