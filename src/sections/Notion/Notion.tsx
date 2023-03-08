import React, { useEffect, useState } from 'react';
import 'react-notion/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import { NotionRenderer } from 'react-notion';
import { useQuery } from 'react-query';
import MathComponent from 'react-mathjax2';
import {
  createTableFromTabel,
  createTableOfContents,
  fetchPageBlockFromNotion,
  replaceElement,
} from '../../helpers';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

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
      replaceElement('Large-Circuits');
      createTableFromTabel(data);
    }
  }, [isFetched, isFetching]);

  // const updatedContent =
  //   data &&
  //   Object.values(data).reduce((acc, block) => {
  //     if (block.value.type === 'equation' && block.value.properties?.title) {
  //       console.log(block.value);

  //       return {
  //         ...acc,
  //         [block.value.id]: {
  //           ...block,
  //           value: {
  //             ...block.value,
  //             properties: {
  //               title: <InlineMath math={block.value.properties?.title} />,
  //             },
  //           },
  //         },
  //       };
  //     }

  //     return {
  //       ...acc,
  //       [block.value.id]: block,
  //     };
  //   }, {});

  console.log(data);

  return (
    <div className="container">
      {data && <NotionRenderer blockMap={data} />}
    </div>
  );
};

export default Notion;
