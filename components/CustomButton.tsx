// Modules
import React from 'react';
import clsx, { ClassDictionary } from 'clsx';

// UI
import Button, { ButtonTypeMap, ExtendButtonTypeMap } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';

interface CustomButtonType extends ButtonTypeMap {
    size?: "medium" | "large" | "small",
    type?: "button" | "submit" | "reset",
    loading: boolean,
    successful?: boolean,
    successfulLabel?: string,
    disabled?: boolean,
    children?: React.ReactNode,
    marginTop?: number,
    marginBottom?: number,
    marginLeft?: number,
    marginRight?: number
};

interface StyleProps {
    mt: number,
    mb: number,
    ml: number,
    mr: number
}

const useStyles = makeStyles(() => ({
    spinner: {
        position: 'absolute',
        top: 'calc(50% - 13.5px)',
        left: 'calc(50% - 13.5px)'
    },
    spinnerSmall: {
        position: 'absolute',
        top: 'calc(50% - 7.5px)',
        left: 'calc(50% - 7.5px)'
    },
    smallHeight: {
        minHeight: 24
    },
    normalHeight: {
        minHeight: 35
    },
    withMargin: {
        margin: ({ mt, mb, ml, mr }: StyleProps) => `${mt}px ${mb}px ${ml}px ${mr}px`
    }
}));

const CustomButton = ({
    size,
    type,
    loading = false,
    successful = false,
    successfulLabel = 'Successful',
    disabled = false,
    children,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    defaultComponent,
    ...other
}: CustomButtonType) => {
    const classes = useStyles({
        mt: marginTop ? marginTop : 0,
        mb: marginBottom ? marginBottom : 0,
        ml: marginLeft ? marginLeft : 0,
        mr: marginRight ? marginRight : 0
    });
    const small = size === 'small';

    return (
        <Button
            type={type}
            disabled={loading || disabled}
            size={size}
            className={classes.withMargin}
            // classes={{
            //     label: small ?
            //         customClass ?
            //             clsx(classes.smallHeight, customClass) : classes.smallHeight
            //         :
            //         customClass ?
            //             clsx(classes.normalHeight, customClass) : classes.normalHeight
            // }}
            {...other}
        >
            {!loading && (
                successful ? successfulLabel : children
            )}

            {loading && (
                <CircularProgress
                    size={small ? 15 : 27}
                    color='inherit'
                    className={small ? classes.spinnerSmall : classes.spinner}
                />
            )}
        </Button>
    );
};

export default CustomButton;