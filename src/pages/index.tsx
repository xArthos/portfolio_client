// ** UI
import React from 'react';
import Typography from '@mui/material/Typography';

// ** Components
import Link from '../components/muiCustom/CustomLink';
import Wrapper from '../components/Wrapper';
import Section from '../components/Section';

// ** Apollo
import withApollo from '../lib/withApollo';

const Homepage = ({ currentUser, refetchCurrentUser, loadingCurrentUser, errorCurrentUser }) => {
  return (
    <Wrapper currentUser={currentUser} refetchCurrentUser={refetchCurrentUser} loadingCurrentUser={loadingCurrentUser} errorCurrentUser={errorCurrentUser}>
      <Section
        header={'Welcome to my Website'}
        subtitle={
          <React.Fragment>
            this site is still in development, you can take a look in my Portfolio in the&nbsp;
            <Link href='https://xarthos.github.io' target='_blank'>
              GitHub
            </Link> webpage.

            {currentUser &&
              <Typography>
                Welcome {currentUser?.name?.firstName}
              </Typography>
            }
          </React.Fragment>
        }
        alignItems='flex-start'
        direction='column'
        containerClass={undefined}
        headerClass={undefined}
        gridClass={undefined}
        maxWidth=''
        justify=''
        spacing={1}
      >
      </Section>
    </Wrapper>
  );
};

export default withApollo(Homepage);