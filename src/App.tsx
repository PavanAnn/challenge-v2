import React from 'react';
import { GlobalStyles } from './styles/globalStyles';
import Layout from './layout/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainContent from './pages/Content';

export const queryClient = new QueryClient()

function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Layout>
        <MainContent />
      </Layout>
    </QueryClientProvider>
    </>
  );
}

export default App;
