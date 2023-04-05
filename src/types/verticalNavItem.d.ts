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
    settings: Settings;
    children: React.ReactNode;
    verticalNavItems?: VerticalNavItemsType;
    scrollToTop?: (props?: any) => React.ReactNode;
    saveSettings: (values: Settings) => void;
    footerContent?: (props?: any) => React.ReactNode;
    verticalAppBarContent?: (props?: any) => React.ReactNode;
    verticalNavMenuContent?: (props?: any) => React.ReactNode;
    verticalNavMenuBranding?: (props?: any) => React.ReactNode;
    afterVerticalNavMenuContent?: (props?: any) => React.ReactNode;
    beforeVerticalNavMenuContent?: (props?: any) => React.ReactNode;
};

export type BlankLayoutProps = {
    children: ReactNode;
};