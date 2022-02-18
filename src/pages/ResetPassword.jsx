import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from 'common';
import { useAuth } from 'hooks';
import { AuthContainer, Title, LinkCTA, PrimaryBtn, TextInput } from 'ui';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Email is required')
});

const ResetPassword = () => {
    const navigate = useNavigate();
    const { sendPasswordReset } = useAuth();
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
            email: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleResetPassword(values, resetForm);
        }
    });

    const handleResetPassword = ({ email }, resetForm) => {
        sendPasswordReset(email).then((success) => {
            resetForm();

            if (success) {
                navigate(ROUTES.resetSuccess, { state: { email } });
            }
        });
    };

    return (
        <AuthContainer>
            <Title margin={{ top: 0, bottom: 8 }}>Reset your password</Title>
            <p
                style={{
                    fontSize: '14px',
                    lineHeight: '19px',
                    textAlign: 'center'
                }}
            >
                Enter your email adress so we can reset your password.
            </p>
            <TextInput
                type='email'
                label='Email'
                name='email'
                placeholder='john.doe@gmail.com'
                width='100%'
                margin={{ top: 50, bottom: 16 }}
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email ? errors.email : undefined}
            />

            <PrimaryBtn
                margin={{ top: 22, bottom: 32 }}
                onClick={handleSubmit}
                disabled={!isValid}
                type='submit'
            >
                Next
            </PrimaryBtn>
            <p>
                Remember password?
                <LinkCTA to={ROUTES.login}> Go back</LinkCTA>
            </p>
        </AuthContainer>
    );
};

export default ResetPassword;
