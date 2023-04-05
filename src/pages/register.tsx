// ** Modules
import React from 'react';
import Image from 'mui-image';
import Router from 'next/router';
import SwipeableViews from 'react-swipeable-views-react-18-fix';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

// ** UI
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { useTheme, keyframes } from '@mui/system';

// ** Components
import Section from '../components/Section';
import Wrapper from '../components/Wrapper';
import Stepper from '../components/Stepper';
import TabPanel from '../components/TabPanel';
import FormikRadio from '../components/formik/FormikRadio';
import FormikSelect from '../components/formik/FormikSelect';
import FormikTextField from '../components/formik/FormikTextField';

// ** Icons
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

// ** Utils
import validateEmail from '../utils/validateEmail';
import { areRequired } from '../utils/validation';

// ** Apollo
import withApollo from '../lib/withApollo';
import { login } from '../lib/utils/userDataUtils';

// ** Interfaces
interface FormikRegisterError {
    email?: string;
    username?: string;
    password: string;
    repeatPassword: string;
};

const mover = keyframes`
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-20px);
    }
`;

const Register = (({ currentUser, refetchCurrentUser, loadingCurrentUser, errorCurrentUser }) => {
    const theme = useTheme();

    // ** Hooks
    const [step, setStep] = React.useState(0);
    const [value, setValue] = React.useState(0);
    const [stepError, setStepError]: any = React.useState('none');

    // ** Apollo - Mutations
    const [logIn, { loading }] = useMutation(login);

    // ** Handlers
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => { setValue(newValue); };
    const handleChangeStep = (event: React.SyntheticEvent, newValue: number) => {
        if (formik.errors.email !== '' || formik.errors.password !== '' || formik.errors.username !== '' || formik.errors.repeatPassword !== '') {
            setStepError(0);
        } else {
            setStep(newValue);
            setStepError(undefined);
        };
    };

    const formik = useFormik({
        onSubmit: async (values, { setFieldError }) => {
            try {
                const { data: { logIn: login } } = await logIn({
                    variables: values
                });

                if (login) localStorage.setItem('devArthosPortfolio', login);

                refetchCurrentUser();
                Router.push( '/', `/` );
            } catch (e) {
                console.error(e);
                setFieldError('password', 'Wrong credentials.');
            };
        },
        validate: values => {
            const errors: FormikRegisterError = { email: '', password: '', username: '', repeatPassword: '' };

            areRequired(values, errors, ['email', 'password', 'username', 'repeatPassword']);
            if (values.username !== '' && validateEmail(values.username)) errors.username = 'Don\'t use email for username';
            if (values.email !== '' && !validateEmail(values.email)) errors.email = 'Invalid email address';

            if ((values.password !== values.repeatPassword) && values.repeatPassword !== '') errors.repeatPassword = 'Password doesn\'t match';
            if (values.password !== '' && values.password.length < 5) errors.password = 'To short';
            if (values.password.length > 40) errors.password = 'To long';

            if (formik.errors.email === '' && formik.errors.password === '' && formik.errors.username === '' && formik.errors.repeatPassword === '') {
                setStepError(undefined);
            };

            return errors;
        },
        initialValues: {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            gender: 'male',
            firstName: '',
            surname: '',
            otherName: '',
            recoveryQuestion: '',
            recoveryQuestionAnswer: ''
        }
    });

    const a11yProps = (index: number) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tab-panel-${index}`
        };
    };

    const genderOptions = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' }
    ];

    const securityQuestions = [
        { label: 'Your elementary school?', value: 'q1' },
        { label: 'Your best friend name?', value: 'q2' },
        { label: 'Your first travel location?', value: 'q3' }
    ];

    // Steps to add to the stepper
    const steps = ['Account Data', 'Personal Data', 'Security', 'Check'];

    // Icons to show
    const icons: { [index: string]: React.ReactElement } = {
        1: stepError === 0 ? <ReportGmailerrorredIcon /> : <SettingsIcon />,
        2: stepError === 1 ? <ReportGmailerrorredIcon /> : <GroupAddIcon />,
        3: stepError === 2 ? <ReportGmailerrorredIcon /> : <VideoLabelIcon />,
        4: stepError === 3 ? <ReportGmailerrorredIcon /> : <VideoLabelIcon />
    };

    return (
        <Wrapper
            currentUser={currentUser}
            refetchCurrentUser={refetchCurrentUser}
            loadingCurrentUser={loadingCurrentUser}
            errorCurrentUser={errorCurrentUser}
            meta={{ title: 'Giampaolo\'s Portfolio | Sign-up' }}
            >
            <Section
                header=''
                subtitle={undefined}
                alignItems='flex-start'
                direction='column'
                containerClass={undefined}
                headerClass={undefined}
                gridClass={{
                    backgroundImage: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    // backgroundImage: `-webkit-linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    marginTop: '3%',
                    padding: '3%',
                    margin: 0,
                    maxWidth: '100%'
                }}
                maxWidth=''
                justify=''
                spacing={1}
            >
                {/* Left Side - Animation Avatar, Register/Login with 3rd Services, Switch Register/Login */}
                <Grid
                    item
                    sm={4}
                    md={3}
                    sx={{
                        textAlign: 'center',
                        color: '#fff',
                        marginTop: '4%',
                        padding: '0px !important',
                        '& img': {
                            // marginTop: '15%',
                            // marginBottom: '5%',
                            // width: '25%',
                            webkitAnimation: `${mover} 2s infinite alternate !important`,
                            animation: `${mover} 1s infinite alternate !important`
                        },
                        '& p': {
                            fontWeight: 'lighter',
                            padding: '12%',
                            marginTop: '-9%'
                        }
                    }}
                >
                    <Image bgColor='transparent' src='/avatar.png' alt='t' />

                    <Typography variant='h4' component='h3'>
                        Welcome
                    </Typography>

                    <Typography variant='body1' component='p'>
                        The login form is in development!
                    </Typography>

                    <Button
                        type='submit'
                        sx={{
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
                        }}
                    >
                        Submit
                    </Button>
                </Grid>

                {/* Right Side - Stepper, Register Form, Switch Registration Type */}
                <Grid
                    item
                    sm={8}
                    md={9}
                    sx={{
                        background: '#f8f9fa',
                        borderTopLeftRadius: '10% 50%',
                        borderBottomLeftRadius: '10% 50%',
                        paddingLeft: '85px !important',
                        paddingTop: '0px !important'
                    }}
                >
                    {/* Registration Type */}
                    <AppBar position='static' color='transparent' elevation={0} sx={{ 
                        alignItems: 'end',
                        '& .MuiTabs-root': {
                            float: 'right',
                            width: 'fit-content',
                            padding: '3px',
                            background: '#0062cc',
                            marginTop: '3%',
                            maxHeight: 35,
                            minHeight: 15,
                            marginRight: 20,
                            borderRadius: '1.5rem'
                        } }} component='div'>
                        <Tabs
                            value={value}
                            onChange={handleChangeTab}
                            textColor='secondary'
                            aria-label='full width tabs example'
                            sx={{
                                marginTop: '3%',
                                border: 'none',
                                background: '#0062cc',
                                borderRadius: 35,
                                width: ' 28%',
                                float: 'right',
                                marginRight: 20,
                                padding: 3,
                                '& .MuiTabs-flexContainer': {
                                    maxHeight: 29,
                                    minHeight: 29
                                },
                                '& .MuiTabs-indicator': {
                                    display: 'none'
                                },
                                '& .Mui-selected': {
                                    background: 'black',
                                    borderRadius: 35,
                                    borderBottom: 'none',
                                    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                                },
                                '& .MuiTab-root': {
                                    maxHeight: 29,
                                    minHeight: 29,
                                    msFlexPreferredSize: 0,
                                    flexBasis: 0,
                                    msFlexPositive: 1,
                                    flexGrow: 1,
                                    textAlign: 'center',
                                    marginBottom: -1
                                }
                            }}
                        >
                            <Tab label='Users' {...a11yProps(0)} />
                            <Tab label='Recruiter' {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>

                    <Typography variant='h4' component='h3' align='center' gutterBottom={true}>
                        Welcome
                    </Typography>

                    {/* Registration Stage Stepper */}
                    <Stepper iconStep steps={steps} activeStep={step} errorStep={stepError} icons={icons} />

                    {/* Form Data */}
                    <form onSubmit={formik.handleSubmit}>
                        {/* Step Tabs Switcher */}
                        <SwipeableViews
                            axis='x-reverse'
                            index={value}
                            onChangeIndex={handleChangeTab}
                            slideStyle={{ overflow: 'hidden' }}
                        >
                            {/* General User */}
                            <TabPanel value={value} index={0}>
                                {/* Form Tab Swapper */}
                                <SwipeableViews
                                    axis='x-reverse'
                                    index={step}
                                    onChangeIndex={handleChangeStep}
                                    slideStyle={{ overflow: 'hidden' }}
                                >
                                    {/* Step 1 - Account Data */}
                                    <TabPanel value={step} index={0}>
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} md={8}>
                                                {/* Username */}
                                                <FormikTextField
                                                    name='username'
                                                    label='Username'
                                                    props={formik}
                                                    fullWidth
                                                    autoFocus={false}
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
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    {/* Step 2 - Personal Data */}
                                    <TabPanel value={step} index={1}>
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} md={8}>
                                                {/* First Name */}
                                                <FormikTextField
                                                    name='firstName'
                                                    label='First Name'
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

                                                {/* Other Names */}
                                                <FormikTextField
                                                    name='otherNames'
                                                    label='Other Names'
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

                                                {/* Surname */}
                                                <FormikTextField
                                                    name='surname'
                                                    label='Surname'
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

                                                {/* Gender */}
                                                <FormikRadio
                                                    name='gender'
                                                    label='Gender'
                                                    props={formik}
                                                    fullWidth
                                                    radioRow
                                                    disabled={undefined}
                                                    radioClassName={undefined}
                                                    labelClass={undefined}
                                                    defaultValue={formik.values.gender}
                                                    options={genderOptions}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={step} index={2}>
                                        <Grid container spacing={2}>
                                            <Grid item md={5}>
                                                <FormikSelect
                                                    name='recoveryQuestion'
                                                    label='Recovery Question'
                                                    formikProps={formik}
                                                    disabled={undefined}
                                                    options={securityQuestions}
                                                    selectProps={undefined}
                                                />

                                                <FormikSelect
                                                    name='recoveryQuestion'
                                                    label='Recovery Question'
                                                    formikProps={formik}
                                                    disabled={undefined}
                                                    options={securityQuestions}
                                                    selectProps={undefined}
                                                />

                                                <FormikSelect
                                                    name='recoveryQuestion'
                                                    label='Recovery Question'
                                                    formikProps={formik}
                                                    disabled={undefined}
                                                    options={securityQuestions}
                                                    selectProps={undefined}
                                                />
                                            </Grid>

                                            <Grid item md={7}>
                                                {/* Answer */}
                                                <FormikTextField
                                                    name='recoveryQuestionAnswer'
                                                    label='Answer'
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

                                                {/* Answer */}
                                                <FormikTextField
                                                    name='recoveryQuestionAnswer'
                                                    label='Answer'
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

                                                {/* Answer */}
                                                <FormikTextField
                                                    name='recoveryQuestionAnswer'
                                                    label='Answer'
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
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <TabPanel value={step} index={3}>
                                        <Grid container spacing={2}>
                                            <Grid item sm={6} md={8}>
                                                <FormikSelect
                                                    name='recoveryQuestion'
                                                    label='Recovery Question'
                                                    formikProps={formik}
                                                    disabled={undefined}
                                                    options={securityQuestions}
                                                    selectProps={undefined}
                                                />

                                                {/* Answer */}
                                                <FormikTextField
                                                    name='recoveryQuestionAnswer'
                                                    label='Answer'
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

                                                <FormikSelect
                                                    name='recoveryQuestion'
                                                    label='Recovery Question'
                                                    formikProps={formik}
                                                    disabled={undefined}
                                                    options={securityQuestions}
                                                    selectProps={undefined}
                                                />

                                                {/* Answer */}
                                                <FormikTextField
                                                    name='recoveryQuestionAnswer'
                                                    label='Answer'
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
                                            </Grid>
                                        </Grid>
                                    </TabPanel>

                                    <input type='submit' className='btnRegister' value='Register' />
                                </SwipeableViews>

                                <Grid container spacing={2} sx={{ paddingLeft: '16px', paddingTop: '16px' }} >
                                    <Button onClick={(e) => handleChangeStep(e, step - 1)} disabled={step === 0}>Previous</Button>
                                    <Button onClick={(e) => handleChangeStep(e, step + 1)} disabled={step === 3}>Next</Button>
                                </Grid>

                                {/* <Grid container spacing={2}>
                                            <Grid item md={6}>
                                                {/* Username */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Email */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Password */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Repeat Password */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Gender */}
                                {/* <FormikRadio
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
                                                /> */}
                                {/* </Grid> */}

                                {/* <Grid item md={6}> */}
                                {/* Business Email */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Password */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Business Email */}
                                {/* <FormikTextField
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
                                                /> */}

                                {/* Password */}
                                {/* <FormikTextField
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
                                        </Grid> */}
                            </TabPanel>

                            {/* Recruiter User */}
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
                                            noUnderline={undefined}
                                            helperTextProps={undefined} />

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
                                            helperTextProps={undefined} />

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
                                            helperTextProps={undefined} />

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
                                            helperTextProps={undefined} />

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
                                            noUnderline={undefined}
                                            helperTextProps={undefined} />

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
                                            helperTextProps={undefined} />

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
                                            helperTextProps={undefined} />

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
                                            helperTextProps={undefined} />
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </SwipeableViews>
                    </form>
                </Grid>
            </Section>
        </Wrapper>
    );
});

export default withApollo(Register);