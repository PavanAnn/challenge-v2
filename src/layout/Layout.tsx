import React from "react";
import { Companies, CompaniesCotainer, Container, Content, Header, Logo, Units } from "./Layout.styles";
import { useGetCompanies } from "../features/companies/Hooks/useGetCompanies";
import { useSelectedCompanyStore } from "../store/useSelectedCompanyStore";
import { CompaniesIcon } from "./Icons/Companies";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { data: companies, isLoading, isError } = useGetCompanies();
  const { selectedCompany, setSelectedCompany } = useSelectedCompanyStore();

  return (
    <Container>
      <Header>
        <Logo>TRACTIAN</Logo>
        <Units>
          {/* Companies list */}
          {isLoading && <span>Loading companies...</span>}
          {isError && <span>Error loading companies</span>}
          {companies && companies.length > 0 && (
            <CompaniesCotainer>
              {companies.map((company) => (
                <Companies
                  key={company.id}
                  $isactive={selectedCompany?.id === company.id}
                  onClick={() => setSelectedCompany(company)}
                >
                  <CompaniesIcon />{company.name} Unit
                </Companies>
              ))}
            </CompaniesCotainer>
          )}
        </Units>
      </Header>
      <Content>{children}</Content>
    </Container>
  );
};

export default Layout;
