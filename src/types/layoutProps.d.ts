// ** Modules
import React from 'react';
import { SvgIconComponent } from "@material-ui/icons";

export type ContentWidth = 'full' | 'boxed';

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type NavLink = {
    path?: string;
    title: string;
    action?: string;
    subject?: string;
    disabled?: boolean;
    badgeContent?: string;
    externalLink?: boolean;
    openInNewTab?: boolean;
    icon?: string | string[] | React.ReactNode | SvgIconComponent;
    badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
};

export type NavSectionTitle = {
    sectionTitle: string;
    action?: string;
    subject?: string;
};

export type VerticalNavItemsType = (NavLink | NavSectionTitle)[];

export type LayoutProps = {
    hidden: boolean;
    children: React.ReactNode;
    verticalNavItems?: VerticalNavItemsType;
    scrollToTop?: (props?: any) => React.ReactNode;
    footerContent?: (props?: any) => React.ReactNode;
    verticalAppBarContent?: (props?: any) => React.ReactNode;
    verticalNavMenuContent?: (props?: any) => React.ReactNode;
    verticalNavMenuBranding?: (props?: any) => React.ReactNode;
    afterVerticalNavMenuContent?: (props?: any) => React.ReactNode;
    beforeVerticalNavMenuContent?: (props?: any) => React.ReactNode;
    currentUser?: object;
};

export type BlankLayoutProps = {
    children: ReactNode;
};