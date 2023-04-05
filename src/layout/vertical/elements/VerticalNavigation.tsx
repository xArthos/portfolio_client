// ** Modules
import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

// ** UI
import List from '@mui/material/List';
import Box, { BoxProps } from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';

// ** Types
import { VerticalNavItemsType } from '../../../types/verticalNavItem';

// ** Components
import CustomDrawer from '../../../components/muiCustom/CustomDrawer';
import VerticalNavItems from './VerticalNavItems';
import VerticalNavHeader from './VerticalNavHeader';

// ** Utils
import hexToRGBA from '../../../utils/hexToRGBA';

// ** Interfaces
interface Props {
    open: boolean;
    hidden: boolean;
    navWidth: number;
    children: React.ReactNode;
    navVisible: boolean;
    toggleNavVisibility: () => void;
    setNavVisible: (value: boolean) => void;
    verticalNavItems?: VerticalNavItemsType;
    verticalNavMenuContent?: (props?: any) => React.ReactNode;
    afterVerticalNavMenuContent?: (props?: any) => React.ReactNode;
    beforeVerticalNavMenuContent?: (props?: any) => React.ReactNode;
};

// ** Styled Components
const StyledBoxForShadow = styled(Box)<BoxProps>({
    top: 60,
    left: -8,
    zIndex: 2,
    height: 75,
    display: 'none',
    position: 'absolute',
    pointerEvents: 'none',
    width: 'calc(100% + 15px)',
    '&.d-block': {
        display: 'block'
    }
});

const Navigation = (props: Props) => {
    // ** Props
    const {
        hidden,
        afterVerticalNavMenuContent,
        beforeVerticalNavMenuContent,
        verticalNavMenuContent: userVerticalNavMenuContent
    } = props;

    // ** States
    const [groupActive, setGroupActive] = React.useState<string[]>([]);
    const [currentActiveGroup, setCurrentActiveGroup] = React.useState<string[]>([]);

    // ** Ref
    const shadowRef = React.useRef(null);

    // ** Hooks
    const theme = useTheme();

    // ** Fixes Navigation InfiniteScroll
    const handleInfiniteScroll = (ref: HTMLElement) => {
        if (ref) {
            // @ts-ignore
            ref._getBoundingClientRect = ref.getBoundingClientRect

            ref.getBoundingClientRect = () => {
                // @ts-ignore
                const original = ref._getBoundingClientRect()

                return { ...original, height: Math.floor(original.height) }
            };
        };
    };

    // ** Scroll Menu
    const scrollMenu = (container: any) => {
        container = hidden ? container.target : container
        if (shadowRef && container.scrollTop > 0) {
            // @ts-ignore
            if (!shadowRef.current.classList.contains('d-block')) {
                // @ts-ignore
                shadowRef.current.classList.add('d-block');
            }
        } else {
            // @ts-ignore
            shadowRef.current.classList.remove('d-block');
        };
    };

    const ScrollWrapper = hidden ? Box : PerfectScrollbar;

    return (
        <CustomDrawer {...props}>
            <VerticalNavHeader {...props} />

            <StyledBoxForShadow
                ref={shadowRef}
                sx={{
                    background: `linear-gradient(${theme.palette.background.default} 40%,${hexToRGBA(
                        theme.palette.background.paper,
                        0.1
                    )} 95%,${hexToRGBA(theme.palette.background.paper, 0.05)})`
                }}
            />

            <Box sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                {/* @ts-ignore */}
                <ScrollWrapper
                    containerRef={(ref: any) => handleInfiniteScroll(ref)}
                    {...(hidden
                        ? {
                            onScroll: (container: any) => scrollMenu(container),
                            sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' }
                        }
                        : {
                            options: { wheelPropagation: false },
                            onScrollY: (container: any) => scrollMenu(container)
                        })}
                >
                    {beforeVerticalNavMenuContent ? beforeVerticalNavMenuContent(props) : null}

                    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        {userVerticalNavMenuContent ? (
                            userVerticalNavMenuContent(props)
                        ) : (
                            <List className='nav-items' sx={{ transition: 'padding .25s ease', pr: 4.5 }}>
                                <VerticalNavItems
                                    groupActive={groupActive}
                                    setGroupActive={setGroupActive}
                                    currentActiveGroup={currentActiveGroup}
                                    setCurrentActiveGroup={setCurrentActiveGroup}
                                    {...props}
                                />
                            </List>
                        )}
                    </Box>
                </ScrollWrapper>
            </Box>

            {afterVerticalNavMenuContent ? afterVerticalNavMenuContent(props) : null}
        </CustomDrawer>
    );
};

export default Navigation;