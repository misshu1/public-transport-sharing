import React from 'react';
import { GlobalStyle } from 'components';
import { RoutesApp } from 'routes';
import { AuthProvider } from 'hooks';
import './fontawesome';

export const App = () => {
    return (
        <AuthProvider>
            <RoutesApp />
            <GlobalStyle />
        </AuthProvider>
    );
};
