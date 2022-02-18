import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks';
import { Menu, MenuItem } from 'ui';
import { ROUTES } from 'common';

export const Toolbar = () => {
    const navigate = useNavigate();
    const { isUserLoggedIn, logout } = useAuth();

    const handleLogin = () => navigate(ROUTES.login);
    const handleHome = () => navigate(ROUTES.root);
    const handleShareExperience = () => navigate(ROUTES.shareExperience);

    return (
        <Menu>
            <MenuItem onClick={handleHome}>Home</MenuItem>
            {isUserLoggedIn && (
                <MenuItem onClick={handleShareExperience}>
                    Share experience
                </MenuItem>
            )}
            {!isUserLoggedIn && (
                <MenuItem onClick={handleLogin}>login</MenuItem>
            )}
            {isUserLoggedIn && <MenuItem onClick={logout}>logout</MenuItem>}
        </Menu>
    );
};
