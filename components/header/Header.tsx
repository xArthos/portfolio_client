// Modules
import React from 'react';

// UI
import Box from '@mui/material//Box';
import Menu from '@mui/material//Menu';
import Grid from '@mui/material//Grid';
import Container from '@mui/material//Container';
import IconButton from '@mui/material//IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';

// Media
import ArthosLogo from '../../media/logo/logo-m.svg';

// Components
import Link from '../Link';
import NextAvatar from '../NextAvatar';
import ThemeSwitcher from '../ThemeSwitcher';
import HeaderUserTopMenu from './HeaderUserTopMenu';
import HeaderLoginSignUp from './HeaderLoginSignUp';

const useStyles = makeStyles(({ palette }) => ({
  header: {
    // position: 'sticky',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 9,
    backgroundColor: palette.background.default,
    borderBottom: `2px solid ${palette.background.default}`,
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    '@media (max-width: 653px)': {
      padding: '20px 0'
    }
  },
  headerLogo: {
    height: 65,
    width: 60,
    '@media (max-width:653px)': {
      height: 40,
      width: 40
    },
    '& image': {
      height: 'inherit',
      width: 'inherit'
    }
  },
  mobileMenuDivider: {
    margin: 0
  },
  menuIconMobile: {
    marginLeft: 'auto'
  },
  menuIcon: {
    width: 'auto'
  },
  iconButtonMargin: {
    padding: 0,
    margin: '0 5px 0 15px'
  },
  grid: {
    padding: '0 4px'
  },
  gridSearch: {
    width: 'inherit'
  },
  searchBarBoxMobile: {
    marginTop: 10
  },
  mobileMenuProfileHeader: {
    padding: '8px 16px'
  },
  mobileMenuProfileBody: {
    padding: '6px 16px'
  },
  headerIcon: {
    width: 25,
    height: 25
  },
  badge: {
    marginRight: 10,
    marginLeft: 15
  }
}));

const Header = ({ currentUser, loadingCurrentUser, refetchCurrentUser }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:653px)');
  const isTablet = useMediaQuery('(max-width:898px)');

  // Hooks
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <header className={classes.header}>
      <Container maxWidth='lg' style={isMobile ? null : { paddingRight: 0 }}>
        <Grid container alignItems='center' justifyContent='space-between' direction='row' wrap='nowrap'>
          {/* Avatar, Theme Switcher */}
          <Grid container item wrap='nowrap' alignItems='center'>
            <Grid item className={classes.grid}>
              <Link href='/'>
                <ArthosLogo className={classes.headerLogo} />
              </Link>
            </Grid>

            <Grid item className={classes.grid}>
              <ThemeSwitcher />
            </Grid>
          </Grid>

          {/* Control Panel */}
          <Grid
            container
            item
            className={currentUser && isMobile ? classes.menuIconMobile : classes.menuIcon}
            wrap='nowrap'
            alignItems='center'
            justifyContent='flex-end'
          >
            {/* Mobile Header */}
            {currentUser && isMobile &&
              <>
                <IconButton
                  aria-controls='top-menu'
                  aria-haspopup='true'
                  className={classes.iconButtonMargin}
                  onClick={event => setAnchorEl(event.currentTarget)}
                >
                  <NextAvatar
                    data={currentUser}
                    src={currentUser.avatarUrl}
                    placeholder='/avatar_placeholder.svg'
                  />
                </IconButton>
              </>
            }

            {/* Tablet Header */}
            {currentUser && !isMobile && isTablet &&
              <Box display='flex' justifyContent='center' alignItems='center'>
                <HeaderUserTopMenu user={currentUser} />
              </Box>
            }

            {/* Desktop Header */}
            {currentUser && !isMobile && !isTablet &&
              <Box display='flex' justifyContent='center' alignItems='center'>
                <HeaderUserTopMenu user={currentUser} />
              </Box>
            }

            {!currentUser && <HeaderLoginSignUp />}

            <Menu
              id='top-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
            >
              <Grid container alignItems='flex-start' direction='column' className={classes.mobileMenuProfileHeader}>
                <HeaderUserTopMenu user={currentUser} />
              </Grid>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </header>
  );
};

export default Header;