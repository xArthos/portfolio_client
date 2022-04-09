// Modules
import React from 'react';
import Router from 'next/router';

// UI
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { makeStyles } from '@mui/styles';

// Components
import NextAvatar from '../NextAvatar';

const useStyles = makeStyles(({ palette }) => ({
  topMenuButton: {
    margin: 0,
    backgroundColor: palette.background.default,
    '&:hover': {
      backgroundColor: palette.background.default
    },
    '& > *': {
      color: palette.text.primary
    }
  },
  menu: {
    height: 25,
    width: 25
  },
  menuItem: {
    width: '100%'
  }
}));

const HeaderUserTopMenu = ({ user }) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:653px)');

  // Hooks
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Handler
  const handleHref = (...params: string[]) => {
    return () => {
      setAnchorEl(null);
      Router.push.apply(null, params);
    };
  };

  const handleLogout = async () => {
    setAnchorEl(null);
    Router.push('/login');
  };

  return (
    <>
      {isMobile ?
        <>
          <MenuItem className={classes.menuItem} onClick={handleHref('/user/[_id]/profile', `/user/${user && user._id}/profile`)}>
            Profile
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={handleHref('/subscription')}>
            Membership
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={handleHref('/search')}>
            Advanced Search
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={handleHref('/user/[_id]/launchpad', `/user/${user && user._id}/launchpad`)}>
            Launchpad
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={handleHref('/settings')}>
            Settings
          </MenuItem>

          <MenuItem className={classes.menuItem} onClick={handleLogout}>
            Logout
          </MenuItem>
        </>
        :
        <Tooltip title='Click to open menu'>
          <Chip
            avatar={<NextAvatar data={user} src={user && user.avatarUrl} placeholder='/avatar_placeholder.svg' />}
            onClick={event => setAnchorEl(event.currentTarget)}
            label={`${user && user.firstName} ${user && user.lastName}`}
          />
        </Tooltip>
      }

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
        <MenuItem onClick={handleHref('/user/[_id]/profile', `/user/${user && user._id}/profile`)}>Profile</MenuItem>
        <MenuItem onClick={handleHref('/subscription')}>Membership</MenuItem>
        <MenuItem onClick={handleHref('/search')}>Advanced Search</MenuItem>
        <MenuItem onClick={handleHref('/user/[_id]/launchpad', `/user/${user && user._id}/launchpad`)}>Launchpad</MenuItem>
        <MenuItem onClick={handleHref('/settings')}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

HeaderUserTopMenu.displayName = 'HeaderUserTopMenu';

export default HeaderUserTopMenu;