// ** Modules
import React from 'react';

// ** Components
import Wrapper from '../../components/Wrapper';
import Section from '../../components/Section';

// ** Apollo
import withApollo from '../../lib/withApollo';

const Dashboard = ({ currentUser, loadingCurrentUser, refetchCurrentUser, errorCurrentUser }) => {
    return (
        <Wrapper currentUser={currentUser} loadingCurrentUser={loadingCurrentUser} refetchCurrentUser={refetchCurrentUser} errorCurrentUser={errorCurrentUser}>
            <Section
                header='Dashboard'
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
            </Section>
        </Wrapper>
    );
};

export default withApollo(Dashboard, { isPrivateRoute: true });