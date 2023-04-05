// ** Modules
import React from 'react';

// ** UI
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ** Interfaces
interface ProfileCardProps {
    header: string;
    subtitle: React.ReactNode;
    containerClass: object;
    headerClass: object;
    gridClass: object;
    children: React.ReactNode;
    direction: string;
    maxWidth: string;
    alignItems: string;
    justify: string;
    spacing: number;
};

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
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                ...containerClass
            }}
        >
            {header ?
                <React.Fragment>
                    <Typography variant='h2' sx={{ ...headerClass }}>
                        {header}
                    </Typography>

                    {subtitle ?
                        <Typography variant='subtitle1' sx={{ marginBottom: 35 }}>
                            {subtitle}
                        </Typography> : null
                    }
                </React.Fragment>
                : null}

            <Grid container spacing={spacing} justifyContent={justify} alignItems={alignItems} sx={{ ...gridClass }}>
                {children}
            </Grid>
        </Container>
    );
};

export default Section;