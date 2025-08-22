import styled from 'styled-components';

export const AssetsContainer = styled.div`
    display: flex;
    width: 40%;
    border: 1px solid #D8DFE6;
    flex-direction: column;
`;
export const TreeRow = styled.div`
    display: flex;
    align-items: center;
    padding: 4px;
    gap: 4px;
    cursor: pointer;

    &:hover {
        background-color: #F5F5F5;
    }
`