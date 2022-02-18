import styled from 'styled-components';

export const ExperienceItem = styled.div`
    display: flex;
    border-radius: 6px;
    color: #000000;
    border: solid 1px #e8e9fc;
    padding: 10px 16px;
    font-size: 16px;
    box-shadow: 0 6px 12px 0 rgb(0, 0, 0, 0.12);
    margin: 16px 0;

    .content {
        flex: 1;
    }

    .edit-icon-container {
        display: flex;
        justify-content: center;
        align-items: center;

        .icon:hover {
            cursor: pointer;
            transform: rotate(-8deg);
        }
    }

    div {
        margin: 4px 0;
    }
`;
