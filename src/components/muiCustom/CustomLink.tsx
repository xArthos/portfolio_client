// ** Modules
import PropTypes from 'prop-types';
import NextLink, { LinkProps } from 'next/link';
import { HTMLProps, FC } from 'react';

// ** UI
import { styled } from '@mui/system';

// ** Styled Components
const MuiLink = styled('a')(({ theme }) => ({
    textDecoration: 'none',
    color: theme.palette.primary.main,
    transition: 'color 0.3s ease',
    '&:hover': {
        color: theme.palette.secondary.main,
        cursor: 'pointer'
    }
}));

const Link: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = ({
    as, children, href, replace, scroll, shallow, passHref, target, color, ...props
}) => {
    return (
        <NextLink
            as={as}
            href={href}
            passHref={passHref}
            color={color}
            legacyBehavior
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            target={target}
        >
            <MuiLink {...props}>
                {children}
            </MuiLink>
        </NextLink>
    );
};

Link.displayName = 'Link';

Link.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    as: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool
};

export default Link;