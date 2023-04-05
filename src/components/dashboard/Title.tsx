// ** Modules
import * as React from 'react';

// ** UI
import Typography from '@mui/material/Typography';

// ** Interfaces
interface TitleProps {
    children?: React.ReactNode;
};

const Title = (props: TitleProps) => {
    return (
        <Typography component='h2' variant='h6' color='primary' gutterBottom>
            {props.children}
        </Typography>
    );
};

export default Title;