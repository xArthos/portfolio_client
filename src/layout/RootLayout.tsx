// ** Modules
import React from 'react';

// ** UI
import Box from '@mui/material/Box';

// ** Components
import Footer from '../components/Footer';
import Header from '../components/header/Header';

const RootLayout = ({
    currentUser,
    refetchCurrentUser,
    loadingCurrentUser,
    errorCurrentUser,
    children
}) => {
    return (
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    flexDirection: 'column',
                    backgroundColor: theme => theme.palette.background.default
                }}
            >
                {/* Header - NavBar */}
                <Header currentUser={currentUser} refetchCurrentUser={refetchCurrentUser} loadingCurrentUser={loadingCurrentUser} errorCurrentUser={errorCurrentUser} />

                {/* Body */}
                <Box
                    sx={{
                        marginTop: 10,
                        marginBottom: 10,
                        flex: 1
                    }}
                    component='main'
                >
                    {children}
                </Box>

                {/* Footer */}
                <Footer />
            </Box>
    );
};

export default RootLayout;