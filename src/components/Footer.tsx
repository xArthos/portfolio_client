// ** Modules
import React from 'react';

// ** UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

// ** Styled Components
const MuiFooter = styled('footer')(({ theme }) => ({
    background: `linear-gradient(180deg, ${theme.palette.primary.contrastText}a2 0%, ${theme.palette.secondary.main} 100%);`,
    padding: '120px 0px',
    maxWidth: '100%',
    display: 'flex',
    justifyContent: 'center'
}));

const Footer = (props: any) => {
    // TODO: #2 Add a custom footer with Material-UI
    return (
        <MuiFooter>
            <Grid container spacing={4} direction='column' alignItems='center'>
                <Grid item>
                    <Typography variant='h6'>
                        Giampaolo Nico Lo Cascio &copy; {new Date().getFullYear()}
                    </Typography>
                </Grid>
            </Grid>
        </MuiFooter>
    );
};

export default Footer;