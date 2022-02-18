import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'common';
import { useAuth } from 'hooks';
import { VerificationState } from 'assets/images/VerificationState';
import { AuthContainer, Title, LinkCTA, PrimaryBtn } from 'ui';

const VerifyEmail = () => {
    const navigate = useNavigate();
    const { isUserLoggedIn } = useAuth();

    const goToLogin = () => {
        if (isUserLoggedIn) {
            return navigate(ROUTES.root);
        }

        navigate(ROUTES.login);
    };

    return (
        <AuthContainer>
            <VerificationState />
            <Title margin={{ bottom: 8, top: 32 }}>
                A verification link has been sent to your email account
            </Title>
            <p
                style={{
                    fontSize: '14px',
                    lineHeight: '19px',
                    textAlign: 'center'
                }}
            >
                Please click on the link that has just been sent to your email
                account to verify your email and continue the registration
                process.
            </p>
            <PrimaryBtn margin={{ top: 48, bottom: 32 }} onClick={goToLogin}>
                Login
            </PrimaryBtn>
            <LinkCTA to={ROUTES.register}>Didn’t get an email?</LinkCTA>
        </AuthContainer>
    );
};

export default VerifyEmail;
