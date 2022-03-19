// Modules
import * as React from 'react';
import type { AppProps } from 'next/app';
import { Theme } from '@mui/material/styles';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme, responsiveFontSizes  } from '@mui/material';

// Font
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// Style
import '../styles/globals.css';
import darkThemeOptions from '../styles/theme/darkThemeOptions';
import lightThemeOptions from '../styles/theme/lightThemeOptions';

// Utils
import createEmotionCache from '../utils/createEmotionCache';

// Interfaces
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

// Theme
// const darkTheme = createTheme(darkThemeOptions);
const lightTheme = responsiveFontSizes(createTheme(darkThemeOptions));

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MyApp;