// ** UI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import { Theme } from '@mui/material/styles';

// ** Icons
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

// ** Components
import UserDropdown from '../header/elements/UserDropDown';
import ThemeSwitcher from '../ThemeSwitcher';
import NotificationDropdown from '../header/elements/NotificationDropdown';

// ** Interfaces
interface Props {
    hidden: boolean;
    toggleNavVisibility: () => void;
    currentUser: object;
};

const CustomAppBar = (props: Props) => {
    // ** Props
    const { hidden, toggleNavVisibility, currentUser } = props;

    // ** Hook
    const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} component='header'>
            <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {hidden ? (
                    <IconButton
                        color='inherit'
                        onClick={toggleNavVisibility}
                        sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                ) : null}
                <TextField
                    size='small'
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon fontSize='small' />
                            </InputAdornment>
                        )
                    }}
                />
            </Box>

            <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center', mr: 8 }}>
                <ThemeSwitcher />
                <NotificationDropdown />
                <UserDropdown currentUser={currentUser} />
            </Box>
        </Box>
    );
};

export default CustomAppBar;