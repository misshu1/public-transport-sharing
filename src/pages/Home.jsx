import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { EXPERIENCES_URL } from 'connectors';
import { useFetchCallback } from 'hooks';
import { ExperiencesList, Toolbar } from 'components';
import {
    AppContainer,
    PrimaryBtn,
    TextInput,
    SearchInputContainer,
    Menu,
    MenuItem,
    Title
} from 'ui';
import { SpinnerApp, STATUS } from 'common';

const searchEsperiencesSchema = yup.object().shape({
    search: yup
        .string()
        .matches(/^.{3,}$/, 'Must have at least 3 characters.')
        .matches(/^[a-zA-Z0-9\s]*$/g, 'Only letters and numbers are allowed.')
        .required('Search is required')
});

export const Home = () => {
    const { errors, touched, isValid, values, handleBlur, handleChange } =
        useFormik({
            initialValues: {
                search: ''
            },
            validationSchema: searchEsperiencesSchema
        });
    const [searchExperiences, { status, data }] = useFetchCallback(
        `${EXPERIENCES_URL}?query=${values.search}`
    );

    return (
        <AppContainer>
            <Toolbar />
            <Title align='center'>Search</Title>
            {status === STATUS.PENDING && <SpinnerApp delay={200} global />}
            <SearchInputContainer>
                <TextInput
                    type='text'
                    label='Search'
                    name='search'
                    placeholder='Search experiences by transportation type or location'
                    width='100%'
                    margin={{ top: 16, bottom: 16 }}
                    value={values.search}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.search ? errors.search : undefined}
                />
                <PrimaryBtn
                    margin={{ top: 22, bottom: 32 }}
                    onClick={() => values.search && searchExperiences()}
                    disabled={!isValid}
                    type='submit'
                >
                    search
                </PrimaryBtn>
            </SearchInputContainer>
            <ExperiencesList data={data} />
        </AppContainer>
    );
};
