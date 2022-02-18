import styled from 'styled-components';

export const MenuItem = styled.button`
    display: flex;
    justify-content: center;
    align-items: center
    letter-spacing: 1.2px;
    font-size: 12px;
    font-weight: 600; 
    text-transform: uppercase;
    width: 100%;
    height: 48px;
    padding: 16px;
    background-color: #ff8a0a;
    color: #ffffff;
    border: none;
    border-right: 3px solid #fff;
    transition: background-color 250ms ease;
    cursor: pointer;

    &&:last-child {
        border-right: none
    }
    
    &&:hover {
        background-color: #ff6930;
    }
`;
