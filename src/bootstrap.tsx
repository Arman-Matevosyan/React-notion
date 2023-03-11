import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Home } from './sections/Home';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      cacheTime: 0,
      retryDelay: 2000,
    },
  },
});

const AppEntryPointWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};

async function init() {
  const rootNode = ReactDOM.createRoot(
    document.getElementById('app') as HTMLElement
  );

  if (rootNode) {
    rootNode.render(<AppEntryPointWrapper />);
  }
}

init();
