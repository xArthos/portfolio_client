// ** Modules
import React from 'react';

// ** UI
// import Fab from '@mui/material/Fab';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';

// ** Icons
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// ** Components
import Footer from '../../components/Footer';
import Navigation from './elements/VerticalNavigation';
import ScrollToTop from '../../components/ScrollToTop';
import CustomAppBar from '../../components/muiCustom/CustomAppBar';

// ** Styles
import DatePickerWrapper from '../../styles/datePickerWrapper';

// ** Types
import { LayoutProps } from '../../types/layoutProps';

// ** Styled Components
const VerticalLayoutWrapper = styled('div')({
    height: '100%',
    display: 'flex'
});

const MainContentWrapper = styled(Box)<BoxProps>({
    flexGrow: 1,
    minWidth: 0,
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column'
});

const ContentWrapper = styled('main')(({ theme }) => ({
    flexGrow: 1,
    width: '100%',
    padding: theme.spacing(6),
    transition: 'padding .25s ease-in-out',
    [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));

const VerticalLayout = (props: LayoutProps) => {
    // ** Props
    const { children, scrollToTop, currentUser } = props;

    // ** Vars
    const navWidth = 260;

    // ** States
    const [navVisible, setNavVisible] = React.useState<boolean>(true);

    // ** Handlers
    const toggleNavVisibility = () => setNavVisible(!navVisible);

    return (
        <React.Fragment>
            <VerticalLayoutWrapper >
                {/* Navigation Menu */}
                <Navigation
                    navWidth={navWidth}
                    navVisible={navVisible}
                    open={navVisible}
                    setNavVisible={setNavVisible}
                    toggleNavVisibility={toggleNavVisibility}
                    {...props}
                />

                {/*  */}
                <MainContentWrapper>
                    {/* AppBar Component */}
                    <CustomAppBar currentUser={currentUser} toggleNavVisibility={toggleNavVisibility} {...props} />

                    {/* Content */}
                    <ContentWrapper
                        className='layout-page-content'
                        sx={{
                            mx: 'auto',
                            '@media (min-width:1440px)': { maxWidth: 1440 },
                            '@media (min-width:1200px)': { maxWidth: '100%' }
                        }}
                    >
                        {children}
                    </ContentWrapper>

                    {/* Footer Component */}
                    <Footer {...props} />

                    {/* Portal for React Datepicker */}
                    <DatePickerWrapper sx={{ zIndex: 11 }}>
                        <Box id='react-datepicker-portal'></Box>
                    </DatePickerWrapper>
                </MainContentWrapper>
            </VerticalLayoutWrapper>

            {/* Scroll to top button */}
            {scrollToTop ? (
                scrollToTop(props)
            ) : (
                // ! Contrast ratio console error with dark mode
                <ScrollToTop className='mui-fixed'>
                    {/* <Fab color='primary' size='small' aria-label='scroll back to top'>
                        <ArrowUpwardIcon />
                    </Fab> */}
                </ScrollToTop>
            )}
        </React.Fragment>
    );
};

export default VerticalLayout;