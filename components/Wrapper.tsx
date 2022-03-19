// Modules
import Head from 'next/head';
import React from 'react';

// UI
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

// Components
import Footer from './Footer';
import { Header } from './header';

const useStyles = makeStyles(({ palette }) => ({
    body: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        backgroundColor: palette.background.default
    },
    container: {
        marginTop: 15,
        marginBottom: 50,
        flex: 1
    },
    link: {
        display: 'inline',
        fontWeight: 900,
        marginBottom: 10,
        verticalAlign: 'baseline'
    }
}));

const Wrapper = ({
    currentUser,
    refetchCurrentUser,
    loadingCurrentUser,
    meta = { title: 'Portfolio' },
    children = <Header currentUser={currentUser} refetchCurrentUser={refetchCurrentUser} loadingCurrentUser={loadingCurrentUser} />
}) => {
    const classes = useStyles();

    return (
        <Box className={classes.body}>
            <Head>
                <title>{meta.title}</title>
            </Head>

            <Header currentUser={currentUser} refetchCurrentUser={refetchCurrentUser} loadingCurrentUser={loadingCurrentUser} />

            <Box className={classes.container}>{children}</Box>

            <Footer />
        </Box>
    );
};

export default Wrapper;