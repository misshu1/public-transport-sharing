import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';

import { ROUTES } from 'common';
import { useAuth } from 'hooks';
import {
    AuthContainer,
    Title,
    SubTitle,
    LinkCTA,
    PrimaryBtn,
    LinkedinBtn,
    TextInput
} from 'ui';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup
        .string()
        .matches(/^.{6,}$/, 'Must have at least 6 characters.')
        .required('Password is required')
});

export const Login = () => {
    const navigate = useNavigate();
    const { login, isUserLoggedIn } = useAuth();
    const {
        errors,
        touched,
        isValid,
        values,
        handleBlur,
        handleChange,
        handleSubmit
    } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleLogin(values, resetForm);
        }
    });

    const handleLogin = ({ email, password }, resetForm) => {
        login(email, password).then((user) => {
            resetForm();

            if (user) {
                navigate(ROUTES.root);
            }
        });
    };

    if (isUserLoggedIn) {
        return <Navigate to={ROUTES.root} />;
    }

    return (
        <AuthContainer>
            <Title>Login</Title>
            <LinkedinBtn />
            <SubTitle>or</SubTitle>
            <TextInput
                type='email'
                label='Email'
                name='email'
                placeholder='john.doe@gmail.com'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
            />
            <TextInput
                type='password'
                label='password'
                name='password'
                placeholder='Enter Password'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
            />
            <p>
                Remember me
                <LinkCTA to={ROUTES.resetPassword}> Forgot password?</LinkCTA>
            </p>
            <PrimaryBtn
                margin={{ top: 22, bottom: 32 }}
                onClick={handleSubmit}
                disabled={!isValid}
                type='submit'
            >
                Login
            </PrimaryBtn>
            <p>
                New to our app?
                <LinkCTA to={ROUTES.register}> Register</LinkCTA>
            </p>
        </AuthContainer>
    );
};

export default Login;
