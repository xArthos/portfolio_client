// ** Modules
import React from 'react';
import { useRouter } from 'next/router';

// ** UI
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

// ** Icons
import LogoutIcon from '@mui/icons-material/Logout';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

// ** Components
import NextAvatar from '../../NextAvatar';

// ** Utils
import firstLetterToUpperCase from '../../../utils/firstLetterToUpperCase';

// ** Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}));

const UserDropdown = ({ currentUser }) => {
    // ** States
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);

    // ** Hooks
    const router = useRouter();

    // ** Handlers
    const handleDropdownOpen = (event: React.SyntheticEvent) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDropdownClose = (url?: string) => {
        if (url) {
            router.push(url);
        };
        setAnchorEl(null);
    };

    const styles = {
        py: 2,
        px: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        textDecoration: 'none',
        '& svg': {
            fontSize: '1.375rem',
            color: 'text.secondary'
        }
    };

    return (
        <React.Fragment>
            <Badge
                overlap='circular'
                onClick={handleDropdownOpen}
                sx={{ ml: 2, cursor: 'pointer' }}
                badgeContent={<BadgeContentSpan />}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <NextAvatar
                    alt={`${currentUser.name.firstName} ${currentUser.name.lastName}`}
                    onClick={handleDropdownOpen}
                    sx={{ width: 40, height: 40 }}
                    src={currentUser ? currentUser.avatarUrl : undefined}
                />
            </Badge>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => handleDropdownClose()}
                sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Box sx={{ pt: 2, pb: 3, px: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Badge
                            overlap='circular'
                            badgeContent={<BadgeContentSpan />}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        >
                            <NextAvatar
                                alt={`${currentUser.name.firstName} ${currentUser.name.lastName}`}
                                onClick={handleDropdownOpen}
                                sx={{ width: 40, height: 40 }}
                                src={currentUser ? currentUser.avatarUrl : undefined}
                            />
                        </Badge>

                        <Box sx={{ display: 'flex', marginLeft: 3, alignItems: 'flex-start', flexDirection: 'column' }}>
                            <Typography sx={{ fontWeight: 600 }}>{`${currentUser.name.firstName} ${currentUser.name.lastName}`}</Typography>
                            <Typography variant='body2' sx={{ fontSize: '0.8rem', color: 'text.disabled' }}>
                                {firstLetterToUpperCase(currentUser.type)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Divider sx={{ mt: 0, mb: 1 }} />

                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <AccountCircleOutlinedIcon sx={{ marginRight: 2 }} />
                        Profile
                    </Box>
                </MenuItem>

                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <EmailOutlinedIcon sx={{ marginRight: 2 }} />
                        Inbox
                    </Box>
                </MenuItem>

                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <ChatOutlinedIcon sx={{ marginRight: 2 }} />
                        Chat
                    </Box>
                </MenuItem>

                <Divider />

                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <SettingsOutlinedIcon sx={{ marginRight: 2 }} />
                        Settings
                    </Box>
                </MenuItem>

                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <AttachMoneyIcon sx={{ marginRight: 2 }} />
                        Pricing
                    </Box>
                </MenuItem>

                <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
                    <Box sx={styles}>
                        <HelpOutlineOutlinedIcon sx={{ marginRight: 2 }} />
                        FAQ
                    </Box>
                </MenuItem>

                <Divider />

                <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/pages/login')}>
                    <LogoutIcon sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
                    Logout
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export default UserDropdown;