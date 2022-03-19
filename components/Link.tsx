// Modules
import clsx from 'clsx';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import React, { FC, useRef } from 'react';
import { withRouter } from 'next/router';

// UI
import MuiLink from '@mui/material/Link';

interface ICustomRoute {
    as: string,
    href: string,
    prefetch: any,
    color: string,
    children: Element;
}

const NextComposed: FC<ICustomRoute> = React.forwardRef((props, ref: any) => {
    const { as, href, prefetch, ...other } = props;
    const node = useRef<HTMLAnchorElement>(ref);

    return (
        <NextLink href={href} prefetch={prefetch} as={as}>
            <a ref={node} {...other} />
        </NextLink>
    );
});

const Link = (props) => {
    const {
        activeClassName = 'active',
        router,
        className: classNameProps,
        innerRef,
        naked,
        ...other
    } = props;

    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === props.href && activeClassName,
    });

    if (naked) return <NextComposed className={className} ref={innerRef} {...other} />;

    return (<MuiLink component={NextComposed} className={className} ref={innerRef} underline="none" {...other} />);
};

NextComposed.propTypes = {
    as: PropTypes.string,
    href: PropTypes.string,
    prefetch: PropTypes.bool,
};

Link.propTypes = {
    children: PropTypes.element,
    activeClassName: PropTypes.string,
    as: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    naked: PropTypes.bool,
    onClick: PropTypes.func,
    prefetch: PropTypes.bool,
    router: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired
};

const RouterLink = withRouter(Link);

export default React.forwardRef((props, ref) => (
    <RouterLink {...props} innerRef={ref} />
));