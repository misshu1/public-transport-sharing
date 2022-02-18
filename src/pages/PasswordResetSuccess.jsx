import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from 'common';
import { AuthContainer, Title, LinkCTA, PrimaryBtn } from 'ui';

const PasswordResetSuccess = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate(ROUTES.login);
    };

    return (
        <AuthContainer>
            <Title margin={{ bottom: 8 }}>Password sent</Title>

            <p
                style={{
                    fontSize: '14px',
                    lineHeight: '19px',
                    textAlign: 'center'
                }}
            >
                An email has been sent to{' '}
                <span style={{ fontWeight: '900' }}>{state?.email}</span>. If
                this email adress is registered to our app, you’ll recieve
                instructions on how to set a new password.
            </p>
            <PrimaryBtn margin={{ top: 32, bottom: 32 }} onClick={goToLogin}>
                Enter new password
            </PrimaryBtn>
            <p>
                <LinkCTA to={ROUTES.resetPassword}>
                    Didn’t get an email?
                </LinkCTA>
            </p>
        </AuthContainer>
    );
};

export default PasswordResetSuccess;
