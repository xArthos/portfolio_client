// ** Modules
import React from 'react';

// ** UI
import Box from '@mui/material/Box';

// ** Interfaces
interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
};

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </Box>
    );
};

export default TabPanel;