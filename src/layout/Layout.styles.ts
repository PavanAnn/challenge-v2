import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background-color: red;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #17192D;
  color: white;
  padding: 0 1.5rem;
  height: 56px;
`;

export const Logo = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const Units = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

export const Content = styled.main`
  flex: 1;
  display: grid;
  gap: 1rem;
  padding: 0.5rem;
  background-color: #E3EAEF;
`;

export const CompaniesCotainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
`

interface CompaniesProps {
  $isactive?: boolean;
}

export const Companies = styled.div<CompaniesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  background-color: ${({ $isactive }) => ($isactive ? "#2188FF" : "#023B78")};
  cursor: pointer;
  font-weight: 600;
  font-style: Bold;
  font-size: 12px;
  leading-trim: NONE;
  line-height: 16px;
  letter-spacing: 0%;
  text-align: center;
  vertical-align: middle;

`