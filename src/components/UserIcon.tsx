// ** Modules
import React from 'react';

// ** UI
import { SvgIconProps } from '@mui/material';

// ** Interfaces
interface UserIconProps {
    iconProps?: SvgIconProps;
    icon: string | React.ReactNode;
};

const UserIcon = (props: UserIconProps) => {
    // ** Props
    const { icon, iconProps } = props;

    const IconTag = icon;

    let styles: object;

    /* styles = {
      color: 'red',
      fontSize: '2rem'
    } */

    // @ts-ignore
    return <IconTag {...iconProps} style={{ ...styles }} />
}

export default UserIcon;