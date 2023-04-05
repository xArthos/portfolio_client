// ** Modules
import React from 'react';
import { useTheme } from '@mui/material/styles';

// ** UI
import Box from '@mui/material/Box';
import IconButton from '@mui/material//IconButton';

// ** Icons
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// ** Theme
import ColorModeContext from '../utils/createColorContext';

const ThemeSwitcher = () => {
    // Take theme's data
    const theme = useTheme();

    // Use the switcher set in the _app for switching the main Theme
    const setThemeName = React.useContext(ColorModeContext);

    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3
            }}
        >
            <IconButton sx={{ ml: 1 }} onClick={setThemeName.toggleColorMode} color='inherit' >
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
};

export default ThemeSwitcher;