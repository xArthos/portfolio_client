// ** Modules
import * as React from 'react';
import createPersistedState from 'use-persisted-state-any';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { responsiveFontSizes, PaletteMode, createTheme } from '@mui/material';

// ** Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// ** Style
import '../styles/globals.css';
import darkTheme from '../theme/darkTheme';
import lightTheme from '../theme/lightTheme';
import 'react-perfect-scrollbar/dist/css/styles.css';

// ** Utils
import ColorModeContext from '../utils/createColorContext';
import createEmotionCache from '../utils/createEmotionCache';

// ** Components
import ThemeComponent from '../components/ThemeComponent';

// ** Types
import type { AppProps } from 'next/app';
import type { NextPageWithLayout } from '../types/page';

// ** Interfaces
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const ColorModeContextProvider = (props: { value: { toggleColorMode: () => void; }; children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal; }) => {
  return <ColorModeContext.Provider value={props.value}>{props.children}</ColorModeContext.Provider>
};

// const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
const MyApp = (props: AppPropsWithLayout) => {
  // Local Storage SSR
  const themeModeDefault = createPersistedState<PaletteMode>('themeModeDefault');
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
    }), [setThemeMode]
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
  }, [themeMode, mode]);

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ColorModeContextProvider value={colorMode}>
        <ThemeComponent theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ThemeComponent>
      </ColorModeContextProvider>

      {/* 
          <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </ColorModeContext.Provider>
       */}
    </CacheProvider>
  );
};

export default MyApp;