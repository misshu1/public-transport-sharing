export const ROUTES = {
    root: '/',
    login: '/login',
    register: '/register',
    updateUser: '/update-user',
    terms: '/terms',
    verifyEmail: '/verify-email',
    resetPassword: '/reset',
    resetSuccess: '/reset-success',
    shareExperience: '/share-experience',
    shareExperienceEdit: '/share-experience/:experienceId'
};

export const STATUS = {
    IDLE: 'idle',
    PENDING: 'pending',
    RESOLVED: 'resolved',
    REJECTED: 'rejected'
};

export const generateConfig = (method, body) => {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    return config;
};
