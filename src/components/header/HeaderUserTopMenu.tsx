// ** Modules
import React from 'react';
import Router from 'next/router';

// ** UI
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';

// ** Components
import NextAvatar from '../NextAvatar';

const HeaderUserTopMenu = ({ user }) => {
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
    <React.Fragment>
      {isMobile ?
        <React.Fragment>
          <MenuItem sx={{ width: '100%' }} onClick={handleHref('/user/[_id]/profile', `/user/${user && user._id}/profile`)}>
            Profile
          </MenuItem>

          <MenuItem sx={{ width: '100%' }} onClick={handleHref('/subscription')}>
            Membership
          </MenuItem>

          <MenuItem sx={{ width: '100%' }} onClick={handleHref('/search')}>
            Advanced Search
          </MenuItem>

          <MenuItem sx={{ width: '100%' }} onClick={handleHref('/user/[_id]/launchpad', `/user/${user && user._id}/launchpad`)}>
            Launchpad
          </MenuItem>

          <MenuItem sx={{ width: '100%' }} onClick={handleHref('/settings')}>
            Settings
          </MenuItem>

          <MenuItem sx={{ width: '100%' }} onClick={handleLogout}>
            Logout
          </MenuItem>
        </React.Fragment>
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
        id='top-menu2'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem onClick={handleHref('/user/[_id]/profile', `/user/${user && user._id}/profile`)}>Profile</MenuItem>
        <MenuItem onClick={handleHref('/settings')}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

HeaderUserTopMenu.displayName = 'HeaderUserTopMenu';

export default HeaderUserTopMenu;