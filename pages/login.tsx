// Modules
import React from 'react';
import Router from 'next/router';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

// UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// Components
import Link from '../components/Link';
// import Button from '../components/Button';
import Wrapper from '../components/Wrapper';
import Section from '../components/Section';
import FormikTextField from '../components/formik/FormikTextField';

// Utils
import validateEmail from '../utils/validateEmail';

// Apollo
import withApollo from '../lib/withApollo';
import { login } from '../lib/utils/userDataUtils';
import { areRequired } from '../utils/validation';

const Login = ({ query, currentUser, loadingCurrentUser, refetchCurrentUser }) => {
    // Apollo - Mutations
    const [logIn, { loading }] = useMutation(login);

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
            const errors: { email: string, password: string } = { email: '', password: '' };
            areRequired(values, errors, ['email', 'password']);
            if (!validateEmail(values.email)) errors.email = 'Invalid email address.';
            // else if (values.password.length < 5) errors.password = 'To short.';
            // else if (values.password.length > 40) errors.password = 'To long.';
            return errors;
        },
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

                        <Button
                            type='submit'
                        // fullWidth
                        // loading={loading}
                        // successful={!!data}
                        // disabled={!(formik.isValid && formik.dirty)}
                        >
                            Login
                        </Button>
                    </form>
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

Login.getInitialProps = async ({ query }) => {
    return { query };
};

export default withApollo(Login);