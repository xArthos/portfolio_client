// Modules
import React from 'react';

// UI
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// Icons
import Check from '@mui/icons-material/Check';
import { StepIconProps } from '@mui/material/StepIcon';

const useStyles = makeStyles(() => ({
    fullWidth: {
        width: '100%'
    }
}));

// Stepper Component
const CustomizedSteppers = ({
    errorStep,
    activeStep = 2,
    steps = ['Account Data', 'Personal Data', 'Check'],
    icons,
    iconStep
}) => {
    const classes = useStyles();

    const isStepFailed = (step: number) => {
        return step === parseInt(errorStep); // <--- To change with an error handler function
    };

    // Stepper Simple Version Settings
    const QontoConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 10,
            left: 'calc(-50% + 16px)',
            right: 'calc(50% + 16px)'
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#784af4'
            }
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                borderColor: '#784af4'
            }
        },
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderTopWidth: 3,
            borderRadius: 1
        }
    }));

    const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(
        ({ theme, ownerState }) => ({
            color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
            display: 'flex',
            height: 22,
            alignItems: 'center',
            ...(ownerState.active && {
                color: '#784af4'
            }),
            '& .QontoStepIcon-completedIcon': {
                color: '#784af4',
                zIndex: 1,
                fontSize: 18
            },
            '& .QontoStepIcon-circle': {
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: 'currentColor'
            }
        })
    );

    const QontoStepIcon = (props: StepIconProps) => {
        const { active, completed, className } = props;

        return (
            <QontoStepIconRoot ownerState={{ active }} className={className}>
                {completed ? (
                    <Check className="QontoStepIcon-completedIcon" />
                ) : (
                    <div className="QontoStepIcon-circle" />
                )}
            </QontoStepIconRoot>
        );
    };

    // Stepper Icons Settings
    const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
        [`&.${stepConnectorClasses.alternativeLabel}`]: {
            top: 22
        },
        [`&.${stepConnectorClasses.active}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
            }
        },
        [`&.${stepConnectorClasses.completed}`]: {
            [`& .${stepConnectorClasses.line}`]: {
                backgroundImage:
                    'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)'
            }
        },
        [`& .${stepConnectorClasses.line}`]: {
            height: 3,
            border: 0,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
            borderRadius: 1
        }
    }));

    const ColorlibStepIconRoot = styled('div')<{
        ownerState: { completed?: boolean; active?: boolean, error?: boolean };
    }>(({ theme, ownerState }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        ...(ownerState.active && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
        }),
        ...(ownerState.completed && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        }),
        ...(ownerState.error && {
            backgroundImage:
                'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
            boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)'
        }),
    }));

    const ColorlibStepIcon = (props: StepIconProps) => {
        const { active, completed, className, error } = props;

        // // Icons to show
        // const icons: { [index: string]: React.ReactElement } = {
        //     1: !error ? <SettingsIcon /> : <ReportGmailerrorredIcon />,
        //     2: !error ? <GroupAddIcon /> : <ReportGmailerrorredIcon />,
        //     3: !error ? <VideoLabelIcon /> : <ReportGmailerrorredIcon />
        // };

        return (
            <ColorlibStepIconRoot ownerState={{ completed, active, error }} className={className}>
                {icons[String(props.icon)]}
            </ColorlibStepIconRoot>
        );
    };

    return (
        <Stack className={classes.fullWidth} spacing={4}>
            {
                iconStep ?
                    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label, index) => {
                            const labelProps: {
                                optional?: React.ReactNode;
                                error?: boolean;
                            } = {};

                            if (isStepFailed(index)) {
                                // labelProps.optional = (
                                //     <Typography variant="caption" color="error">
                                //         Alert message
                                //     </Typography>
                                // );
                                labelProps.error = true;
                            };

                            return (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={ColorlibStepIcon} {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    :
                    <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                        {steps.map((label, index) => {
                            const labelProps: {
                                optional?: React.ReactNode;
                                error?: boolean;
                            } = {};

                            if (isStepFailed(index)) {
                                // labelProps.optional = (
                                //     <Typography variant="caption" color="error">
                                //         Alert message
                                //     </Typography>
                                // );
                                labelProps.error = true;
                            };

                            return (
                                <Step key={label}>
                                    <StepLabel StepIconComponent={QontoStepIcon} {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
            }
        </Stack>
    );
};

export default CustomizedSteppers;