import React from 'react';
import { useQuery } from 'react-query';
import { Notion } from '../../components/notion';
import NotFound from '../../components/errorNotFound/NotFound';
import { getPageDataFromPageId } from '../../utils';
import styles from './Home.module.scss';

const Home: React.FC = () => {
  const { data } = useQuery('blocks', () => getPageDataFromPageId());

  return (
    <div className={styles.container}>
      {data ? <Notion data={data} /> : <div>Loading</div>}
      {data && Object.keys(data).length === 0 && <NotFound />}
    </div>
  );
};

export default Home;
