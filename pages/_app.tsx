// Modules
import * as React from 'react';
import createPersistedState from 'use-persisted-state';
import type { AppProps } from 'next/app';
import { Theme } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes, PaletteMode } from '@mui/material';

// Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Style
import '../styles/globals.css';
import darkTheme from '../styles/theme/darkTheme';
import lightTheme from '../styles/theme/lightTheme';

// Utils
import createEmotionCache from '../utils/createEmotionCache';

// Interfaces
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  // Local Storage SSR
  const themeModeDefault = createPersistedState('themeModeDefault');
  const [themeMode, setThemeMode] = themeModeDefault('light');

  // Hooks
  const [mode, setMode] = React.useState<PaletteMode>('light');

  // Handlers
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
        setThemeMode((prevMode: string) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }), []
  );

  const theme = React.useMemo(
    () =>
      responsiveFontSizes(createTheme(mode === 'light' ? lightTheme : darkTheme)),
    [mode]
  );

  // Change the theme mode with the last selected one
  React.useEffect(() => {
    if (mode !== themeMode) {
      setMode(themeMode);
    };
  }, []);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CacheProvider>
  );
};

export default MyApp;