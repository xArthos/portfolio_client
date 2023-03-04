// Modules
import React from 'react';
import Router from 'next/router';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

// UI
import Grid from '@mui/material/Grid';

// Components
import Link from '../components/Link';
import Alert from '@mui/material/Alert';
import Wrapper from '../components/Wrapper';
import Section from '../components/Section';
import CustomButton from '../components/CustomButton';
import FormikTextField from '../components/formik/FormikTextField';

// Utils
import validateEmail from '../utils/validateEmail';

// Apollo
import withApollo from '../lib/withApollo';
import { login } from '../lib/utils/userDataUtils';
import { areRequired } from '../utils/validation';

const Login = ({ currentUser, loadingCurrentUser, refetchCurrentUser }) => {
    // Apollo - Mutations
    const [logIn, { loading, data }] = useMutation(login);

    const formik = useFormik({
        onSubmit: async (values, { setFieldError }) => {
            try {
                const { data: { logIn: login } } = await logIn({
                    variables: values
                });

                if (login) {
                    localStorage.setItem('devArthosPortfolio', login);
                    refetchCurrentUser();
                    Router.push(
                        '/',
                        `/`
                    );
                };
            } catch (error) {
                console.error(error.graphQLErrors);
                if (error.message === 'User not found') {
                    setFieldError('password', ' ');
                    setFieldError('email', ' ');
                };
            };
        },
        // validate: values => {
        //     const errors: { email: string, password: string } = { email: '', password: '' };
        //     areRequired(values, errors, ['email', 'password']);
        //     if (!validateEmail(values.email)) errors.email = 'Invalid email address.';
        //     // else if (values.password.length < 5) errors.password = 'To short.';
        //     // else if (values.password.length > 40) errors.password = 'To long.';
        //     return errors;
        // },
        initialValues: {
            email: '',
            password: ''
        }
    });

    return (
        <Wrapper currentUser={currentUser} refetchCurrentUser={refetchCurrentUser} loadingCurrentUser={loadingCurrentUser}>
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

                <Grid item xs={12}>
                    <Alert severity='error'>This is an error alert — check it out!</Alert>
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

export default withApollo(Login);