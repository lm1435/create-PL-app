import axios from 'axios';

const axiosGet = (url) => axios.get(url);

const axiosPost = (url, params) => axios.post(url, params);

const axiosAll = () => axios.all([...arguments]);

const axiosSpread = (data) => axios.spread(data);

export {
  axiosGet,
  axiosPost,
  axiosAll,
  axiosSpread,
};
