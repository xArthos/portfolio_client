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
            meta={{ title: 'Giampaolo\'s Portfolio | Sign-up' }}
        >
            <Section
                header={'Create an account'}
                subtitle={undefined}
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