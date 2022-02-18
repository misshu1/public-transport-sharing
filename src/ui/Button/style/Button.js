import styled from 'styled-components';

export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 16px;
    background-color: ${({ background }) =>
        background ? background : '#FFB550'};
    color: #ffffff;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    border: none;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    margin-top: ${({ margin }) =>
        margin?.top ? `${margin.top}px` : undefined};
    margin-bottom: ${({ margin }) =>
        margin?.bottom ? `${margin.bottom}px` : undefined};
    margin-left: ${({ margin }) =>
        margin?.left ? `${margin.left}px` : undefined};
    margin-right: ${({ margin }) =>
        margin?.right ? `${margin.right}px` : undefined};

    :not(:disabled):hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
    }

    :disabled {
        filter: grayscale(1);
        cursor: default;
    }
`;
