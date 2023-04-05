// ** Modules
import React from 'react';
import Router from 'next/router';
import { useFormik } from 'formik';
import { ApolloQueryResult, OperationVariables, useMutation } from '@apollo/react-hooks';

// ** UI
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';

// ** Components
import Link from '../components/muiCustom/CustomLink';
import Wrapper from '../components/Wrapper';
import Section from '../components/Section';
import CustomButton from '../components/muiCustom/CustomButton';
import FormikTextField from '../components/formik/FormikTextField';

// ** Utils
import validateEmail from '../utils/validateEmail';
import { areRequired } from '../utils/validation';

// ** Apollo
import withApollo from '../lib/withApollo';
import { login } from '../lib/utils/userDataUtils';

// ** Types
import type { NextPageWithLayout } from '../types/page';

// ** Interfaces
interface Test {
    currentUser: any;
    loadingCurrentUser: boolean;
    refetchCurrentUser: (variables?: Partial<OperationVariables>) => Promise<ApolloQueryResult<any>>;
    errorCurrentUser: any;
};

const meta = { title: 'Login - Giampaolo\'s Portfolio' };

const Login: NextPageWithLayout<Test> = ({ currentUser, loadingCurrentUser, refetchCurrentUser, errorCurrentUser }) => {
    // Redirect if user is already logged
    if (currentUser) {
        refetchCurrentUser();
        Router.push(
            '/user/dashboard', // The path where the user is redirected
            `/user/dashboard` // The path showed in the browser path
        );
    };

    // Apollo - Mutations
    const [logIn, { loading, data, error }] = useMutation(login, { errorPolicy: 'all' });

    const formik = useFormik({
        onSubmit: async (values, { setFieldError, resetForm }) => {
            try {
                const { data: { logIn: loginToken } } = await logIn({
                    variables: values
                });

                if (loginToken) {
                    localStorage.setItem('devArthosPortfolio', loginToken);
                    refetchCurrentUser();

                    if (!errorCurrentUser) {
                        resetForm();
                        Router.push('/user/dashboard');
                    };
                };
            } catch (tryError) {
                if (tryError.message === 'User not found') {
                    setFieldError('email', 'This e-mail is not registered.');
                };
            };
        },
        validate: values => {
            const errors: any = {};
            areRequired(values, errors, ['email', 'password']);
            if (!validateEmail(values.email)) {
                errors.email = 'Invalid email address.';
            };

            // else if (values.password.length < 5) errors.password = 'To short.';
            // else if (values.password.length > 40) errors.password = 'To long.';

            return errors;
        },
        // validateOnMount: false,
        // validateOnChange: false,
        // validateOnBlur: false,
        initialValues: {
            email: '',
            password: ''
        }
    });

    return (
        <Wrapper
            currentUser={currentUser}
            loadingCurrentUser={loadingCurrentUser}
            refetchCurrentUser={refetchCurrentUser}
            errorCurrentUser={errorCurrentUser}
            meta={meta}
        >
            <Section
                header='Login'
                alignItems='flex-start'
                direction='column'
                subtitle={undefined}
                containerClass={undefined}
                headerClass={undefined}
                gridClass={undefined}
                maxWidth={''}
                justify={''}
                spacing={undefined}
            >
                <Grid item xs={12} sm={6} md={5}>
                    <form onSubmit={formik.handleSubmit}>
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

                        <CustomButton
                            type='submit'
                            size='small'
                            loading={loading}
                            successful={!!data}
                            disabled={!(formik.isValid && formik.dirty)}
                            props={undefined}
                            defaultComponent={'button'}
                            marginTop={20}
                        >
                            Login
                        </CustomButton>
                    </form>
                </Grid>

                <Grid item xs={12} sm={6} md={5}>
                    {
                        error ?
                            <Grid item xs={12}>
                                <Alert severity='error'>{
                                    error.message === 'Failed to fetch'
                                        ? 'Server is temporary unavailable'
                                        : error.message
                                }</Alert>
                            </Grid>
                            : errorCurrentUser?.graphQLErrors.length > 0 ?
                                <Grid item xs={12}>
                                    <Alert severity='error'>
                                        The account data contains an error, please contact the support.
                                    </Alert>
                                </Grid>
                                : <Grid item xs={12} />
                    }
                </Grid>

                <Grid item xs={12}>
                    <Link href='/reset-password' color='inherit'>
                        Forgot your password?
                    </Link>
                </Grid>

                <Grid item xs={12}>
                    <Link href='/sign-up' color='inherit'>
                        Sign up?
                    </Link>
                </Grid>
            </Section>
        </Wrapper>
    );
};

// ? Not needed for the moment
// Login.getInitialProps = async ({ query }) => {
//     return { query };
// };

// ? Alternative to wrapper, but needs configuration
// Login.getLayout = function getLayout(page: ReactElement) {
//     return (
//         <UserLayout>
//             {page}
//         </UserLayout>
//     )
// };

export default withApollo(Login);