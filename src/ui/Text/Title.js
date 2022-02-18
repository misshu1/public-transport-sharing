import styled from 'styled-components';

export const Title = styled.h2`
    margin-top: ${({ margin }) => (margin?.top ? `${margin.top}px` : '32px')};
    margin-bottom: ${({ margin }) =>
        margin?.bottom ? `${margin.bottom}px` : '72px'};
    margin-left: ${({ margin }) =>
        margin?.left ? `${margin.left}px` : undefined};
    margin-right: ${({ margin }) =>
        margin?.right ? `${margin.right}px` : undefined};
    letter-spacing: 0;
    color: #1a1a1a;
    font-size: 24px;
    font-weight: 600;
    line-height: 33px;
    text-align: ${({ align }) => (align ? align : 'unset')};
`;
