// Modules
import React from 'react';

// UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';

// Components
import Link from '../Link';

const useStyles = makeStyles(() => ({
  noMargin: {
    margin: 0,
  },
  menu: {
    height: 25,
    width: 25,
  },
  container: {
    minWidth: 226
  },
  signUpMobile: {
    padding: 0,
    margin: 0
  }
}));

const HeaderLoginSignUp = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:653px)');

  return isMobile ?
    <Grid container className={classes.container} direction='row' alignItems='center' spacing={4} justifyContent='flex-end'>
      <Grid item className={classes.noMargin}>
        {/* <Link
          href='/login'
          variant='h4'
          color='inherit'
          className={classes.noMargin}
        >
          Login
        </Link> */}
      </Grid>

      <Grid item className={classes.noMargin}>
        {/* <Link href='/sign-up'>
          <Button className={classes.signUpMobile}>Sign up</Button>
        </Link> */}
      </Grid>
    </Grid>
    :
    <Grid container className={classes.container} direction='row' alignItems='center' spacing={4} justifyContent='flex-end'>
      <Grid item className={classes.noMargin}>
        {/* <Link
          href='/login'
          variant='h4'
          color='inherit'
          className={classes.noMargin}
        >
          Login
        </Link> */}
      </Grid>

      <Grid item className={classes.noMargin}>
        {/* <Link href='/sign-up'>
          <Button className={classes.noMargin}>Sign up</Button>
        </Link> */}
      </Grid>
    </Grid>
};

export default HeaderLoginSignUp;