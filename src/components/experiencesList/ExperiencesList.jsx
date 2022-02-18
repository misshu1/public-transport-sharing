import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ROUTES, STATUS } from 'common';
import { useAuth, useFetchCallback } from 'hooks';
import { ExperienceItem } from 'ui';
import { EXPERIENCES_URL } from 'connectors';

export const ExperiencesList = ({ data }) => {
    const [newData, setNewData] = useState(data);
    const navigate = useNavigate();
    const { user } = useAuth();
    const goToEdit = (experienceId) =>
        navigate(`${ROUTES.shareExperience}/${experienceId}`);

    const canEdit = (experienceUserId) => experienceUserId === user?.uid;
    const [deleteExperience, { status }] = useFetchCallback(
        `${EXPERIENCES_URL}`,
        'DELETE'
    );

    const handleDelete = (deletedId) =>
        deleteExperience(deletedId).then(() => {
            // Remove experience from UI after delete success
            setNewData((prevState) =>
                prevState.filter((data) => deletedId !== data.experienceId)
            );
        });

    useEffect(() => {
        setNewData(data);
    }, [data]);

    if (!newData || newData?.length === 0)
        return <div>No experiences found</div>;

    return (
        <>
            {newData?.map((experience) => {
                return (
                    <ExperienceItem key={experience.experienceId}>
                        <div className='content'>
                            <div>
                                <span>Start: {experience.startLocation}</span>
                                <FontAwesomeIcon
                                    icon={['fas', 'long-arrow-alt-right']}
                                    style={{ margin: '0 16px' }}
                                    size='lg'
                                />
                                <span>
                                    Destination: {experience.endLocation}{' '}
                                </span>
                                <span>({experience.transportType})</span>
                            </div>
                            <div>
                                <span>Hour: {experience.hour}</span>
                                <FontAwesomeIcon
                                    icon={['far', 'clock']}
                                    style={{ margin: '0 16px' }}
                                    size='lg'
                                />
                                <span>Duration: {experience.duration}</span>
                            </div>
                            <div>
                                <span>
                                    Crowdedness Level: {experience.crowdedness}
                                </span>
                            </div>
                            <div>
                                <span>
                                    Observations: {experience.observations}
                                </span>
                            </div>
                            <div>
                                <span>Author: {experience.user.name}</span>
                            </div>
                        </div>
                        {canEdit(experience.user.id) && (
                            <div className='edit-icon-container'>
                                <FontAwesomeIcon
                                    icon={['fas', 'pen']}
                                    style={{ margin: '0 16px' }}
                                    size='3x'
                                    className='icon'
                                    onClick={() =>
                                        goToEdit(experience.experienceId)
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={['fas', 'trash-alt']}
                                    style={{ margin: '0 16px' }}
                                    size='3x'
                                    className='icon'
                                    onClick={() =>
                                        handleDelete(experience.experienceId)
                                    }
                                />
                            </div>
                        )}
                    </ExperienceItem>
                );
            })}
        </>
    );
};
