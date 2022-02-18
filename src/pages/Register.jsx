import React, { useState } from 'react';
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
    TextInput,
    PrimaryBtn,
    LinkedinBtn
} from 'ui';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required'),
    password: yup
        .string()
        .matches(/^.{6,}$/, 'Must have at least 6 characters.')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .required('Password is required')
        .oneOf([yup.ref('password')], "Password don't match")
});

const Register = () => {
    const navigate = useNavigate();
    const { register, isUserLoggedIn } = useAuth();
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
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleRegister(values, resetForm);
        }
    });

    const handleRegister = ({ email, password }, resetForm) => {
        register(email, password).then(() => {
            resetForm();
            navigate(ROUTES.updateUser);
        });
    };

    if (isUserLoggedIn) {
        return <Navigate to={ROUTES.root} />;
    }

    return (
        <AuthContainer>
            <Title>Register</Title>
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
                placeholder='Password'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password ? errors.password : undefined}
            />
            <TextInput
                type='password'
                label='Confirm Password'
                name='confirmPassword'
                placeholder='Password'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                    touched.confirmPassword ? errors.confirmPassword : undefined
                }
            />
            <p>
                I agree to the
                <LinkCTA to={ROUTES.terms}> Terms and Conitions.</LinkCTA>
            </p>
            <PrimaryBtn
                margin={{ top: 22, bottom: 32 }}
                onClick={handleSubmit}
                disabled={!isValid}
                type='submit'
            >
                Create account
            </PrimaryBtn>
            <p>
                Already have an account?
                <LinkCTA to={ROUTES.login}> Login</LinkCTA>
            </p>
        </AuthContainer>
    );
};

export default Register;
