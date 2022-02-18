import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from './style';

export function LinkedinBtn() {
    return (
        <Button background='#0073B1'>
            <FontAwesomeIcon
                icon={['fab', 'linkedin']}
                size='2x'
                style={{ marginRight: '8px' }}
            />
            login with Linkedin
        </Button>
    );
}
