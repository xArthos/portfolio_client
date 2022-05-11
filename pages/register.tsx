// Modules
import React from 'react';
import Image from 'material-ui-image';
import Router from 'next/router';
import SwipeableViews from 'react-swipeable-views';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

// UI
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

// Components
import Section from '../components/Section';
import Wrapper from '../components/Wrapper';
import TabPanel from '../components/TabPanel';
import FormikRadio from '../components/formik/FormikRadio';
import FormikTextField from '../components/formik/FormikTextField';

// Icons
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import { StepIconProps } from '@mui/material/StepIcon';

// Utils
import validateEmail from '../utils/validateEmail';

// Apollo
import withApollo from '../lib/withApollo';
import { login } from '../lib/utils/userDataUtils';
import { areRequired } from '../utils/validation';


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
    ownerState: { completed?: boolean; active?: boolean };
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
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

const ColorlibStepIcon = (props: StepIconProps) => {
    const { active, completed, className } = props;

    // Icons to show
    const icons: { [index: string]: React.ReactElement } = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
};

const CustomizedSteppers = ({ activeStep = 2, steps = ['Account Data', 'Personal Data', 'Check'] }) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={4}>
            <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};























const useStyles = makeStyles(({ palette }) => ({
    register: {
        background: `-webkit-linear-gradient(left, #3931af, #00c6ff)`,
        margin: 125,
        padding: '3%'
    },
    registerLeft: {
        textAlign: 'center',
        color: '#fff',
        marginTop: '4%',
        '& img': {
            // marginTop: '15%',
            // marginBottom: '5%',
            // width: '25%',
            '-webkit-animation': 'mover 2s infinite alternate',
            animation: 'mover 1s infinite alternate'
        },
        '& p': {
            fontWeight: 'lighter',
            padding: '12%',
            marginTop: '-9%'
        }
    },
    registerRight: {
        background: '#f8f9fa',
        borderTopLeftRadius: '10% 50%',
        borderBottomLeftRadius: '10% 50%',
        paddingLeft: 85,
        '& .nav-tabs': {
            marginTop: '3%',
            border: 'none',
            background: '#0062cc',
            borderRadius: 35,
            width: ' 28%',
            float: 'right',
            '& .nav-item': {
                '-ms-flex-preferred-size': 0,
                flexBasis: 0,
                '-ms-flex-positive': 1,
                flexGrow: 1,
                textAlign: 'center',
                marginBottom: -1,
                '& .nav-link': {
                    width: 100,
                    color: '#0062cc',
                    border: '2px solid #0062cc',
                    borderTopLeftRadius: 35,
                    borderBottomLeftRadius: 35
                }
            }
        },
        '& .nav-tabs .nav-link': {
            padding: '2%',
            height: 34,
            fontWeight: 600,
            color: '#fff',
            borderTopRightRadius: 35,
            borderBottomRightRadius: 35
        },
        '& .nav-tabs .nav-link:hover': {
            border: 'none'
        },
        '& .nav-tabs .nav-link.active': {
            width: 100,
            color: '#0062cc',
            border: '2px solid #0062cc',
            borderTopLeftRadius: 35,
            borderBottomLeftRadius: 35
        }
    },
    submitButton: {
        border: 'none',
        borderRadius: '1.5rem',
        padding: '2%',
        width: '60%',
        background: '#f8f9fa',
        fontWeight: 'bold',
        color: '#383d41',
        marginTop: '30%',
        marginBottom: '3%',
        cursor: 'pointer'
    },
    tabPanel: {
        float: 'right',
        marginTop: '3%',
        borderRadius: '1.5rem',
        background: '#0062cc',
        marginRight: 20,
        width: 'fit-content',
        padding: 3,
        minHeight: 15,
        maxHeight: 35
    },
    appBar: {
        alignItems: 'end'
    },
    tabSelected: {
        background: 'black',
        borderRadius: 35,
        borderBottom: 'none'
    },
    tabScroller: {
        position: 'unset'
    },
    tabHeight: {
        maxHeight: 29,
        minHeight: 29
    },
    '@-webkit-keyframes mover': {
        '0%': {
            transform: 'translateY(0)'
        },
        '100%': {
            transform: 'translateY(-20px)'
        }
    },
    '@keyframes mover': {
        '0%': {
            transform: 'translateY(0)'
        },
        '100%': {
            transform: 'translateY(-20px)'
        }
    }
}));

interface FormikRegisterError {
    email?: string;
    username?: string;
    password: string;
    repeatPassword: string;
}

