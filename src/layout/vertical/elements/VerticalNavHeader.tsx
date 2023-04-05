// ** Modules
import React from 'react';
import Image from 'next/image';

// ** Components
import Link from '../../../components/muiCustom/CustomLink';

// ** UI
import Box, { BoxProps } from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

// ** Media
import ArthosLogo from '../../../media/logo/logo-m.svg';

// ** Interfaces
interface Props {
  hidden: boolean;
  toggleNavVisibility: () => void;
  verticalNavMenuBranding?: (props?: any) => React.ReactNode;
};

// ** Styled Components
const MenuHeaderWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}));

const HeaderTitle = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}));

const StyledLink = styled('div')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
});

const VerticalNavHeader = (props: Props) => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  // ** Hooks
  const theme = useTheme();

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href='/' passHref legacyBehavior>
          <StyledLink>
          <Image
                  src={`${ArthosLogo.src}`}
                  alt='Logo'
                  height={65}
                  width={60}
                />
            <HeaderTitle variant='h6' sx={{ ml: 3 }}>
                
            </HeaderTitle>
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;