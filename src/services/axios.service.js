import axios from 'axios';

const fetch = (url) => axios.get(url);

const post = (url, params) => axios.post(url, params);

const multiFetch = () => axios.all([...arguments]);

const spread = (data) => axios.spread(data);

export {
  fetch,
  post,
  multiFetch,
  spread,
};
