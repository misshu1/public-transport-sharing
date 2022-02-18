import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './style';

export function PrimaryBtn({ background, margin, children, ...props }) {
    return (
        <Button background={background} margin={margin} {...props}>
            {children}
        </Button>
    );
}
