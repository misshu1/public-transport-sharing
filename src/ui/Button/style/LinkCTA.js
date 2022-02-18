import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const LinkCTA = styled(Link)`
    position: relative;
    color: #131ba3;
    letter-spacing: 0;
    font-size: 14px;
    cursor: pointer;
    white-space: nowrap;
    text-decoration: none;

    &&:after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        height: 2px;
        width: 100%;
        background-color: #e8e9fc;
    }
`;
