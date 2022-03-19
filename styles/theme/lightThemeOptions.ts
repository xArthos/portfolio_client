// Modules
import { ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            light: '#ffc100',
            main: '#ff9a00',
            dark: '#ff7400',
            contrastText: '#ff4d00'
        },
        secondary: {
            light: '#b700ff',
            main: '#9a00d6',
            dark: '	#7900a8',
            contrastText: '#600085'
        },
        error: {
            light: '#ff0000',
            main: '#cc060c',
            dark: '#cf000f',
            contrastText: '#ff3366'
        },
        warning: {
            light: '#f9e154',
            main: '#f2930c',
            dark: '#f0541e',
            contrastText: '#f0ad4e'
        },
        info: {
            light: '#27ace2',
            main: '#0000ff',
            dark: '#0b4a8f',
            contrastText: '#4186c6'
        },
        success: {
            light: '#ccff33',
            main: '#4b9609',
            dark: '#2d5d07',
            contrastText: '#22bb33'
        },
        text: {
            primary: '#101010',
            secondary: '#696969',
            disabled: '#C0C0C0'
        },
        common: {
            black: '#000000',
            white: '#ffffff'
        },
        contrastThreshold: 1,
        tonalOffset: {
            light: 1,
            dark: 1
        },
        grey: {
            50: '#f8f8fa',
            100: '#e5e6eb',
            200: '#c0c2ce',
            300: '#d2d4dc',
            400: '#afafaf',
            500: '#999999',
            600: '#5b5b5b',
            700: '#5b5b5b',
            800: '#5b5b5b',
            900: '#444444',
            A100: '',
            A200: '',
            A400: '',
            A700: ''
        },
        divider: '',
        action: {
            active: '',
            hover: '',
            hoverOpacity: 1,
            selected: '',
            selectedOpacity: 1,
            disabled: '',
            disabledOpacity: 1,
            disabledBackground: '',
            focus: '',
            focusOpacity: 1,
            activatedOpacity: 1
        },
        background: {
            default: '#20213b',
            paper: ''
        }
    },
    spacing: [0, 4, 8, 16, 32, 64],
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(',')
    }
};

export default lightThemeOptions;