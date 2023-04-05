// ** Modules
import React from 'react';

// ** UI
import MuiSwipeableDrawer, { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';
import { useTheme } from '@mui/material/styles';

// ** Types
import styled from '@emotion/styled';
import type { PaletteMode } from '@mui/material';
type ContentWidth = 'full' | 'boxed';
type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
type Settings = {
    mode: PaletteMode;
    themeColor: ThemeColor;
    contentWidth: ContentWidth;
};

// ** Interfaces
interface Props {
    open: boolean;
    hidden?: boolean;
    navWidth?: number;
    settings?: Settings;
    navVisible?: boolean;
    children: React.ReactNode;
    variant?: string;
    setNavVisible?: (value: boolean) => void;
    saveSettings?: (values: Settings) => void;
};

// ** Styled Components
const SwipeableDrawer = styled(MuiSwipeableDrawer)<SwipeableDrawerProps>({
    overflowX: 'hidden',
    transition: 'width .25s ease-in-out',
    '& ul': {
        listStyle: 'none'
    },
    '& .MuiListItem-gutters': {
        paddingLeft: 4,
        paddingRight: 4
    },
    '& .MuiDrawer-paper': {
        left: 'unset',
        right: 'unset',
        overflowX: 'hidden',
        transition: 'width .25s ease-in-out, box-shadow .25s ease-in-out'
    }
});

// const drawerWidth: number = 240;

const Drawer = (props: Props) => {
    // ** Props
    const { hidden, children, navWidth, navVisible, setNavVisible, open } = props;

    // ** Hook
    const theme = useTheme();

    // Drawer Props for Mobile & Tablet screens
    const MobileDrawerProps = {
        open: navVisible,
        onOpen: () => setNavVisible(true),
        onClose: () => setNavVisible(false),
        ModalProps: {
            keepMounted: true // Better open performance on mobile.
        }
    };

    // Drawer Props for Desktop screens
    const DesktopDrawerProps = {
        open: true,
        onOpen: () => null,
        onClose: () => null
    };

    return (
        <SwipeableDrawer
            className='layout-vertical-nav'
            variant={hidden ? 'temporary' : 'permanent'}
            {...(hidden ? { ...MobileDrawerProps } : { ...DesktopDrawerProps })}
            PaperProps={{ sx: { width: navWidth } }}
            sx={{
                width: navWidth,
                '& .MuiDrawer-paper': {
                    borderRight: 0,
                    backgroundColor: theme.palette.background.default
                }
            }}
        >
            {children}
        </SwipeableDrawer>
    );
};

export default Drawer;