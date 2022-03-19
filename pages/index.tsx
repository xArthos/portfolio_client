// Modules
import Head from 'next/head';

// UI
import Grid from '@mui/material/Grid';

// Components
import Section from '../components/Section';
import Wrapper from '../components/Wrapper';

// Apollo
import withApollo from '../lib/withApollo';

export default withApollo(({ currentUser, refetchCurrentUser, loadingCurrentUser }) => {
  return (
    <Wrapper currentUser={currentUser} refetchCurrentUser={refetchCurrentUser} loadingCurrentUser={loadingCurrentUser}>
      <Section
        header={'You must be logged in to view this page. If you don\'t have an account click on Sign up and create one for free.'}
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
  )
});