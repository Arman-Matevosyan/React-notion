import { pageId, baseUrl } from '../constants';

export const getPageDataFromPageId = async () => {
  const res = await fetch(`${baseUrl}/page/${pageId}`);

  const data = res.json();

  return data;
};
