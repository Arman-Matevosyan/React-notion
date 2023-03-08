import React from 'react';
import { NotionRenderer } from 'react-notion';
import { Link } from 'react-router-dom';

const NotionRenderHere = ({ blockMap }) => {
  if (!blockMap || Object.keys(blockMap).length === 0) {
    return (
      <div>
        <h3>No data found.</h3>
        <div> Make sure the pageId is valid.</div>
        <div>Only public pages are supported in this example.</div>
      </div>
    );
  }

  const customSidePane = () => {
    return <div className="test">CUSTOM PANEL</div>;
  };

  const title =
    blockMap[Object.keys(blockMap)[0]]?.value.properties.title[0][0];

  const customBlockComponents = {
    my_custom_block: customSidePane,
  };

  return (
    <div>
      <style>{`body { margin: 0;}`}</style>
      <title>{title}</title>
    </div>
  );
};

export default NotionRenderHere;
