import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    opacity: 1;
    border-width: 1px;
    border-style: solid;
    border-color: #D8DFE6;
    padding: 16px;
    background: #FFFFFF;
    box-sizing: border-box;
    width: 100%;
`

export const StyleBreadcrumbs = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #77818C;
`

export const StyledContent = styled.div`
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    opacity: 1;
    padding: 0px;
    background: #FFFFFF;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`;

export const NoCompanySelected = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #666666;
    text-align: center;

    h1 {
        font-size: 36px;
    }
    p {
        font-size: 24px;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    width: 40%;
    border: 1px solid #D8DFE6;
    flex-direction: column;
`;