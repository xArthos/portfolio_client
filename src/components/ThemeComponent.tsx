// ** Modules
import React from 'react';

// ** UI
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { ThemeProvider } from '@mui/system';

// ** Styles
import GlobalStyling from '../styles/globalStyles';

const ThemeComponent = (props: { children: React.ReactNode; theme: any; }) => {
  // ** Props
  const { children, theme } = props;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={() => GlobalStyling(theme) as any} />
      {children}
    </ThemeProvider>
  );
};

export default ThemeComponent;