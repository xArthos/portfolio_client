// ** UI
import React from 'react';

// ** Components
import Section from '../components/Section';

const Offline = ({ currentUser, refetchCurrentUser, loadingCurrentUser }) => {
    return (
            <Section
            header={'Welcome to my Website'}
            alignItems='flex-start'
            direction='column'
            containerClass={undefined}
            headerClass={undefined}
            gridClass={undefined}
            maxWidth={''}
            justify={''}
            spacing={1} 
            subtitle={'Offline'}>
            </Section>
    );
};

export default Offline;