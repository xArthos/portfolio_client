// ** Modules
import { ThemeOptions } from '@mui/material/styles';

// ** Utils
import spacing from './spacing';
// import shadows from '../../@core/theme/shadows'

const lightTheme: ThemeOptions = {
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
            dark: '#7900a8',
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
        contrastThreshold: 2,
        tonalOffset: {
            light: 0.5,
            dark: 0.5
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
            A100: '#EEEEEE',
            A200: '#CCCCCC',
            A400: '#666666',
            A700: '#333333'
        },
        divider: '#70003c',
        action: {
            // active: '',
            hover: '#ff6600',
            hoverOpacity: 0.5,
            // selected: '',
            selectedOpacity: 0.5,
            // disabled: '',
            disabledOpacity: 0.5,
            // disabledBackground: '',
            // focus: '',
            focusOpacity: 0.5,
            activatedOpacity: 0.5
        },
        background: {
            default: 'transparent',
            paper: '#ffa662'
        }
    },
    ...spacing,
    // ...shadows('light'),
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 653,
            md: 960,
            lg: 1280,
            xl: 1920
        }
    },
    typography: {
        fontFamily: [
            'roboto',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
        ].join(',')
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    background: 'url("/background-light.png")',
                    backgroundSize: 'cover',
                    backgroundAttachment: 'fixed',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    minWidth: '100%',
                    minHeight: '100%'
                },
                html: {
                    background: 'white'
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    position: 'absolute',
                    top: 55
                }
            }
        },
        MuiFormControl: {
            styleOverrides: {
                root: {
                    marginTop: 16,
                    marginBottom: 8
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    minHeight: 30.75
                }
            }
        }
    }
};

export default lightTheme;