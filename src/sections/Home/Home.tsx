import React from 'react';
import { useQuery } from 'react-query';
import { Notion } from '../../components/notion';
import NotFound from '../../components/errorNotFound/NotFound';
import { getPageDataFromPageId } from '../../utils';

const Home: React.FC = () => {
  const { data } = useQuery('blocks', () => getPageDataFromPageId());

  console.log(data);

  return (
    <div data-testid="Home">
      {data ? <Notion data={data} /> : <div>Loading</div>}
      {data && Object.keys(data).length === 0 && <NotFound />}
    </div>
  );
};

export default Home;