export default withApollo(({ currentUser, refetchCurrentUser, loadingCurrentUser, colorModeContext }) => {
    const classes = useStyles();

    // Hooks
    const [step, setStep] = React.useState(0);
    const [value, setValue] = React.useState(0);

    // Apollo - Mutations
    const [logIn, { loading }] = useMutation(login);

    // Handlers
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };
    const handleChangeStep = (event: React.SyntheticEvent, newValue: number) => { setStep(newValue); };

    const formik = useFormik({
        onSubmit: async (values, { setFieldError }) => {
            try {
                const { data: { logIn: login } } = await logIn({
                    variables: values
                });

                if (login)
                    localStorage.setItem('devArthosPortfolio', login);
                refetchCurrentUser();
                Router.push(
                    '/',
                    `/`
                );
            } catch (e) {
                console.error(e);
                setFieldError('password', 'Wrong credentials.');
            };
        },
        validate: values => {
            const errors: FormikRegisterError = { email: '', password: '', username: '', repeatPassword: '' };
            areRequired(values, errors, ['email', 'password']);
            if (validateEmail(values.username)) errors.username = 'Don\'t use email for username';
            if (!validateEmail(values.email)) errors.email = 'Invalid email address';
            if ((values.password !== values.repeatPassword) && values.repeatPassword !== '') errors.repeatPassword = 'Password doesn\'t match';
            else if (values.password.length < 5) errors.password = 'To short';
            else if (values.password.length > 40) errors.password = 'To long';
            return errors;
        },
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            gender: 'male'
        }
    });

    const a11yProps = index => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tab-panel-${index}`,
        };
    };

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
    ];

    return (
        <Wrapper
            currentUser={currentUser}
            refetchCurrentUser={refetchCurrentUser}
            loadingCurrentUser={loadingCurrentUser}
            meta={{ title: 'Giampaolo\'s Portfolio | Sign-up' }}
        >
            <Section
                header=''
                subtitle={undefined}
                alignItems='flex-start'
                direction='column'
                containerClass={undefined}
                headerClass={undefined}
                gridClass={undefined}
                maxWidth=''
                justify=''
                spacing={undefined}
            >
                <Container className='register'>
                    <Grid container>
                        <Grid item md={3} className={classes.registerLeft}>
                            <Image color='transparent' src='/avatar.png' alt='' />

                            <Typography variant='h4' component='h3'>
                                Welcome
                            </Typography>

                            <Typography variant='body1' component='p'>
                                You are 30 seconds away from earning your own money!
                            </Typography>

                            <Button className={classes.submitButton} type='submit' >Submit</Button>
                        </Grid>

                        <Grid item md={9} className={classes.registerRight}>
                            <AppBar position='static' color='transparent' elevation={0} className={classes.appBar}>
                                <Tabs
                                    value={value}
                                    onChange={handleChangeTab}
                                    className={classes.tabPanel}
                                    textColor='secondary'
                                    aria-label='full width tabs example'
                                    classes={{ scroller: classes.tabScroller, flexContainer: classes.tabHeight }}
                                >
                                    <Tab
                                        classes={{ selected: classes.tabSelected, root: classes.tabHeight }}
                                        label='Users'
                                        {...a11yProps(0)}
                                    />

                                    <Tab
                                        classes={{ selected: classes.tabSelected, root: classes.tabHeight }}
                                        label='Recruiter'
                                        {...a11yProps(1)}
                                    />
                                </Tabs>
                            </AppBar>

                            <Typography variant='h4' component='h3' align='center'>
                                Welcome
                            </Typography>

                            <CustomizedSteppers activeStep={step} />

                            <form onSubmit={formik.handleSubmit}>
                                <SwipeableViews
                                    axis='x-reverse'
                                    index={value}
                                    onChangeIndex={handleChangeTab}
                                    slideStyle={{ overflow: 'hidden' }}
                                >
                                    {/* User */}
                                    <TabPanel value={value} index={0}>
                                        <SwipeableViews
                                            axis='x-reverse'
                                            index={step}
                                            onChangeIndex={handleChangeStep}
                                            slideStyle={{ overflow: 'hidden' }}
                                        >
                                            <TabPanel value={step} index={0}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={6}>
                                                        {/* Username */}
                                                        <FormikTextField
                                                            name='username'
                                                            label='Username'
                                                            props={formik}
                                                            fullWidth
                                                            autoFocus
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined}
                                                            helperTextProps={undefined}
                                                        />

                                                        {/* Email */}
                                                        <FormikTextField
                                                            name='email'
                                                            label='Email'
                                                            props={formik}
                                                            fullWidth
                                                            autoFocus
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined}
                                                            helperTextProps={undefined}
                                                        />

                                                        {/* Password */}
                                                        <FormikTextField
                                                            name='password'
                                                            label='Password'
                                                            type='password'
                                                            props={formik}
                                                            fullWidth
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined}
                                                            helperTextProps={undefined}
                                                        />

                                                        {/* Repeat Password */}
                                                        <FormikTextField
                                                            name='repeatPassword'
                                                            label='Repeat Password'
                                                            type='password'
                                                            props={formik}
                                                            fullWidth
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined}
                                                            helperTextProps={undefined}
                                                        />

                                                        {/* Gender */}
                                                        <FormikRadio
                                                            name='repeatPassword'
                                                            label='Repeat Password'
                                                            type='password'
                                                            props={formik}
                                                            fullWidth
                                                            radioRow
                                                            disabled={undefined}
                                                            radioClassName={undefined}
                                                            labelClass={undefined}
                                                            defaultValue={'male'}
                                                            options={genderOptions}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>

                                            <TabPanel value={step} index={1}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={6}>
                                                        {/* Business Email */}
                                                        <FormikTextField
                                                            name='email'
                                                            label='Business email'
                                                            props={formik}
                                                            fullWidth
                                                            autoFocus
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined} helperTextProps={undefined} />

                                                        {/* Password */}
                                                        <FormikTextField
                                                            name='password'
                                                            label='Password'
                                                            type='password'
                                                            props={formik}
                                                            fullWidth
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined} helperTextProps={undefined} />

                                                        {/* Business Email */}
                                                        <FormikTextField
                                                            name='email'
                                                            label='Business email'
                                                            props={formik}
                                                            fullWidth
                                                            autoFocus
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined} helperTextProps={undefined} />

                                                        {/* Password */}
                                                        <FormikTextField
                                                            name='password'
                                                            label='Password'
                                                            type='password'
                                                            props={formik}
                                                            fullWidth
                                                            placeholder={undefined}
                                                            disabled={undefined}
                                                            prefix={undefined}
                                                            suffix={undefined}
                                                            noUnderline={undefined} helperTextProps={undefined} />
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>
                                        </SwipeableViews>

                                        <Button onClick={(e) => handleChangeStep(e, step+1)}>Next</Button>
                                        <Button onClick={(e) => handleChangeStep(e, step-1)}>Previous</Button>

                                        <Grid container spacing={2}>
                                            <Grid item md={6}>
                                                {/* Username */}
                                                <FormikTextField
                                                    name='username'
                                                    label='Username'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Email */}
                                                <FormikTextField
                                                    name='email'
                                                    label='Email'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Password */}
                                                <FormikTextField
                                                    name='password'
                                                    label='Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Repeat Password */}
                                                <FormikTextField
                                                    name='repeatPassword'
                                                    label='Repeat Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Gender */}
                                                <FormikRadio
                                                    name='repeatPassword'
                                                    label='Repeat Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    radioRow
                                                    disabled={undefined}
                                                    radioClassName={undefined}
                                                    labelClass={undefined}
                                                    defaultValue={'male'}
                                                    options={genderOptions}
                                                />
                                            </Grid>

                                            <Grid item md={6}>
                                                {/* Business Email */}
                                                <FormikTextField
                                                    name='email'
                                                    label='Business email'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Password */}
                                                <FormikTextField
                                                    name='password'
                                                    label='Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Business Email */}
                                                <FormikTextField
                                                    name='email'
                                                    label='Business email'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />

                                                {/* Password */}
                                                <FormikTextField
                                                    name='password'
                                                    label='Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined}
                                                    helperTextProps={undefined}
                                                />
                                                <div className='form-group'>
                                                    <input type='email' className='form-control' placeholder='Your Email *' value='' />
                                                </div>
                                                <div className='form-group'>
                                                    <input type='text' minLength={10} maxLength={10} name='txtEmpPhone' className='form-control' placeholder='Your Phone *' value='' />
                                                </div>
                                                <div className='form-group'>
                                                    <select className='form-control'>
                                                        <option className='hidden' selected disabled>Please select your Sequrity Question</option>
                                                        <option>What is your Birthdate?</option>
                                                        <option>What is Your old Phone Number</option>
                                                        <option>What is your Pet Name?</option>
                                                    </select>
                                                </div>
                                                <div className='form-group'>
                                                    <input type='text' className='form-control' placeholder='Enter Your Answer *' value='' />
                                                </div>
                                                <input type='submit' className='btnRegister' value='Register' />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={value} index={1}>
                                        <Grid container spacing={2}>
                                            <Grid item md={6}>
                                                {/* Username */}
                                                <FormikTextField
                                                    name='username'
                                                    label='Username'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Email */}
                                                <FormikTextField
                                                    name='email'
                                                    label='Email'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Password */}
                                                <FormikTextField
                                                    name='password'
                                                    label='Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Repeat Password */}
                                                <FormikTextField
                                                    name='repeatPassword'
                                                    label='Repeat Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Gender */}
                                                <FormikRadio
                                                    name='repeatPassword'
                                                    label='Repeat Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    radioRow
                                                    disabled={undefined}
                                                    radioClassName={undefined}
                                                    labelClass={undefined}
                                                    defaultValue={undefined}
                                                    options={genderOptions}
                                                />
                                            </Grid>

                                            <Grid item md={6}>
                                                {/* Business Email */}
                                                <FormikTextField
                                                    name='email'
                                                    label='Business email'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Password */}
                                                <FormikTextField
                                                    name='password'
                                                    label='Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Business Email */}
                                                <FormikTextField
                                                    name='email'
                                                    label='Business email'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />

                                                {/* Password */}
                                                <FormikTextField
                                                    name='password'
                                                    label='Password'
                                                    type='password'
                                                    props={formik}
                                                    fullWidth
                                                    placeholder={undefined}
                                                    disabled={undefined}
                                                    prefix={undefined}
                                                    suffix={undefined}
                                                    noUnderline={undefined} helperTextProps={undefined} />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>
                                </SwipeableViews>
                            </form>
                        </Grid>
                    </Grid>
                </Container>
            </Section>
        </Wrapper>
    );
});