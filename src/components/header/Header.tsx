// ** Modules
import React from 'react';
import Image from 'next/image';

// ** UI
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';

// ** Media
import ArthosLogo from '../../media/logo/logo-m.svg';

// ** Components
import Link from '../muiCustom/CustomLink';
import NextAvatar from '../NextAvatar';
import ThemeSwitcher from '../ThemeSwitcher';
import HeaderUserTopMenu from './HeaderUserTopMenu';
import HeaderLoginSignUp from './HeaderLoginSignUp';

// ** Styled Components
const MuiHeader = styled('header')(({ theme }) => ({
  width: '100%',
  top: 0,
  left: 0,
  zIndex: 9,
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'row',
  padding: 20,
  '@media (max-width: 653px)': {
    padding: '20px 0'
  }
}));

const Header = ({ currentUser, loadingCurrentUser, refetchCurrentUser, errorCurrentUser }) => {
  const isMobile = useMediaQuery('(max-width:653px)');
  const isTablet = useMediaQuery('(max-width:898px)');

  // Hooks
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <MuiHeader>
      <Container style={isMobile ? null : { paddingRight: 0 }}>
        <Grid container alignItems='center' justifyContent='space-between' direction='row' wrap='nowrap'>
          {/* Avatar, Theme Switcher */}
          <Grid container item wrap='nowrap' alignItems='center'>
            <Grid item sx={{ padding: '0 4px' }}>
              <Link href='/'>
                <Image
                  src={`${ArthosLogo.src}`}
                  alt='Logo'
                  height={isMobile ? 40 : 65}
                  width={isMobile ? 40 : 60}
                />
              </Link>
            </Grid>

            <Grid item sx={{ padding: '0 4px' }}>
              <ThemeSwitcher />
            </Grid>
          </Grid>

          {/* Control Panel */}
          <Grid
            container
            item
            sx={currentUser && isMobile ? { marginLeft: 'auto' } : { width: 'auto' }}
            wrap='nowrap'
            alignItems='center'
            justifyContent='flex-end'
          >
            {/* Mobile Header */}
            {currentUser && isMobile &&
              <React.Fragment>
                <IconButton
                  aria-controls='top-menu'
                  aria-haspopup='true'
                  sx={{ padding: 0, margin: '0 5px 0 15px' }}
                  onClick={event => setAnchorEl(event.currentTarget)}
                >
                  <NextAvatar
                    data={currentUser}
                    src={currentUser.avatarUrl}
                    placeholder='/avatar_placeholder.svg'
                  />
                </IconButton>
              </React.Fragment>
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
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Grid
                container
                alignItems='flex-start'
                direction='column'
                sx={{ padding: '8px 16px' }}
              >
                <HeaderUserTopMenu user={currentUser} />
              </Grid>
            </Menu>
          </Grid>
        </Grid>
      </Container>
    </MuiHeader>
  );
};

export default Header;