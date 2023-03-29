import { API_URL } from '../mocks/handlers';

const fetchPosts = async () => {
  const temp = await fetch(`${API_URL}/posts`);
  const res = await temp.json();
  return res.data.posts;
};

export default fetchPosts;
