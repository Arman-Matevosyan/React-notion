import React, { useEffect, useState } from 'react';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { NotionRenderer } from 'react-notion';
import { createTableOfContents } from '../../helpers';

export async function getStaticProps() {
  const data = await fetch(
    'https://notion-api.splitbee.io/v1/page/575d3ec590204c938adc349bef9cabc9'
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
    revalidate: 1,
  };
}

const Notion: React.FC = () => {
  const [blockMap, setBlockMap] = useState(null);

  useEffect(() => {
    async function fetchPageData() {
      const recordMap = await getStaticProps();

      setBlockMap(recordMap);
    }

    fetchPageData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      createTableOfContents('.notion');
    }, 1000);
  }, []);

  return (
    <div className="container">
      <div className="notion">
        {blockMap?.props.blockMap && (
          <NotionRenderer fullPage blockMap={blockMap.props.blockMap} />
        )}
        ;
      </div>
    </div>
  );
};

export default Notion;
