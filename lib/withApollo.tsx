// Modules
import React from 'react';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';

// UI
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// Components
import Link from '../components/Link';
import Section from '../components/Section';
import Wrapper from '../components/Wrapper';

// Apollo
import { useGetUserById } from './utils/userDataUtils';
import { useGetApolloClient } from './apollo-client';

// class Link extends React.Component<LinkProps> {}

const UserCheck = ({ isPrivateRoute, children }) => {
    const { data: { user }, loading, refetch } = useGetUserById('623222d2826ad9c729d5fb1e');
    console.log(user, loading, isPrivateRoute);

    if (loading) return null;
    if (isPrivateRoute && !user) {
        return (
            <Wrapper currentUser={user} refetchCurrentUser={refetch} loadingCurrentUser={loading}>
                <Section
                    header={'You must be logged in to view this page. If you don\'t have an account click on Sign up and create one for free.'}
                    alignItems='flex-start'
                    direction='column'
                    subtitle={undefined}
                    containerClass={undefined}
                    headerClass={undefined}
                    gridClass={undefined}
                    maxWidth=''
                    justify=''
                    spacing={undefined}
                >
                    <Grid item xs={12} sm={6} md={5}>
                        {/* <Link href='/login' color='inherit'>
                            <Button size='small'>Login</Button>
                        </Link> */}
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Link href='/reset-password' color='inherit'>
                            Forgot your password?
                        </Link> */}
                    </Grid>

                    <Grid item xs={12}>
                        {/* <Link href='/sign-up' color='inherit'>
                            Sign up?
                        </Link> */}
                    </Grid>
                </Section>
            </Wrapper>
        );
    } else {
        return React.cloneElement(children, { currentUser: user, loadingCurrentUser: loading, refetchCurrentUser: refetch });
    };
};

const withApollo = (PageComponent: React.ElementType, { ssr = true, isPrivateRoute = false } = {}) => {
    Router.events.on('routeChangeComplete', () => {
        window.scrollTo(0, 0);
    });

    const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
        const apolloClientState = apolloClient;
        const apolloClientHook = useGetApolloClient(pageProps);

        // Apollo Client
        const client = apolloClient ? apolloClientState : apolloClientHook;

        return (
            <ApolloProvider client={client}>
                <UserCheck isPrivateRoute={isPrivateRoute}>
                    <PageComponent {...pageProps} />
                </UserCheck>
            </ApolloProvider>
        );
    };

    return WithApollo;
};

export default withApollo;