// ** Modules
import React from 'react';

// ** UI
import Button, { ButtonTypeMap, ExtendButtonTypeMap } from '@mui/material/Button';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { styled } from '@mui/system';

// ** Interfaces
interface CustomButtonType extends ButtonTypeMap {
    size?: 'medium' | 'large' | 'small';
    type?: 'button' | 'submit' | 'reset';
    loading: boolean;
    successful?: boolean;
    successfulLabel?: string;
    disabled?: boolean;
    children?: React.ReactNode;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
};

interface CustomCircularProgress extends CircularProgressProps {
    small?: boolean;
};

// ** Styled Components
const MuiCircularProgress = styled(CircularProgress, {
    shouldForwardProp: (prop) => prop !== 'containerClass'
})<CustomCircularProgress>(({ small }) => ({
    position: 'absolute',
    top: small ? 'calc(50% - 7.5px)' : 'calc(50% - 13.5px)',
    left: small ? 'calc(50% - 7.5px)' : 'calc(50% - 13.5px)'
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
    const small = size === 'small';

    return (
        <Button
            type={type}
            disabled={loading || disabled}
            size={size}
            sx={{
                margin: `${marginTop || 0}px ${marginBottom || 0}px ${marginLeft || 0}px ${marginRight || 0}px`
            }}
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
                <MuiCircularProgress
                    size={small ? 15 : 27}
                    color='inherit'
                    // small={small}
                    // className={small ? classes.spinnerSmall : classes.spinner}
                />
            )}
        </Button>
    );
};

export default CustomButton;