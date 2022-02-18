import React, { useEffect } from 'react';
import {
    Navigate,
    useNavigate,
    useLocation,
    useParams
} from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import { ROUTES, SpinnerApp, STATUS } from 'common';
import { Toolbar } from 'components';
import { AppContainer, Title, LinkCTA, TextInput, PrimaryBtn } from 'ui';
import { useAuth, useFetchCallback } from 'hooks';
import { EXPERIENCES_URL } from 'connectors';
import useFetchEffect from 'hooks/useFetchEffect';

const validationSchema = yup.object().shape({
    startLocation: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .matches(/^[a-zA-Z0-9\s]*$/g, 'Only letters and numbers are allowed.')
        .required('Starting point is required'),
    endLocation: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .matches(/^[a-zA-Z0-9\s]*$/g, 'Only letters and numbers are allowed.')
        .required('Destination is required'),
    transportType: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .matches(/^[a-zA-Z0-9\s]*$/g, 'Only letters and numbers are allowed.')
        .required('Transportation is required'),
    hour: yup
        .string()
        .matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            'Format must be HH:MM, ex: 04:30'
        )
        .required('Hour is required'),
    duration: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .matches(/^[a-zA-Z0-9\s]*$/g, 'Only letters and numbers are allowed.')
        .required('Duration is required'),
    crowdedness: yup
        .string()
        .lowercase()
        .matches(/^[a-zA-Z\s]*$/g, 'Only letters are allowed.')
        .matches(
            /\b(low?|medium?|high?)\b/,
            'Must be one of the following: low, medium, high'
        )
        .required('Crowdedness level is required'),
    observations: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .matches(/^[a-zA-Z0-9\s]*$/g, 'Only letters and numbers are allowed.')
        .required('Observations is required')
});

const ShareExperience = ({ mode }) => {
    const navigate = useNavigate();
    const { experienceId } = useParams();
    const { isUserLoggedIn, user, userFullName } = useAuth();
    const isEditing = mode === 'edit';
    const { data: editData, status: editStatus } = useFetchEffect(
        `${EXPERIENCES_URL}/${experienceId}`,
        isEditing
    );
    const {
        errors,
        touched,
        isValid,
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        setValues
    } = useFormik({
        initialValues: {
            startLocation: '',
            endLocation: '',
            transportType: '',
            hour: '',
            duration: '',
            crowdedness: '',
            observations: ''
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            handleShareExperience(resetForm);
        }
    });

    const editingBody = {
        ...values
    };

    const createBody = {
        ...values,
        user: {
            id: user?.uid,
            name: userFullName
        }
    };

    const [createExperience, { status }] = useFetchCallback(
        `${EXPERIENCES_URL}/${isEditing ? experienceId : uuidv4()}`,
        isEditing ? 'PUT' : 'POST',
        isEditing ? editingBody : createBody
    );
    const isPending =
        editStatus === STATUS.PENDING || status === STATUS.PENDING;

    const handleShareExperience = (resetForm) => {
        createExperience().then(() => {
            resetForm();
            navigate(ROUTES.root);
        });
    };

    useEffect(() => {
        if (isEditing && editData) {
            const {
                startLocation,
                endLocation,
                transportType,
                hour,
                duration,
                crowdedness,
                observations
            } = editData;

            setValues({
                startLocation: startLocation,
                endLocation: endLocation,
                transportType: transportType,
                hour: hour,
                duration: duration,
                crowdedness: crowdedness,
                observations: observations
            });
        }
    }, [isEditing, editData, setValues]);

    if (!isUserLoggedIn) {
        return <Navigate to={ROUTES.root} />;
    }

    return (
        <AppContainer>
            <Toolbar />
            <Title align='center'>Share Experience</Title>
            {isPending && <SpinnerApp delay={200} global />}
            <TextInput
                type='text'
                label='Starting point'
                name='startLocation'
                placeholder='Street name'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.startLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.startLocation ? errors.startLocation : undefined}
                disabled={isPending}
            />
            <TextInput
                type='text'
                label='Destination'
                name='endLocation'
                placeholder='Street name'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.endLocation}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.endLocation ? errors.endLocation : undefined}
                disabled={isPending}
            />
            <TextInput
                type='text'
                label='Transportation type'
                name='transportType'
                placeholder='bus, metro, tram, etc'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.transportType}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.transportType ? errors.transportType : undefined}
                disabled={isPending}
            />

            <TextInput
                type='text'
                label='Departure hour'
                name='hour'
                placeholder='13:45'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.hour}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.hour ? errors.hour : undefined}
                disabled={isPending}
            />
            <TextInput
                type='text'
                label='Trip duration'
                name='duration'
                placeholder='2 hours'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.duration}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.duration ? errors.duration : undefined}
                disabled={isPending}
            />
            <TextInput
                type='text'
                label='Crowdedness level of the public transport'
                name='crowdedness'
                placeholder='low, medium, high'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.crowdedness}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.crowdedness ? errors.crowdedness : undefined}
                disabled={isPending}
            />
            <TextInput
                type='text'
                label='Observations'
                name='observations'
                placeholder='What did you like about this experience?'
                width='100%'
                margin={{ top: 16, bottom: 16 }}
                value={values.observations}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.observations ? errors.observations : undefined}
                disabled={isPending}
            />
            <PrimaryBtn
                margin={{ top: 22, bottom: 32 }}
                onClick={handleSubmit}
                disabled={!isValid || isPending}
                type='submit'
            >
                share
            </PrimaryBtn>
        </AppContainer>
    );
};

export default ShareExperience;
