import React from 'react';

import { ROUTES } from 'common';
import { AuthContainer, Title, LinkCTA } from 'ui';

const Terms = () => {
    return (
        <AuthContainer>
            <Title>Terms and Conitions</Title>

            <p>
                Nothing here
                <LinkCTA to={ROUTES.register}> Go Back</LinkCTA>
            </p>
        </AuthContainer>
    );
};

export default Terms;
