// ** Modules
import React from 'react';

// ** UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Components
import Link from '../muiCustom/CustomLink';

const HeaderLoginSignUp = () => {
  const isMobile = useMediaQuery('(max-width: 653px)');

  return isMobile ?
    <Grid
      container
      direction='row'
      alignItems='center'
      spacing={4}
      justifyContent='flex-end'
      sx={{ minWidth: 226 }}
    >
      <Grid item sx={{ margin: 0 }}>
        <Link
          href='/login'
          color='inherit'
        // sx={{ margin: 0 }}
        >
          Login
        </Link>
      </Grid>

      <Grid item sx={{ margin: 0 }}>
        <Link href='/register'>
          <Button
            sx={{
              '&:hover': {
                color: theme => `${theme.palette.secondary.main} !important`
              },
              '@media (max-width: 653px)': {
                padding: 0,
                margin: 0
              }
            }}
          >
            Register
          </Button>
        </Link>
      </Grid>
    </Grid>
    :
    <Grid
      container
      direction='row'
      alignItems='center'
      spacing={4}
      justifyContent='flex-end'
      sx={{ minWidth: 226 }}
    >
      <Grid item sx={{ margin: 0 }}>
        <Link
          href='/login'
          color='inherit'
          // sx={{ margin: 0 }}
        >
          Login
        </Link>
      </Grid>

      <Grid item sx={{ margin: 0 }}>
        <Link href='/register'>
          <Button
            sx={{
              '&:hover': {
                color: theme => `${theme.palette.secondary.main} !important`
              },
              '@media (max-width: 653px)': {
                padding: 0,
                margin: 0
              }
            }}
          >
            Register
          </Button>
        </Link>
      </Grid>
    </Grid>
};

export default HeaderLoginSignUp;