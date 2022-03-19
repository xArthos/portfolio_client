// Modules
import clsx from 'clsx';
import React from 'react';

// UI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        paddingBottom: 50,
        marginBottom: 25,
        flexDirection: 'column'
    },
    headerContainer: {
        marginBottom: 35
    }
}));

interface ProfileCardProps {
    header: any
    subtitle: any
    containerClass: any
    headerClass: any
    gridClass: any
    children: any
    direction: string
    maxWidth: string 
    alignItems: string
    justify: string
    spacing: any
}

const Section = ({
    header,
    subtitle,
    containerClass,
    headerClass,
    gridClass,
    children,
    direction = 'row',
    maxWidth = 'md',
    alignItems = 'center',
    justify = 'center',
    spacing = 3
}: ProfileCardProps) => {
    const classes = useStyles();

    return (
        <Container className={clsx(classes.container, containerClass)}>
            {header ?
                <>
                    <Typography variant="h2" className={headerClass}>
                        {header}
                    </Typography>

                    {subtitle ?
                        <Typography variant="subtitle1" className={classes.headerContainer}>
                            {subtitle}
                        </Typography> : null
                    }
                </>
                : null}

            <Grid container spacing={spacing} justifyContent={justify} alignItems={alignItems} className={gridClass}>
                {children}
            </Grid>
        </Container>
    );
};

export default Section;