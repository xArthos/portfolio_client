// ** Modules
import { ReactNode, ReactElement } from 'react';

// ** UI
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import VerticalLayout from './vertical/VerticalLayout';
import VerticalNavItems from '../utils/navLinks';
import CustomAppBar from '../components/muiCustom/CustomAppBar';

// ** Interfaces
interface Props {
  children: ReactNode;
  currentUser?: object;
  refetchCurrentUser?: object;
  loadingCurrentUser?: boolean;
  errorCurrentUser?: object;
};

const UserLayout = ({ children, currentUser, refetchCurrentUser, loadingCurrentUser, errorCurrentUser }: Props) => {
  /**
   *  The below variable will hide the current layout menu at given screen size.
   *  The menu will be accessible from the Hamburger icon only (Vertical Overlay Menu).
   *  You can change the screen size from which you want to hide the current layout menu.
   *  Please refer useMediaQuery() hook: https://mui.com/components/use-media-query/,
   *  to know more about what values can be passed to this hook.
   *  ! Do not change this value unless you know what you are doing. It can break the template.
   */
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

  return (
    <VerticalLayout
      hidden={hidden}
      verticalNavItems={VerticalNavItems()} // Navigation Items
      currentUser={currentUser}
      verticalAppBarContent={(
        props // AppBar Content
      ) => (
        <CustomAppBar
          hidden={hidden}
          toggleNavVisibility={props.toggleNavVisibility}
          currentUser={currentUser}
        />
      )}
    >
      {children}
    </VerticalLayout>
  );
};

// export const getLayout = page => <UserLayout>{page}</UserLayout>

export default UserLayout;