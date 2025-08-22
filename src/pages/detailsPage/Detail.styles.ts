import styled from 'styled-components';

export const DetailContent = styled.div`
  display: flex;
  width: 60%;
  border: 1px solid #D8DFE6;
  flex-direction: column;
`;

export const DetailTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #24292F;
  border-bottom: 1px solid #D8DFE6;
  padding: 8px
`;

export const DetailCard = styled.div`
  display: flex;
  gap: 32px;
  padding: 24px;

  .image-placeholder {
    border: 2px dashed #55A6FF;
    display: flex;
    height: 80%;
    width: 40%;
    align-items: center;
    justify-content: center;
    background-color: #F2F8FF;
    color: #4299e1;
    font-size: 14px;
    text-align: center;
    border-radius: 4px;
    height: 100%;
  }

  .detail-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px 0;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-direction: column;
  text-align: left;
  padding: 16px 0;
`;

export const DetailLabel = styled.span`
  font-weight: 500;
  color: #718096;
`;

export const DetailValue = styled.span`
  font-weight: 600;
  color: #2d3748;
`;
