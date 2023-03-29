import { API_URL } from '../mocks/handlers';

const Submit = async formvalues => {
  const temp = await fetch(`${API_URL}/submit`, {
    method: 'POST',
    body: JSON.stringify(formvalues),
  });
  const res = await temp.json();
  return res;
};

export default Submit;
