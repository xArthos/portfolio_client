// Modules
import React from 'react';

// UI
import Radio from '@mui/material/Radio';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

interface RadioItem {
    label: string
    value: string
};

// Component
const FormikRadio = ({
    props,
    radioClassName,
    label,
    name,
    disabled,
    labelClass,
    defaultValue,
    options,
    radioRow,
    ...other
}) => {
    const { values } = props;

    // Handlers
    const handleChange = ({ target }) => {
        if (target.value === 'true' || target.value === 'false') return props.setFieldValue(name, target.value);
        if (target.value === 'null') return props.setFieldValue(name, target.value = 'null');
        props.setFieldValue(name,target.value);
    };

    return (
        <FormControl
            component='fieldset'
            disabled={disabled}
            name={name}
            {...other}
        >
            <FormLabel component='legend' className={labelClass}>
                {label}
            </FormLabel>

            <RadioGroup row={radioRow} className={radioClassName} name={name} value={values[name]} onChange={handleChange}>
                {options.map((item: RadioItem, index: number) => {
                    return (
                        <FormControlLabel
                            key={`${name}${index}`}
                            checked={item.value === defaultValue}
                            value={item.value.toString()}
                            control={<Radio />}
                            label={item.label}
                        />
                    )
                })}
            </RadioGroup>
        </FormControl>
    );
};

export default FormikRadio;