// ** Modules
import Head from 'next/head';
import React from 'react';

// ** Layout
import RootLayout from '../layout/RootLayout';
import UserLayout from '../layout/UserLayout';

const Wrapper = ({
    currentUser,
    refetchCurrentUser,
    loadingCurrentUser,
    errorCurrentUser,
    meta = { title: 'Giampaolo\'s Portfolio' },
    children
}) => {
    // // ** Hooks
    // const [open, setOpen] = React.useState(true);
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    // // ** Handlers
    // const toggleDrawer = () => { setOpen(!open); };
    // const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };
    // const handleDrawerOpen = () => { setOpen(true); };
    // const handleDrawerClose = () => { setOpen(false); };

    return (
        currentUser ?
            <UserLayout
                currentUser={currentUser}
                refetchCurrentUser={refetchCurrentUser}
                loadingCurrentUser={loadingCurrentUser}
                errorCurrentUser={errorCurrentUser}
            >
                {/* Title of the page */}
                <Head>
                    <title>{meta.title}</title>
                </Head>

            </UserLayout>
            :
            <React.Fragment>
                {/* Title of the page */}
                <Head>
                    <title>{meta.title}</title>
                </Head>

                <RootLayout
                    currentUser={currentUser}
                    refetchCurrentUser={refetchCurrentUser}
                    loadingCurrentUser={loadingCurrentUser}
                    errorCurrentUser={errorCurrentUser}
                >
                    {children}
                </RootLayout>
            </React.Fragment>
    );
};

export default Wrapper;