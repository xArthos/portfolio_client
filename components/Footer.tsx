// Modules
import React from 'react';

// UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ palette }) => ({
    footer: {
        background: `linear-gradient(180deg, ${palette.primary.contrastText}a2 0%, ${palette.secondary.main} 100%);`,
        padding: '120px 0px',
        maxWidth: '100%',
        display: 'flex',
        justifyContent: 'center'
    }
}));

const Footer = () => {
    const classes = useStyles();

    // TODO: #2 Add a custom footer with Material-UI
    return (
        <footer className={classes.footer}>
            <Grid container spacing={4} direction='column' alignItems='center'>
                <Grid item>
                    <Typography variant='h6'>
                        Giampaolo Nico Lo Cascio &copy; {new Date().getFullYear()}
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;