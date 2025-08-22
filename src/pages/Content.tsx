import React, { useState, useMemo } from 'react';
import { Button, Input } from 'antd';
import { StyledContent, MainContainer, NoCompanySelected, StyleBreadcrumbs, ContentContainer } from './Content.Styles';
import { AssetsPage } from './assetsPage/AssetsPage';
import DetailPage from './detailsPage/Detail';
import { useSelectedCompanyStore } from '../store/useSelectedCompanyStore';
import { useGetAssets } from '../features/assets/Hooks/useGetCompanies';
import { handleAssetsTree } from './assetsPage/Proccess';
import { useGetLocations } from '../features/locations/Hooks/useGetCompanies';
import { AssetsContainer } from './assetsPage/Assets.styles';
import { newTest } from '../utils/utils';
import { Skeleton } from 'antd';

const MainContent = () => {
    const selectedCompany = useSelectedCompanyStore((state) => state.selectedCompany);
    const { data: assets, isLoading } = useGetAssets({ id: selectedCompany?.id });
    const { data: loc, isLoading: isLoadingLocations } = useGetLocations({ id: selectedCompany?.id });
    const [filterEnergy, setFilterEnergy] = useState(false);
    const [filterCritical, setFilterCritical] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const tree = useMemo(() => {
        if (assets && loc) {
            return handleAssetsTree(assets, loc);
        }
        return [];
    }, [assets, loc]);

    const displayedTree = useMemo(() => {
        return newTest(tree, {
        nameFilter: searchQuery,
        requireAlert: filterCritical,
        requireEnergy: filterEnergy,
    });;
    }, [tree, searchQuery, filterEnergy, filterCritical]);

    const Loader = () => (
        <ContentContainer style={{ padding: '16px' }}>
            <Skeleton title={false} active paragraph={{ rows: 10, width: '100%' }} />
        </ContentContainer>
    );

    return (
        <MainContainer>
            {!selectedCompany ? (
                <NoCompanySelected>
                    <h1>No Company Selected</h1>
                    <p>Please select a company to view details.</p>
                </NoCompanySelected>
            ) : (
                <>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '20px', color: '#24292F', marginRight: '6px' }}>Ativos</span>
                        <StyleBreadcrumbs>/ {selectedCompany.name}</StyleBreadcrumbs>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                            type={filterEnergy ? 'primary' : 'default'}
                            onClick={() => setFilterEnergy(!filterEnergy)}
                            style={{ marginRight: '8px' }}
                        >
                            Sensor de Energia
                        </Button>
                        <Button
                            type={filterCritical ? 'primary' : 'default'}
                            onClick={() => setFilterCritical(!filterCritical)}
                        >
                            Crítico
                        </Button>
                    </div>
                </div>

                    <StyledContent>
                        {isLoading ? <Loader /> :
                        <AssetsContainer>
                            <Input
                                placeholder="Search components, assets, locations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{ borderRadius: '0px', border: 'none', borderBottom: '1px solid #d9d9d9' }}
                            />
                            {displayedTree.map((node) => (
                                <AssetsPage isFilterApplied={searchQuery != '' || filterEnergy || filterCritical} key={node.id} node={node} />
                            ))}
                        </AssetsContainer>}
                        {isLoadingLocations ? <Loader /> : <DetailPage />}
                    </StyledContent>
                </>
            )}
        </MainContainer>
    );
};

export default MainContent;
