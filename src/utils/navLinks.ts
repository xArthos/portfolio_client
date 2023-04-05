// ** Icons
import LoginIcon from '@mui/icons-material/Login';
import DatasetIcon from '@mui/icons-material/Dataset';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import TextFormatOutlinedIcon from '@mui/icons-material/TextFormatOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';

// ** Types
import { VerticalNavItemsType } from '../types/verticalNavItem';

const navigation = (): VerticalNavItemsType => {
    return [
        {
            title: 'Dashboard',
            icon: HomeOutlinedIcon,
            path: '/user/dashboard'
        },
        {
            title: 'Account Settings',
            icon: ManageAccountsOutlinedIcon,
            path: '/account-settings'
        },
        {
            sectionTitle: 'Pages'
        },
        {
            title: 'Login',
            icon: LoginIcon,
            path: '/pages/login',
            openInNewTab: true
        },
        {
            title: 'Register',
            icon: PersonAddOutlinedIcon,
            path: '/pages/register',
            openInNewTab: true
        },
        {
            title: 'Error',
            icon: ErrorOutlineOutlinedIcon,
            path: '/pages/error',
            openInNewTab: true
        },
        {
            sectionTitle: 'User Interface'
        },
        {
            title: 'Typography',
            icon: TextFormatOutlinedIcon,
            path: '/typography'
        },
        {
            title: 'Icons',
            path: '/icons',
            icon: WorkspacesOutlinedIcon
        },
        {
            title: 'Cards',
            icon: CreditCardOutlinedIcon,
            path: '/cards'
        },
        {
            title: 'Tables',
            icon: DatasetIcon,
            path: '/tables'
        },
        {
            icon: ViewInArIcon,
            title: 'Form Layouts',
            path: '/form-layouts'
        },
        {
            title: 'Icons',
            path: '/icons',
            icon: WorkspacesOutlinedIcon
        },
        {
            title: 'Cards',
            icon: CreditCardOutlinedIcon,
            path: '/cards'
        },
        {
            title: 'Tables',
            icon: DatasetIcon,
            path: '/tables'
        },
        {
            icon: ViewInArIcon,
            title: 'Form Layouts',
            path: '/form-layouts'
        },
        {
            title: 'Icons',
            path: '/icons',
            icon: WorkspacesOutlinedIcon
        },
        {
            title: 'Cards',
            icon: CreditCardOutlinedIcon,
            path: '/cards'
        },
        {
            title: 'Tables',
            icon: DatasetIcon,
            path: '/tables'
        },
        {
            icon: ViewInArIcon,
            title: 'Form Layouts',
            path: '/form-layouts'
        },
        {
            title: 'Icons',
            path: '/icons',
            icon: WorkspacesOutlinedIcon
        },
        {
            title: 'Cards',
            icon: CreditCardOutlinedIcon,
            path: '/cards'
        },
        {
            title: 'Tables',
            icon: DatasetIcon,
            path: '/tables'
        },
        {
            icon: ViewInArIcon,
            title: 'Form Layouts',
            path: '/form-layouts'
        }
    ];
};

export default navigation;