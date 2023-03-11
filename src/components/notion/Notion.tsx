import React, { useEffect } from 'react';
import { NotionRenderer, BlockMapType } from 'react-notion';
import {
  createTableFromPageData,
  createTableOfContents,
  createToggle,
  renderMathEquationBlock,
  setFullWidth,
} from '../../helpers';
import 'react-notion/src/styles.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';

type Props = {
  data: BlockMapType;
};

const Notion: React.FC<Props> = ({ data }) => {
  useEffect(() => {
    setFullWidth('.notion-page');
    createTableOfContents('.notion');
    renderMathEquationBlock(data, '#Pricing');
    createTableFromPageData(data, '#Pricing');
    createToggle(data, '#Getting-Started');
  }, []);

  return (
    <div
      style={{
        maxWidth: '100%',
      }}
    >
      <NotionRenderer fullPage blockMap={data} />;
    </div>
  );
};

export default Notion;
