import React, { useEffect, useState } from 'react';
import 'react-notion/src/styles.css';
import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import { NotionRenderer } from 'react-notion';
import { useQuery } from 'react-query';
import {
  createTableFromTable,
  createTableOfContents,
  createToggle,
  fetchPageBlockFromNotion,
  mathEquation,
} from '../../helpers';

const Notion: React.FC = () => {
  const { data, isFetched, isFetching } = useQuery('blocks', () =>
    fetchPageBlockFromNotion()
  );

  useEffect(() => {
    if (isFetched && !isFetching) {
      createTableOfContents('.notion');
      mathEquation(data);
      createTableFromTable(data);
      createToggle(data);
    }
  }, [isFetched, isFetching]);

  console.log(data);

  return (
    <div className="container">
      {data && <NotionRenderer blockMap={data} />}
    </div>
  );
};

export default Notion;
