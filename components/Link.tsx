// Modules
import PropTypes from 'prop-types';
import NextLink, { LinkProps } from 'next/link';
import { HTMLProps, FC } from 'react';

// UI
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(({ palette }) => ({
    link: {
        textDecoration: 'none',
        color: palette.primary.main,
        transition: 'color 0.3s ease',
        '&:hover': {
            color: palette.secondary.main,
            cursor: 'pointer'
        }
    }
}));

const Link: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = ({
    as, children, href, replace, scroll, shallow, passHref, ...rest
}) => {
    const classes = useStyles();

    return (
        <NextLink
            as={as}
            href={href}
            passHref={passHref}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
        >
            <a {...rest} className={classes.link}>
                {children}
            </a>
        </NextLink>
    )
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