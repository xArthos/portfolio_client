// Modules
import React from 'react';

// UI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ palette }) => ({
    footer: {
        backgroundColor: palette.secondary.main,
        padding: '50px 23px',
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
            <Grid container spacing={4} direction='column' >
                <Grid item>
                    <Typography>
                        Giampaolo Nico Lo Cascio &copy; {new Date().getFullYear()}
                    </Typography>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;