// ** Modules
import React from 'react';

// ** UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ** Interfaces
interface SelectOption {
    value: string;
    label: string;
};

const FormikSelect = ({
    name,
    label,
    formikProps,
    disabled,
    options,
    selectProps,
    ...props
}) => {
    return (
        <Autocomplete
            fullWidth
            disableCloseOnSelect
            name={name}
            options={options}
            getOptionLabel={(option: SelectOption) => option.label}
            renderInput={(params) => (
                <TextField
                    {...params}
                    {...props}
                    fullWidth
                    variant='standard'
                    label={label}
                    disabled={disabled}
                />
            )}
            onChange={(_, newValue: SelectOption) => {
                formikProps.setFieldValue(
                    name,
                    newValue.value
                    // newValue.map((v) => v.value)
                );
            }}
            {...selectProps}
        />
    );
};

export default FormikSelect;