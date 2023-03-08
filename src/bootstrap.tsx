import React from 'react';
import ReactDOM from 'react-dom/client';
import { Notion } from './sections/Notion';

const AppEntryPointWrapper: React.FC = () => {
  return <Notion />;
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
