import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { ROUTES } from 'common';
import { AuthContainer, TextInput, PrimaryBtn, Title } from 'ui';

const validationSchema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .required('First Name is required'),
    lastName: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .required('First Name is required')
});

const BasicInformation = () => {
    const navigate = useNavigate();
    const { updateUser } = useAuth();
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
            firstName: '',
            lastName: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleUpdateProfile(values, resetForm);
        }
    });

    const handleUpdateProfile = ({ firstName, lastName }, resetForm) => {
        updateUser(firstName, lastName).then(() => {
            resetForm();
            navigate(ROUTES.verifyEmail);
        });
    };

    return (
        <AuthContainer>
            <Title margin={{ bottom: 8 }}>Basic information</Title>
            <p
                style={{
                    fontSize: '14px',
                    lineHeight: '19px',
                    textAlign: 'center'
                }}
            >
                This is a placeholder description of why we need to know this
                type of information.
            </p>
            <TextInput
                type='text'
                label='First Name'
                name='firstName'
                placeholder='John'
                width='100%'
                margin={{ top: 48, bottom: 16 }}
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.firstName ? errors.firstName : undefined}
            />
            <TextInput
                type='text'
                label='Last Name'
                name='lastName'
                placeholder='Doe'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.lastName ? errors.lastName : undefined}
            />
            <PrimaryBtn
                margin={{ top: 22, bottom: 32 }}
                onClick={handleSubmit}
                disabled={!isValid}
                type='submit'
            >
                sign up
            </PrimaryBtn>
        </AuthContainer>
    );
};

export default BasicInformation;
