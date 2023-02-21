// UI
import Typography from '@mui/material/Typography';

// Components
import Link from '../components/Link';
import Section from '../components/Section';
import Wrapper from '../components/Wrapper';

// Apollo
import withApollo from '../lib/withApollo';

export default withApollo(({ currentUser, refetchCurrentUser, loadingCurrentUser, colorModeContext }) => {
  return (
    <Wrapper
      currentUser={currentUser}
      refetchCurrentUser={refetchCurrentUser}
      loadingCurrentUser={loadingCurrentUser}
      meta={{ title: 'Giampaolo Nico Lo Cascio | Full Stack Web Developer' }}
    >
      <Section
        header={'Welcome to my Website'}
        subtitle={
          <>
            this site is still in development, you can take a look in my Portfolio in the&nbsp;
            <Link href='https://xarthos.github.io' target='_blank'>
              GitHub
            </Link> webpage.

            {currentUser &&
              <Typography>
                Welcome {currentUser?.name?.firstName}
              </Typography>
            }
          </>
        }
        alignItems='flex-start'
        direction='column'
        containerClass={undefined}
        headerClass={undefined}
        gridClass={undefined}
        maxWidth={''}
        justify={''}
        spacing={undefined}
      >
      </Section>
    </Wrapper>
  );
});