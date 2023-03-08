import React, { useEffect, useState } from 'react';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { NotionRenderer } from 'react-notion';
import { useQuery } from 'react-query';
import { createTableOfContents, fetchPageBlockFromNotion } from '../../helpers';

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
  const { data, isFetched, isFetching } = useQuery('blocks', () =>
    fetchPageBlockFromNotion()
  );

  useEffect(() => {
    if (isFetched && !isFetching) {
      createTableOfContents('.notion');
    }
  }, [isFetched, isFetching]);

  return (
    <div className="container">
      {data && <NotionRenderer fullPage blockMap={data} />};
    </div>
  );
};

export default Notion;
