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
import { useGetApolloClient } from './apollo-client';
import { useGetCurrentUser } from './utils/userDataUtils';

// class Link extends React.Component<LinkProps> {}

const UserCheck = ({ isPrivateRoute, children }) => {
    // Add a function that takes login cookies
    const { data: { currentUser }, loading, refetch } = useGetCurrentUser();

    if (loading) return null; // Todo: Create a loading page
    if (isPrivateRoute && !currentUser) {
        return (
            <Wrapper currentUser={currentUser} refetchCurrentUser={refetch} loadingCurrentUser={loading}>
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
        return React.cloneElement(children, { currentUser: (currentUser && currentUser !== null) ? currentUser : undefined, loadingCurrentUser: loading, refetchCurrentUser: refetch });
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