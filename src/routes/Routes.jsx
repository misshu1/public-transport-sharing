import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { ROUTES, SpinnerApp } from 'common';
import { Home } from 'pages';
// import Login from 'pages';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const ResetPassword = lazy(() => import('pages/ResetPassword'));
const Terms = lazy(() => import('pages/Terms'));
const VerifyEmail = lazy(() => import('pages/VerifyEmail'));
const PasswordResetSuccess = lazy(() => import('pages/PasswordResetSuccess'));
const BasicInformation = lazy(() => import('pages/BasicInformation'));
const ShareExperience = lazy(() => import('pages/ShareExperience'));

export const RoutesApp = () => {
    return (
        <Routes>
            <Route
                path={ROUTES.login}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <Login />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.register}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <Register />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.updateUser}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <BasicInformation />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.resetPassword}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <ResetPassword />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.resetSuccess}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <PasswordResetSuccess />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.terms}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <Terms />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.verifyEmail}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <VerifyEmail />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.shareExperience}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <ShareExperience />
                    </Suspense>
                }
            />

            <Route
                path={ROUTES.shareExperienceEdit}
                element={
                    <Suspense fallback={<SpinnerApp delay={200} global />}>
                        <ShareExperience mode='edit' />
                    </Suspense>
                }
            />

            <Route path={ROUTES.root} element={<Home />} />
        </Routes>
    );
};
